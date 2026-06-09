import type {
  ChatResult,
  ConversationTurn,
  TriageResult,
} from "../domain/contracts";
import type { AIGateway } from "../ai/gateway";
import { classifyMessage } from "../ai/triage";

interface MessageRepository {
  listBySession(sessionId: string): Promise<ConversationTurn[]>;
  append(input: {
    sessionId: string;
    role: "user" | "assistant";
    content: string;
    triage?: TriageResult;
  }): Promise<void>;
}

interface SessionRepository {
  assertOpen(sessionId: string): Promise<void>;
  registerInteraction(
    sessionId: string,
    triage: TriageResult,
  ): Promise<void>;
}

interface SpecialistCatalog {
  getInstruction(name: TriageResult["specialist"]): Promise<string>;
}

export interface ProcessMessageDependencies {
  ai: AIGateway;
  messages: MessageRepository;
  sessions: SessionRepository;
  specialists: SpecialistCatalog;
}

export async function processMessage(
  dependencies: ProcessMessageDependencies,
  input: { sessionId: string; message: string },
): Promise<ChatResult> {
  const message = input.message.trim().slice(0, 2_000);
  if (!message) throw new Error("Message is required");

  await dependencies.sessions.assertOpen(input.sessionId);

  const history = await dependencies.messages.listBySession(input.sessionId);
  await dependencies.messages.append({
    sessionId: input.sessionId,
    role: "user",
    content: message,
  });

  const triage = await classifyMessage(dependencies.ai, message, history);
  const systemInstruction = await dependencies.specialists.getInstruction(
    triage.specialist,
  );

  const generated = await dependencies.ai.generate({
    systemInstruction,
    message,
    history,
    temperature: 0.4,
  });

  await dependencies.messages.append({
    sessionId: input.sessionId,
    role: "assistant",
    content: generated.content,
    triage,
  });

  await dependencies.sessions.registerInteraction(input.sessionId, triage);

  return {
    reply: generated.content,
    triage,
    sessionId: input.sessionId,
  };
}
