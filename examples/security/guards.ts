import { z } from "zod";

export const chatInputSchema = z.object({
  sessionId: z.string().uuid(),
  message: z.string().trim().min(1).max(2_000),
});

export interface AuthenticatedUser {
  id: string;
  roles: string[];
}

export function requireRole(
  user: AuthenticatedUser | null,
  requiredRole: string,
): void {
  if (!user || !user.roles.includes(requiredRole)) {
    throw new Error("Forbidden");
  }
}

interface RateLimitStore {
  increment(key: string, windowSeconds: number): Promise<number>;
}

export async function enforceRateLimit(
  store: RateLimitStore,
  key: string,
  options = { limit: 20, windowSeconds: 60 },
): Promise<void> {
  const requests = await store.increment(key, options.windowSeconds);

  if (requests > options.limit) {
    throw new Error("Too many requests");
  }
}

export function publicError(error: unknown): string {
  const errorType = error instanceof Error ? error.name : "UnknownError";
  console.error("Request failed", { errorType });
  return "Nao foi possivel concluir a solicitacao. Tente novamente.";
}
