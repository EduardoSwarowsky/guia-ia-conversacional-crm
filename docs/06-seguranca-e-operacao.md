# 6. Segurança e Operação

[Anterior: Dashboard](/docs/05-dashboard-e-analytics) · [Início](/) ·
[Próximo: Checklist](/docs/07-checklist-de-integracao)

Um ecossistema com chat, IA, CRM e dashboard atravessa várias superfícies de
risco. A segurança precisa acompanhar as fronteiras de integração.

## Onde ficam os segredos

Chaves de IA, tokens e credenciais administrativas pertencem ao servidor. O
frontend nunca deve receber esses valores.

```ts
const apiKey = process.env.AI_PROVIDER_KEY;
if (!apiKey) throw new Error("AI provider key is not configured");
```

## Rotas públicas e privadas

| Tipo de rota | Exemplo de uso | Controle |
|---|---|---|
| pública limitada | enviar mensagem | validação, rate limit, sessão |
| privada | listar contatos | autenticação e autorização |
| operacional | alterar configuração | perfil administrativo |
| analytics | consultar métricas | filtros e escopo de acesso |

## Entrada não confiável

Tudo que vem do navegador precisa ser validado:

```ts
const input = schema.parse(await request.json());
```

O modelo de IA também deve ser tratado como fonte não determinística. Respostas
estruturadas precisam de validação antes de afetar CRM, dashboard ou fluxo.

## Observabilidade

Registre eventos técnicos sem despejar dados sensíveis:

- latência do provedor;
- erro por tipo;
- quantidade de chamadas;
- fallback acionado;
- volume por período;
- custo estimado, quando disponível.

Esses sinais ajudam a operar o sistema sem expor conversas completas em logs.

Exemplo relacionado: [validação e limites](/docs/exemplos-de-integracao?id=validacao-e-limites).

[Próximo: Checklist](/docs/07-checklist-de-integracao)
