# Exemplos de Integração

[Início](/) · [Checklist](/docs/07-checklist-de-integracao.md) · [Glossário](/docs/glossario.md)

Estes exemplos são fragmentos de referência. Eles mostram formatos, fronteiras e
responsabilidades entre camadas, mas não representam uma aplicação completa.
Adapte nomes, campos, regras, provedores e persistência ao contexto do seu
projeto. Funções como sessions.find, events.record e schema.parse são
nomes ilustrativos para representar serviços internos.

## Como usar estes exemplos

- leia o snippet junto com o capítulo correspondente;
- mantenha segredos, prompts e credenciais no servidor;
- trate todo campo como exemplo, não como modelo obrigatório;
- valide entradas e saídas antes de afetar CRM, dashboard ou ações do usuário;
- substitua regras de negócio por critérios próprios do domínio.

<a id="contrato-entre-camadas"></a>

## Contrato entre camadas

Um contrato simples ajuda a alinhar frontend, API, IA e persistência sem expor
como cada camada funciona internamente.

```ts
type ChatMessageInput = {
  sessionId: string;
  text: string;
  channel: "web" | "mobile" | "other";
  consent?: boolean;
};

type IntegrationResult = {
  reply: string;
  eventId: string;
  intent?: string;
  confidence?: number;
};
```

O frontend envia uma mensagem mínima. O backend devolve apenas o necessário para
a interface continuar a conversa.

<a id="fluxo-api-chat-e-ia"></a>

## Fluxo API Chat e IA

A API coordena validação, histórico curto, IA, evento e resposta. Repare que o
provedor de IA não aparece no navegador.

```ts
async function processMessage(input: ChatMessageInput) {
  const session = await sessions.find(input.sessionId);
  const history = await messages.recent(session.id, { limit: 8 });

  const generated = await ai.generate({
    instruction: policies.chatAssistant,
    message: input.text,
    history,
    output: "reply-with-intent",
  });

  const event = await events.record({
    sessionId: session.id,
    type: "ai_reply",
    source: "system",
    payload: pickPublicFields(generated),
  });

  return {
    reply: generated.text,
    intent: generated.intent,
    confidence: generated.confidence,
    eventId: event.id,
  };
}
```

O exemplo usa nomes genéricos de serviços. A ideia é mostrar a ordem das
responsabilidades, não uma rota pronta.

<a id="gateway-de-ia"></a>

## Gateway de IA

Um gateway evita que o domínio dependa diretamente de um SDK ou modelo
específico.

```ts
type AIRequest = {
  instruction: string;
  message: string;
  history: { role: "user" | "assistant"; content: string }[];
  output: "text" | "json" | "reply-with-intent";
};

type AIResult = {
  text: string;
  model: string;
  provider: string;
  intent?: string;
  confidence?: number;
};

type AIProvider = {
  generate(request: AIRequest): Promise<AIResult>;
};
```

Com esse contrato, trocar provedor, adicionar fallback ou medir custo não exige
mudanças na interface do chat.

<a id="evento-para-crm"></a>

## Evento para CRM

O CRM pode ser visto como uma leitura organizada dos eventos. O banco registra o
que aconteceu; a camada de CRM interpreta sinais.

```sql
CREATE TABLE conversation_events (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  source TEXT NOT NULL,
  payload JSON NOT NULL,
  created_at TIMESTAMP NOT NULL
);
```

```ts
function deriveContactSignals(events: SessionEvent[]) {
  return {
    lastIntent: lastPayload(events, "intent_classified")?.intent,
    hasRecentInteraction: events.some((event) => event.type === "message"),
    needsHumanReview: events.some((event) => event.type === "handoff_requested"),
  };
}
```

A função acima é apenas um exemplo de leitura. As regras reais dependem do
domínio, do consentimento e do objetivo do atendimento.

<a id="consulta-para-dashboard"></a>

## Consulta para dashboard

O dashboard deve receber dados agregados por uma API, não registros brutos da
conversa.

```sql
SELECT
  event_type,
  COUNT(*) AS total
FROM conversation_events
WHERE created_at >= :from
  AND created_at < :to
GROUP BY event_type
ORDER BY total DESC;
```

```ts
type DashboardMetric = {
  label: string;
  value: number;
  period: { from: string; to: string };
};
```

Esse formato deixa a visualização simples e reduz exposição desnecessária de
dados pessoais.

<a id="insight-com-ia"></a>

## Insight com IA

Quando a IA ajuda no dashboard, envie métricas resumidas e peça uma resposta
curta, rastreável e sem dados pessoais.

```ts
type DashboardInsightRequest = {
  period: string;
  metrics: Record<string, number>;
  topIntents: { intent: string; count: number }[];
  constraints: ["no-personal-data", "cite-metric-basis"];
};
```

O insight deve explicar uma tendência, não substituir a métrica nem tomar uma
decisão operacional sozinho.

<a id="validacao-e-limites"></a>

## Validação e limites

Validação, rate limit e autorização pertencem ao backend. Eles protegem tanto o
chat público quanto as áreas privadas do CRM e dashboard.

```ts
async function guardedAction(request: Request, user: User) {
  const input = schema.parse(await request.json());

  await rateLimit.consume(input.sessionId);

  if (!canAccessScope(user, input.scope)) {
    throw new Error("forbidden");
  }

  return input;
}
```

Use bibliotecas e políticas adequadas ao projeto. O importante é manter a
fronteira: o cliente não decide permissões, limites ou acesso a métricas.

## Como adaptar

Antes de reutilizar qualquer trecho, responda:

- quais dados são realmente necessários nesta fronteira?
- o que precisa ficar no servidor?
- qual parte é evento, métrica, estado de CRM ou resposta visual?
- existe consentimento para armazenar e consultar esse dado?
- como o sistema se comporta quando a IA falha?

Se a resposta exigir detalhes do produto, ela não pertence a um guia público. Ela
pertence à implementação privada do projeto.
