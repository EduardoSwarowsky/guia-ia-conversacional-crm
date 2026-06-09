# 10. Referência de Código

[Anterior: Validação](09-checklist-de-validacao.md) · [Início](../README.md) ·
[Abrir todos os exemplos](../examples/README.md)

Os arquivos desta seção compartilham os mesmos contratos e formam um exemplo
contínuo de integração.

## Organização dos exemplos

```text
examples/
├── domain/contracts.ts
├── api/chat-route.ts
├── ai/gateway.ts
├── ai/triage.ts
├── chat/process-message.ts
├── db/schema.ts
├── crm/lead-score.ts
├── frontend/chat-client.ts
├── analytics/overview.sql
└── security/guards.ts
```

Cada arquivo possui uma responsabilidade. A rota conhece HTTP, o orquestrador
conhece o caso de uso e o gateway conhece a capacidade de geração. Nenhuma
dessas camadas precisa conhecer detalhes visuais.

## Integração de ponta a ponta

Uma rota Next.js valida a entrada e delega o caso de uso:

```ts
export async function POST(request: NextRequest) {
  const input = chatInputSchema.parse(await request.json());
  const result = await processMessage(chatDependencies, input);

  return NextResponse.json({
    reply: result.reply,
    intent: result.triage.intent,
  });
}
```

O orquestrador executa a sequência de negócio:

```ts
const history = await messages.listBySession(sessionId);
await messages.append({ sessionId, role: "user", content: message });

const triage = await classifyMessage(ai, message, history);
const instruction = await specialists.getInstruction(triage.specialist);
const generated = await ai.generate({
  systemInstruction: instruction,
  message,
  history,
});

await messages.append({
  sessionId,
  role: "assistant",
  content: generated.content,
  triage,
});
```

Essa divisão permite testar cada etapa com implementações falsas e substituir
banco ou provedor sem alterar o contrato HTTP.

## Composição das dependências

O ponto de composição conecta implementações concretas:

```ts
export const chatDependencies = {
  ai: createAIGateway(),
  messages: new SqlMessageRepository(database),
  sessions: new SqlSessionRepository(database),
  specialists: new SettingsSpecialistCatalog(database),
};
```

Os nomes deixam visível o papel de cada dependência. A implementação concreta
depende do banco escolhido, da forma de armazenar configurações e do SDK usado
para acessar o modelo.

## O que adaptar

- categorias e especialistas;
- instruções e base de conhecimento;
- repositórios e estratégia de migração;
- autenticação e autorização;
- limites de requisição;
- política de retenção;
- métricas e definição de conversão;
- mensagens de erro e canais alternativos.

## Abrir os arquivos

- [Contratos do domínio](https://github.com/EduardoSwarowsky/guia-ia-conversacional-crm/blob/master/examples/domain/contracts.ts)
- [Rota de chat](https://github.com/EduardoSwarowsky/guia-ia-conversacional-crm/blob/master/examples/api/chat-route.ts)
- [Gateway de IA](https://github.com/EduardoSwarowsky/guia-ia-conversacional-crm/blob/master/examples/ai/gateway.ts)
- [Triagem validada](https://github.com/EduardoSwarowsky/guia-ia-conversacional-crm/blob/master/examples/ai/triage.ts)
- [Orquestração da mensagem](https://github.com/EduardoSwarowsky/guia-ia-conversacional-crm/blob/master/examples/chat/process-message.ts)
- [Schema do banco](https://github.com/EduardoSwarowsky/guia-ia-conversacional-crm/blob/master/examples/db/schema.ts)
- [Score de relacionamento](https://github.com/EduardoSwarowsky/guia-ia-conversacional-crm/blob/master/examples/crm/lead-score.ts)
- [Cliente do chat](https://github.com/EduardoSwarowsky/guia-ia-conversacional-crm/blob/master/examples/frontend/chat-client.ts)
- [Consultas de analytics](https://github.com/EduardoSwarowsky/guia-ia-conversacional-crm/blob/master/examples/analytics/overview.sql)
- [Controles de segurança](https://github.com/EduardoSwarowsky/guia-ia-conversacional-crm/blob/master/examples/security/guards.ts)
