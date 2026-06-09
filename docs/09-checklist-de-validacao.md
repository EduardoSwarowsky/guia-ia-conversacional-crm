# 9. Checklist de Validação

[Anterior: Roteiro](08-roteiro-de-implementacao.md) · [Início](../README.md) ·
[Próximo: Referência de código](10-referencia-de-codigo.md) ·
[Glossário](glossario.md)

Use esta lista antes de uma demonstração, publicação ou mudança de modelo.

## Produto e experiência

- [ ] A finalidade do chat está clara antes da coleta de dados.
- [ ] Campos obrigatórios são realmente necessários.
- [ ] Consentimento para contato está separado de uso do serviço.
- [ ] O fluxo funciona em mobile, teclado e conexão lenta.
- [ ] Mensagens não são duplicadas durante carregamento.
- [ ] Erros preservam o texto digitado e permitem nova tentativa.
- [ ] Retorno e troca de identidade têm comportamento definido.
- [ ] Encerramento informa o próximo passo.

## Dados e CRM

- [ ] Contato, sessão e mensagem possuem identificadores estáveis.
- [ ] O banco reconstrói a conversa sem depender do navegador.
- [ ] Estados do relacionamento têm critérios observáveis.
- [ ] O score mostra fatores e limites.
- [ ] Métricas possuem definição única.
- [ ] Dados derivados são distinguíveis dos dados originais.
- [ ] Correção e exclusão de dados têm procedimento.

## IA

- [ ] O navegador nunca chama o provedor com uma chave privada.
- [ ] A saída da triagem é validada contra um contrato.
- [ ] Categorias desconhecidas usam fallback seguro.
- [ ] Contexto enviado ao modelo é mínimo e autorizado.
- [ ] Timeout, limite de frequência e indisponibilidade foram testados.
- [ ] Respostas vazias ou inválidas têm tratamento.
- [ ] Existe uma coleção de casos representativos.
- [ ] Mudanças de modelo e instruções são comparadas antes da publicação.

## Dashboard

- [ ] Cada indicador responde uma pergunta operacional.
- [ ] Período e filtros estão visíveis.
- [ ] “Sem dados” não aparece como zero.
- [ ] Agregações são calculadas no servidor.
- [ ] Listagens usam paginação ou limite.
- [ ] A pontuação de contato é explicável.
- [ ] Insights automáticos apontam para dados verificáveis.
- [ ] Conteúdo pessoal só aparece para perfis autorizados.

## Segurança

- [ ] Rotas administrativas validam autenticação e autorização no servidor.
- [ ] Não existem senhas padrão em produção.
- [ ] Cookies e sessões usam configurações adequadas ao ambiente.
- [ ] Entradas têm validação de tipo e tamanho.
- [ ] APIs públicas possuem rate limiting.
- [ ] Segredos não aparecem em respostas, logs ou bundles.
- [ ] Dependências e imagens de deploy são verificadas.
- [ ] Backups e restauração foram testados.

## Publicação do repositório

- [ ] Não há `.env`, banco local, backup ou log versionado.
- [ ] Não há dados reais ou capturas com informações pessoais.
- [ ] Prompts e regras proprietárias foram removidos.
- [ ] O histórico Git foi considerado, não apenas o último commit.
- [ ] Links internos e diagramas foram revisados.
- [ ] A documentação explica limites e não promete produção pronta.

## Sinal de prontidão

O sistema está pronto para a próxima etapa quando você consegue demonstrar:

1. uma conversa completa;
2. o registro correto dos eventos;
3. o tratamento de uma falha;
4. a consulta operacional;
5. a origem de uma métrica;
6. a proteção de uma rota e de um segredo.
