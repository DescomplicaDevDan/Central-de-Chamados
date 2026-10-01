# Central de Chamados — Produto

## Problema e objetivo

Pedidos internos de suporte feitos por mensagens dispersas dificultam identificar o responsável, acompanhar o atendimento e consultar a solução.

A Central de Chamados reúne abertura, atendimento, comentários e histórico em uma aplicação. O projeto demonstra competências de desenvolvimento para vagas Front-end Júnior, sem alegar uso real, impacto ou métricas não comprovados.

## Usuários e permissões

| Perfil | Pode fazer |
| --- | --- |
| Solicitante | Entrar, criar chamados, consultar os próprios chamados e comentar enquanto estiverem ativos |
| Atendente | Entrar, consultar todos os chamados, assumir chamados disponíveis, comentar e resolver os chamados sob sua responsabilidade |

Cada conta possui um único perfil, definido previamente. O usuário não pode escolher ou alterar seu perfil. Atendentes não criam chamados neste escopo.

## Escopo

- Login e logout.
- Criação, listagem e detalhe de chamados.
- Atribuição ao próprio atendente e resolução.
- Comentários e histórico.
- Busca, filtros e paginação no servidor.
- Interface responsiva, acessível e com estados de carregamento, vazio, erro e confirmação.
- Persistência em PostgreSQL, autorização no servidor e testes automatizados.
- Demonstração com contas e dados fictícios.

## Dados do domínio

| Tipo | Informações principais |
| --- | --- |
| User | Identificador, nome, e-mail, perfil, criação e atualização |
| Ticket | Identificador, título, descrição, categoria, prioridade, status, solicitante, responsável opcional, resolução opcional e datas |
| Comment | Identificador, chamado, autor, conteúdo e criação |
| TicketHistory | Identificador, chamado, autor, ação, dados da alteração e criação |
| Status | Aberto, Em atendimento, Resolvido |
| Priority | Baixa, Média, Alta |

Categorias: Acesso e permissões, Equipamentos, Sistemas e Outros.

Dados secretos de autenticação não pertencem à representação pública de User. Senhas e tokens de sessão não devem aparecer em respostas ou logs.

### Validação

Aplicar os limites após remover espaços no início e no fim. Texto composto apenas de espaços é inválido.

| Campo | Regra |
| --- | --- |
| Título | Obrigatório; 5 a 120 caracteres |
| Descrição | Obrigatória; 20 a 5.000 caracteres |
| Categoria | Obrigatória; valor permitido |
| Prioridade | Obrigatória; valor permitido |
| Comentário | 1 a 2.000 caracteres |
| Resolução | 10 a 5.000 caracteres; obrigatória para resolver |

Conteúdo textual é texto simples, sem execução de HTML. Prioridade não implica prazo ou SLA.

## Fluxos

### Login

Informar e-mail e senha → servidor valida credenciais → estabelece sessão → abre área do perfil. Credenciais inválidas recebem mensagem genérica. Logout invalida o acesso pela sessão anterior.

### Abertura

Solicitante preenche formulário → servidor valida sessão, perfil e dados → grava chamado Aberto, sem responsável, e histórico de abertura em uma transação → mostra o detalhe.

### Acompanhamento

Solicitante consulta seus chamados → ajusta busca e filtros → abre o detalhe → consulta responsável, status, comentários, histórico e resolução → pode comentar enquanto o chamado estiver ativo.

### Atendimento

Atendente consulta a fila → abre um chamado disponível → confirma Assumir → servidor atribui a ele e inicia o atendimento → responsável comenta e informa a resolução → confirma Resolver → servidor grava resolução, data, status e histórico.

## Regras de negócio

### Acesso

- Solicitantes acessam somente seus chamados, inclusive comentários e histórico.
- Atendentes podem consultar todos os chamados.
- Sessão validada determina usuário, perfil e autoria. Dados enviados pelo navegador não concedem permissões.
- URL direta, Server Action e Route Handler devem aplicar as mesmas restrições.
- Consultas, contagens e paginação também respeitam a visibilidade.

### Status e responsabilidade

| Origem | Ação | Permissão | Destino |
| --- | --- | --- | --- |
| Aberto, sem responsável | Assumir | Qualquer atendente | Em atendimento, com o próprio atendente como responsável |
| Em atendimento | Resolver com descrição válida | Atendente responsável | Resolvido, preservando responsável e resolução |
| Resolvido | Consultar | Autor solicitante e atendentes | Sem alteração |

- Todo chamado novo começa Aberto e sem responsável.
- Assumir é a única alteração permitida ao atendente que ainda não é responsável.
- Atribuição e início do atendimento são uma única operação.
- Não existe transição direta de Aberto para Resolvido.
- Chamados Em atendimento ou Resolvidos precisam de responsável.
- Resolver exige descrição válida e data de resolução.
- Não há retorno para Aberto, reabertura, transferência ou remoção do responsável.
- Título, descrição, categoria e prioridade não podem ser editados após a abertura.
- Chamados resolvidos ficam disponíveis somente para consulta.

### Comentários

- Solicitante comenta nos próprios chamados Abertos ou Em atendimento.
- Atendente comenta somente nos chamados Em atendimento sob sua responsabilidade.
- Todos os comentários são visíveis ao autor solicitante e aos atendentes.
- Não existem comentários privados, edição ou exclusão.
- Chamados resolvidos não recebem comentários.

### Histórico, transações e concorrência

- Registrar abertura, atribuição com início do atendimento, comentário e resolução.
- Todo evento possui autor, data e ação. Mudanças de status registram origem e destino; atribuição identifica o responsável.
- O evento de comentário referencia o comentário sem precisar duplicar seu texto.
- O histórico é gerado pelo servidor e não permite edição ou exclusão pela aplicação.
- Alteração e histórico pertencem à mesma transação: ambos são gravados ou nenhum é.
- Duas tentativas simultâneas de assumir resultam em apenas um responsável e um evento de atribuição. A tentativa perdedora recebe mensagem de conflito.
- A validação do estado deve participar da operação atômica. Apenas consultar e depois atualizar sem proteção não atende à regra.
- Repetir uma resolução não sobrescreve o resultado nem duplica o evento.
- Comentário concorrente com resolução precisa respeitar a regra de que chamados resolvidos não recebem comentários; a estratégia transacional será validada com testes.

## Busca, filtros e paginação

- Busca por identificador exato ou trecho do título, sem distinção entre maiúsculas e minúsculas no título.
- Filtros combináveis por status, prioridade e categoria.
- Para atendentes: disponíveis, meus atendimentos e todos. Disponíveis são Abertos sem responsável; meus atendimentos filtra o responsável autenticado e pode ser combinado com status.
- Ordenação por criação decrescente, com identificador como desempate estável.
- Dez chamados por página, consultados no servidor.
- Busca, filtros e página ficam na URL. Mudar os critérios retorna à primeira página.
- Parâmetros inválidos são validados e normalizados; páginas sem resultados exibem estado vazio e navegação para recuperação.

## Interface e acessibilidade

- Uso em celular e desktop, com navegação por teclado e foco visível.
- Campos com rótulos, erros associados e valores preservados após falhas de envio enquanto a página estiver aberta.
- Status e prioridade indicados por texto, além de cor.
- Feedback de carregamento, sucesso, vazio e erro; erros recuperáveis permitem nova tentativa.
- Envios desabilitados enquanto pendentes, sem substituir a proteção no servidor.
- Confirmação antes de assumir ou resolver, com foco gerenciado; cancelar não altera dados.
- Mensagens de erro não expõem detalhes internos ou dados de outros usuários.

## Critérios de aceite

### Autenticação e acesso

- [ ] CA01 — Conta válida entra na área correspondente ao perfil.
- [ ] CA02 — Credenciais inválidas não criam sessão e recebem mensagem genérica.
- [ ] CA03 — Sessão ausente ou inválida impede consultas e alterações protegidas.
- [ ] CA04 — Logout impede novas operações com a sessão anterior.
- [ ] CA05 — Solicitante não consulta nem altera chamados de outro, inclusive por URL ou requisição manual.
- [ ] CA06 — Perfil e autoria enviados na requisição não modificam permissões ou autoria real.

### Criação

- [ ] CA07 — Dados válidos criam chamado Aberto, sem responsável, vinculado ao solicitante autenticado.
- [ ] CA08 — Dados inválidos não criam chamado nem histórico.
- [ ] CA09 — Chamado e histórico de abertura são persistidos atomicamente.
- [ ] CA10 — Atendente não cria chamado pelo fluxo do solicitante.

### Atendimento

- [ ] CA11 — Assumir atribui o chamado ao atendente e muda o status para Em atendimento, com histórico.
- [ ] CA12 — Tentativas concorrentes de assumir geram um responsável e um evento de atribuição.
- [ ] CA13 — Atendente não comenta nem resolve chamado de outro responsável.
- [ ] CA14 — O servidor rejeita Em atendimento sem responsável.
- [ ] CA15 — O servidor rejeita resolução de chamado Aberto ou sem descrição válida.
- [ ] CA16 — Responsável resolve chamado Em atendimento com texto, data e histórico.
- [ ] CA17 — Chamado Resolvido rejeita alterações e comentários, inclusive em operações concorrentes.
- [ ] CA18 — Repetir resolução não sobrescreve dados nem duplica histórico.

### Comentários e histórico

- [ ] CA19 — Solicitante comenta somente nos próprios chamados ativos.
- [ ] CA20 — Atendente comenta somente nos chamados que está atendendo.
- [ ] CA21 — Comentários inválidos ou não autorizados não são persistidos.
- [ ] CA22 — Comentário persistido tem autor, data e histórico correspondente.
- [ ] CA23 — Histórico tem ordenação cronológica estável e não permite edição ou exclusão.
- [ ] CA24 — Falha ao gravar histórico desfaz a alteração correspondente.

### Consulta e experiência

- [ ] CA25 — Busca, filtros e paginação funcionam juntos e respeitam a visibilidade.
- [ ] CA26 — Recarregar URL preserva os critérios da consulta.
- [ ] CA27 — Telas apresentam estados de carregamento, vazio e erro adequados.
- [ ] CA28 — Assumir e resolver exigem confirmação; cancelar não modifica dados.
- [ ] CA29 — Fluxos principais funcionam por teclado e em tela móvel.
- [ ] CA30 — Dados persistem após recarregar e entrar novamente, sem depender de LocalStorage.

### Qualidade e entrega

- [ ] CA31 — Lint, tipos e testes definidos passam no pipeline.
- [ ] CA32 — Testes cobrem permissões, transições, resolução obrigatória, atomicidade e concorrência.
- [ ] CA33 — Testes de interface cobrem validação, feedback e interações relevantes.
- [ ] CA34 — E2E cobre abertura, atendimento, comentário, resolução e acesso indevido.
- [ ] CA35 — Demonstração usa somente dados fictícios e contas sem privilégios externos.
- [ ] CA36 — Documentação informa entregas, comandos verificados e limitações reais; link de demonstração só aparece após publicação.

## Fora do escopo

- Cadastro público, recuperação de senha, administração de usuários e perfil administrador.
- Edição ou exclusão de chamados e comentários.
- Reabertura, transferência e múltiplos responsáveis.
- Anexos e comentários internos.
- Notificações externas e atualização em tempo real.
- SLA, escalonamento e distribuição automática.
- Integrações externas, múltiplas organizações e relatórios de produtividade.
- Alegações de escala, disponibilidade, impacto ou métricas sem evidências.
