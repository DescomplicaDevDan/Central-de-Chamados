# Processo de trabalho — Kanban

## Princípios

- Trabalhar uma etapa por vez e manter uma tarefa em andamento.
- Dividir cada etapa em issues pequenas com resultado verificável.
- Explicar objetivo, arquivos e decisão técnica antes de editar.
- Explicar depois o caminho da interação até o banco, sem apresentar comportamento planejado como implementado.
- Executar verificações pertinentes antes de sugerir commit.
- Fazer uma revisão curta ao concluir cada etapa: aprendizado, dificuldade e ajuste para a próxima.
- Não adotar cerimônias ou sprints rígidas sem necessidade.

## Quadro no GitHub Projects

| Coluna | Condição |
| --- | --- |
| A fazer | Objetivo, escopo e critérios de aceite definidos |
| Em andamento | Tarefa atual, com dependências disponíveis; limite de uma |
| Em revisão | Implementação disponível, verificações executadas e revisão pendente |
| Concluído | Critérios atendidos, documentação atualizada, revisão concluída e commit manual realizado |

Bloqueios são registrados na issue com motivo e próximo passo. Não esconder trabalho incompleto movendo-o para Concluído.

O quadro e as issues ainda precisam ser criados no repositório escolhido. Este documento não comprova que existam no GitHub.

## Modelo de issue

```markdown
Título: verbo + resultado concreto

### Objetivo
Qual problema esta tarefa resolve?

### Escopo
- O que será entregue nesta tarefa.

### Critérios de aceite
- [ ] Comportamento observável e verificável.
- [ ] Referência aos critérios CAxx aplicáveis de docs/produto.md.

### Verificação
- Comandos e/ou passos manuais necessários.

### Dependências
- Tarefa ou decisão necessária; escrever “Nenhuma” quando aplicável.

### Evidências e aprendizado
- Resultado das verificações, limitações e aprendizado após a execução.
```

Evitar uma issue única para toda a aplicação. As dez etapas são marcos; cada uma pode conter várias issues sequenciais.

## Primeira issue proposta

**Título:** Documentar produto, arquitetura e plano de execução.

**Objetivo:** estabelecer uma referência para implementar sem mudar regras implicitamente.

**Escopo:** os cinco arquivos da pasta `docs/`.

- [x] Documentar problema, perfis, escopo e fluxos.
- [x] Definir regras e critérios de aceite rastreáveis.
- [x] Registrar tecnologias e decisões pendentes.
- [x] Detalhar dez etapas, verificações e fluxo de dados.
- [x] Definir Kanban e processo de commits manuais.
- [ ] Autor revisar o conteúdo.
- [ ] Autor realizar commit.

**Verificação:** conferir links locais, consistência das transições e ausência de afirmações sobre funcionalidades ainda não implementadas.

**Dependências:** nenhuma para documentação local; repositório definido para criar a issue no GitHub.

## Checklist de revisão por tarefa

- [ ] O resultado atende ao escopo e aos critérios aplicáveis.
- [ ] Não há alteração inesperada ou segredo no diff.
- [ ] Permissões e regras foram verificadas no servidor, quando aplicável.
- [ ] Estados de interface foram tratados, quando aplicável.
- [ ] Verificações pertinentes passaram; limitações foram registradas.
- [ ] A documentação descreve o comportamento real.
- [ ] O fluxo de dados e os trechos importantes foram explicados.
- [ ] A lista exata de arquivos para stage foi fornecida.
- [ ] O autor revisou e executou o commit manualmente.

## Git e operações manuais

O assistente não executa `git add`, `git commit`, `git push`, merge ou deploy. Essas ações pertencem ao autor do projeto. Nunca usar `git add .`.

Antes de cada commit, fornecer:

1. Arquivos exatos para revisar.
2. Comandos de verificação aplicáveis e seus resultados.
3. Arquivos exatos para adicionar ao stage.
4. Mensagem de commit em português.
5. Comando `git commit` completo.

Usar caminhos explícitos no `git add`. Após o stage manual, revisar `git diff --cached` e `git diff --cached --check` antes do commit.

Se o diretório ainda não for um repositório, o autor poderá inicializá-lo manualmente com `git init` antes do primeiro stage.

## Comandos previstos de qualidade

Estes comandos só estarão disponíveis depois de seus scripts serem criados. Não foram executados nesta etapa documental.

| Comando previsto | Finalidade |
| --- | --- |
| `npm run lint` | Análise estática |
| `npm run typecheck` | TypeScript sem emitir arquivos |
| `npm run test` | Testes unitários e de componentes em execução única |
| `npm run test:integration` | Integração com banco isolado |
| `npm run test:e2e` | Fluxos no navegador |
| `npm run build` | Build de produção |

Rodar o conjunto adequado à mudança. Testes de banco usam ambiente isolado; nenhum procedimento de testes deve limpar dados reais ou da demonstração.

## Revisão ao final de cada etapa

Registrar na issue ou discussão da etapa:

- O que foi entregue e como foi verificado.
- Como os dados percorrem interface, servidor e banco nessa entrega.
- Uma decisão técnica e seu motivo.
- Uma dificuldade ou limitação real.
- O próximo passo dentro do roteiro.

Não inventar métricas, resultados de testes, integrações ou links. Recursos ainda pendentes permanecem explicitamente pendentes.
