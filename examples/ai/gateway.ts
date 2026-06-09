import type { AIRequest, AIResult } from "../domain/contracts";

export interface AIProvider {
  generate(request: AIRequest): Promise<AIResult>;
}

export class AIGateway {
  constructor(
    private readonly providers: Record<string, AIProvider>,
    private readonly defaultProvider: string,
  ) {}

  async generate(
    request: AIRequest,
    providerName = this.defaultProvider,
  ): Promise<AIResult> {
    const providerOrder = [
      providerName,
      ...(providerName === this.defaultProvider ? ["fallback"] : []),
    ];
    let lastError: unknown;

    for (const name of providerOrder) {
      const provider = this.providers[name];
      if (!provider) continue;

      try {
        const result = await provider.generate({
          ...request,
          history: request.history.slice(-12),
          maxOutputTokens: request.maxOutputTokens ?? 800,
        });

        if (!result.content.trim()) {
          throw new Error("AI provider returned an empty response");
        }

        return result;
      } catch (error) {
        lastError = error;
      }
    }

    throw new Error("No AI provider completed the request", {
      cause: lastError,
    });
  }
}

// Composition root: SDK-specific adapters stay outside the domain.
export function createAIGateway() {
  return new AIGateway(
    {
      primary: createPrimaryProviderAdapter(),
      fallback: createFallbackProviderAdapter(),
    },
    "primary",
  );
}

declare function createPrimaryProviderAdapter(): AIProvider;
declare function createFallbackProviderAdapter(): AIProvider;
