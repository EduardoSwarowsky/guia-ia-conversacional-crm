export type MessageRole = "user" | "assistant" | "system";

export interface ConversationTurn {
  role: MessageRole;
  content: string;
}

export interface TriageResult {
  intent: "commercial" | "support" | "general";
  specialist: "sales" | "support" | "default";
  confidence: number;
  tags: string[];
}

export interface AIRequest {
  systemInstruction: string;
  message: string;
  history: ConversationTurn[];
  temperature?: number;
  maxOutputTokens?: number;
}

export interface AIResult {
  content: string;
  provider: string;
  model: string;
  latencyMs: number;
}

export interface ChatResult {
  reply: string;
  triage: TriageResult;
  sessionId: string;
}
