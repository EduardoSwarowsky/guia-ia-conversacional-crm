# Exemplos de Referência

[Voltar ao guia](../README.md)

Os arquivos abaixo acompanham os capítulos e isolam as partes mais importantes
da integração. Juntos, eles mostram o caminho de uma mensagem desde o navegador
até a persistência e o dashboard.

## Mapa dos exemplos

| Arquivo | Conceito |
|---|---|
| [`domain/contracts.ts`](https://github.com/EduardoSwarowsky/guia-ia-conversacional-crm/blob/master/examples/domain/contracts.ts) | contratos compartilhados do domínio |
| [`api/chat-route.ts`](https://github.com/EduardoSwarowsky/guia-ia-conversacional-crm/blob/master/examples/api/chat-route.ts) | fronteira HTTP de uma rota Next.js |
| [`ai/gateway.ts`](https://github.com/EduardoSwarowsky/guia-ia-conversacional-crm/blob/master/examples/ai/gateway.ts) | abstração para trocar o provedor de IA |
| [`ai/triage.ts`](https://github.com/EduardoSwarowsky/guia-ia-conversacional-crm/blob/master/examples/ai/triage.ts) | classificação estruturada com validação e fallback |
| [`chat/process-message.ts`](https://github.com/EduardoSwarowsky/guia-ia-conversacional-crm/blob/master/examples/chat/process-message.ts) | orquestração completa de uma mensagem |
| [`db/schema.ts`](https://github.com/EduardoSwarowsky/guia-ia-conversacional-crm/blob/master/examples/db/schema.ts) | entidades mínimas com Drizzle ORM |
| [`crm/lead-score.ts`](https://github.com/EduardoSwarowsky/guia-ia-conversacional-crm/blob/master/examples/crm/lead-score.ts) | score explicável por categorias |
| [`frontend/chat-client.ts`](https://github.com/EduardoSwarowsky/guia-ia-conversacional-crm/blob/master/examples/frontend/chat-client.ts) | integração do navegador com as APIs |
| [`analytics/overview.sql`](https://github.com/EduardoSwarowsky/guia-ia-conversacional-crm/blob/master/examples/analytics/overview.sql) | agregações para o dashboard |
| [`security/guards.ts`](https://github.com/EduardoSwarowsky/guia-ia-conversacional-crm/blob/master/examples/security/guards.ts) | validação, autorização e rate limiting |

## Como usar estes arquivos

- Os exemplos usam TypeScript e, em alguns pontos, Zod e Drizzle ORM.
- Imports de módulos que não aparecem nesta pasta representam pontos de
  adaptação do projeto.
- Categorias, pesos, limites e textos são ilustrativos.
- Autenticação, observabilidade e tratamento de erro devem ser adequados ao
  ambiente real.
- O servidor continua sendo responsável por banco, credenciais e chamadas de IA.

Use os contratos como referência e ajuste nomes, regras, categorias e políticas
ao problema que sua aplicação resolve.
