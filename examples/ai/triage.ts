import { z } from "zod";
import type { ConversationTurn, TriageResult } from "../domain/contracts";
import type { AIGateway } from "./gateway";

const triageSchema = z.object({
  intent: z.enum(["commercial", "support", "general"]),
  specialist: z.enum(["sales", "support", "default"]),
  confidence: z.number().min(0).max(1),
  tags: z.array(z.string().max(40)).max(5),
});

const safeFallback: TriageResult = {
  intent: "general",
  specialist: "default",
  confidence: 0,
  tags: [],
};

export async function classifyMessage(
  ai: AIGateway,
  message: string,
  history: ConversationTurn[],
): Promise<TriageResult> {
  try {
    const result = await ai.generate({
      systemInstruction: [
        "Classify the request using only the allowed categories.",
        "Return JSON with intent, specialist, confidence and tags.",
      ].join("\n"),
      message,
      history: history.slice(-6),
      temperature: 0,
      maxOutputTokens: 200,
    });

    const parsed = triageSchema.safeParse(JSON.parse(result.content));
    if (!parsed.success || parsed.data.confidence < 0.55) {
      return safeFallback;
    }

    return parsed.data;
  } catch {
    return safeFallback;
  }
}
