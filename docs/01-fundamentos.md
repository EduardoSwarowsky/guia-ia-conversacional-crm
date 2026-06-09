# 1. Fundamentos

[Início](../README.md) · [Próximo: Arquitetura](02-arquitetura.md)

Antes de escolher modelo, banco ou biblioteca, defina o que a conversa precisa
resolver. Essa etapa evita um chatbot tecnicamente interessante, mas sem função
clara para a pessoa ou para a operação.

## Comece pelo problema

Escreva uma frase para cada pergunta:

1. Quem inicia a conversa?
2. Qual necessidade essa pessoa tenta resolver?
3. Que informação o sistema precisa para ajudar?
4. Qual ação deve acontecer depois da resposta?
5. Como você saberá se a conversa foi útil?

Um bom recorte inicial possui poucas intenções, uma jornada curta e um resultado
observável. Exemplos de resultado: dúvida resolvida, solicitação encaminhada,
contato autorizado ou oportunidade qualificada.

## Separe os três objetivos

### Experiência

A pessoa precisa entender onde está, o que será solicitado e o que acontece com
seus dados. O chat deve oferecer estados claros de carregamento, erro, retorno e
encerramento.

### Operação

A equipe precisa recuperar histórico, localizar contatos, acompanhar situações
pendentes e corrigir classificações quando necessário.

### Aprendizado

O sistema precisa mostrar padrões: temas recorrentes, pontos de abandono,
categorias de atendimento e oportunidades de melhoria.

Esses objetivos compartilham dados, mas não são a mesma coisa. Trate cada um com
critérios próprios.

## Defina o limite da IA

A IA pode:

- interpretar linguagem natural;
- classificar uma mensagem;
- selecionar uma especialidade;
- produzir uma resposta contextual;
- resumir uma conversa;
- sugerir padrões em dados agregados.

A IA não deve decidir sozinha:

- acesso a dados sensíveis;
- alteração de cadastro crítico;
- concessão de benefício ou crédito;
- diagnóstico de alto risco;
- comunicação externa sem confirmação;
- qualquer ação irreversível.

Quando o risco aumenta, adicione revisão humana, regras determinísticas e trilha
de auditoria.

## Escolha critérios de sucesso

Use poucos indicadores no início:

| Perspectiva | Pergunta | Indicador possível |
|---|---|---|
| Pessoa | A necessidade foi atendida? | resolução ou avaliação |
| Conversa | O fluxo foi compreensível? | abandono e mensagens por sessão |
| Operação | O caso chegou ao destino correto? | taxa de roteamento aceito |
| CRM | Há sinal suficiente para acompanhamento? | contatos qualificados |
| IA | A resposta respeitou o contrato? | acurácia, fallback e erro |

Evite tratar volume de mensagens como sucesso. Uma conversa longa pode indicar
interesse, mas também pode revelar confusão.

## Decisões que precisam ficar registradas

Crie um documento curto com:

- objetivo da primeira versão;
- público e canal;
- dados mínimos coletados;
- intenções iniciais;
- ações permitidas;
- métricas de sucesso;
- riscos e responsáveis;
- política de retenção.

Esse registro será a referência para arquitetura, UX, dados e testes.

## Antes de escolher a stack

Avance quando você conseguir descrever o fluxo completo sem citar tecnologia:

> Uma pessoa chega com uma necessidade, fornece apenas os dados necessários,
> recebe atendimento, e a operação consegue acompanhar o resultado.

[Próximo: Arquitetura](02-arquitetura.md)
