import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { processMessage } from "../chat/process-message";
import { chatInputSchema, publicError } from "../security/guards";

// Import this object from the application's composition root.
declare const chatDependencies: Parameters<typeof processMessage>[0];

export async function POST(request: NextRequest) {
  try {
    const input = chatInputSchema.parse(await request.json());
    const result = await processMessage(chatDependencies, input);

    return NextResponse.json({
      reply: result.reply,
      sessionId: result.sessionId,
      intent: result.triage.intent,
    });
  } catch (error) {
    return NextResponse.json(
      { error: publicError(error) },
      { status: error instanceof ZodError ? 400 : 500 },
    );
  }
}
