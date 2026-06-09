# 6. Dashboard e Analytics

[Anterior: Experiência do chat](05-experiencia-do-chat.md) ·
[Início](../README.md) · [Próximo: Segurança](07-seguranca-e-privacidade.md)

Um dashboard útil começa pelas decisões que alguém precisa tomar. O gráfico é a
última etapa, não a primeira.

## Converta perguntas em blocos

| Pergunta operacional | Dado necessário | Visual adequado |
|---|---|---|
| O volume mudou? | sessões por período | linha ou área |
| Quais necessidades aparecem mais? | mensagens por intenção | barras |
| Onde há abandono? | sessões por etapa e resultado | funil |
| Qual especialidade recebe mais casos? | atendimentos por destino | barras |
| Quem precisa de acompanhamento? | score, recência e status | tabela ordenada |
| A triagem está confiável? | confiança e correções | distribuição e lista |

Se um bloco não leva a uma ação, questione se ele precisa estar na tela.

## Separe visão executiva e investigação

### Visão geral

Mostre poucos indicadores:

- contatos no período;
- sessões iniciadas;
- resolução ou conclusão;
- conversão definida pelo negócio;
- duração e abandono;
- alertas recentes.

### Contatos

Permita busca, filtros, status, sinais de prioridade e acesso ao histórico.
Mostre a explicação da pontuação, não apenas o número.

### Conversas

Ofereça replay cronológico, intenção, especialidade, resultado, duração e resumo.
Mantenha o texto original disponível para auditoria autorizada.

### Analytics

Apresente tendências, distribuição de categorias, funil e comparações por
período. Deixe definições das métricas acessíveis.

### Configuração da IA

Separe configuração operacional de visualização. Alterações em instruções,
modelos ou categorias precisam de validação, versionamento e responsável.

## Agregue no servidor

A interface deve receber séries e totais prontos para exibição. Isso evita:

- transferir registros pessoais sem necessidade;
- repetir regras de cálculo em várias telas;
- travar o navegador com grandes volumes;
- produzir números diferentes para a mesma métrica.

Use filtros de período, paginação e limites claros. Consultas pesadas podem ser
pré-calculadas conforme o volume aumenta.

### Uma consulta para a visão geral

```sql
SELECT
  COUNT(DISTINCT c.id) AS total_contacts,
  COUNT(DISTINCT s.id) AS total_sessions,
  SUM(CASE WHEN s.status = 'resolved' THEN 1 ELSE 0 END)
    AS resolved_sessions
FROM contacts c
LEFT JOIN sessions s ON s.contact_id = c.id
WHERE s.started_at >= :period_start
  AND s.started_at < :period_end;
```

Os parâmetros de período devem ser validados e aplicados no backend. A
interface recebe apenas os totais necessários. Veja as
[consultas de referência](https://github.com/EduardoSwarowsky/guia-ia-conversacional-crm/blob/master/examples/analytics/overview.sql).

## Desenhe estados honestos

Todo bloco deve prever:

- carregamento;
- ausência de dados;
- erro parcial;
- período sem atividade;
- valor não aplicável;
- dados atrasados.

Não transforme ausência de informação em zero. “Sem dado” e “valor zero” têm
significados diferentes.

## Insights gerados por IA

Mostre insights como apoio à investigação:

1. informe o período analisado;
2. vincule a métricas verificáveis;
3. indique que o texto foi gerado automaticamente;
4. permita marcar como revisado;
5. não execute ações com base apenas no insight.

Uma boa sugestão aponta onde olhar. Ela não oculta a fonte nem substitui a
decisão humana.

## Antes de ampliar o dashboard

Avance quando cada métrica tiver definição única, período explícito e ação
associada, e quando a interface não precisar receber registros brutos para
calcular gráficos.

[Próximo: Segurança](07-seguranca-e-privacidade.md)
