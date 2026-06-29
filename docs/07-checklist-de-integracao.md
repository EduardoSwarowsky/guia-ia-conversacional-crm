# 7. Checklist de Integração

[Anterior: Segurança](#/docs/06-seguranca-e-operacao) · [Início](#/) ·
[Glossário](#/docs/glossario)

Use esta lista para revisar a integração, não para validar um produto completo.

## Fronteiras

- [ ] O frontend não chama IA diretamente.
- [ ] O backend centraliza credenciais e provedores.
- [ ] O banco registra eventos independentes da interface.
- [ ] O dashboard consome agregações, não dumps de dados.
- [ ] O armazenamento local é apenas cache de experiência.

## IA

- [ ] Existe um contrato comum para chamadas ao modelo.
- [ ] O histórico enviado é limitado.
- [ ] A saída estruturada é validada.
- [ ] Há fallback para erro, timeout e baixa confiança.
- [ ] Prompts e políticas ficam no servidor.

## CRM e dados

- [ ] Contato, sessão, mensagem e evento são conceitos separados.
- [ ] Cada métrica tem definição única.
- [ ] Dados pessoais têm finalidade e retenção.
- [ ] Scores ou tags são explicáveis.
- [ ] Correções manuais são possíveis quando necessário.

## Dashboard

- [ ] Consultas aceitam período e filtros.
- [ ] Métricas são calculadas no backend.
- [ ] Estados de vazio, erro e carregamento estão previstos.
- [ ] Insights gerados por IA mostram a base usada.

## Responsividade

- [ ] Sidebar abre e fecha em telas pequenas.
- [ ] Tabelas têm rolagem horizontal.
- [ ] Blocos de código não quebram a largura da tela.
- [ ] Diagramas podem rolar horizontalmente.
- [ ] A leitura funciona em celular, tablet e desktop.

## Exemplos

- [ ] Os snippets são curtos e genéricos.
- [ ] Nenhum exemplo entrega uma rota completa pronta para uso direto.
- [ ] As regras de negócio específicas ficam fora do guia.
- [ ] Cada exemplo aponta para uma fronteira de integração clara.

Consulte: [Exemplos de integração](#/docs/exemplos-de-integracao).
