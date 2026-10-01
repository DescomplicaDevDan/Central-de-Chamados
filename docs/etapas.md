# Etapas e checklist de execução

Trabalhar uma etapa por vez. Antes de editar, apresentar objetivo, arquivos envolvidos e decisão técnica. Depois, explicar o fluxo de dados, os trechos importantes e as verificações realizadas. O autor executa stage, commit, push, merge e deploy manualmente.

Os caminhos abaixo são previstos e podem ser refinados antes da implementação. Nenhum checklist implica que a funcionalidade já exista.

## 1. Documentar o produto

**Objetivo:** fechar escopo e regras antes de criar código.

**Arquivos:** `docs/README.md`, `docs/produto.md`, `docs/arquitetura.md`, `docs/etapas.md`, `docs/processo.md`.

- [x] Registrar problema, usuários, escopo e fluxos.
- [x] Definir permissões, transições e critérios de aceite.
- [x] Registrar stack, arquitetura, etapas e Kanban.
- [x] Identificar itens fora do escopo e decisões pendentes.
- [ ] Revisar a documentação com o autor do projeto.
- [ ] Autor realizar o commit manual da documentação.

**Verificação:** coerência entre regras, critérios, roadmap e links locais. Não há testes de aplicação nesta etapa.

**Fluxo de dados:** apenas descrito; nenhum dado é enviado ou persistido.

## 2. Criar a base do projeto

**Objetivo:** ter uma base executável e verificável.

**Arquivos previstos:** manifesto e lock de dependências, configurações do Next.js, TypeScript, ESLint e Tailwind, `.gitignore`, `src/app/`, README inicial.

- [ ] Verificar compatibilidade e registrar versões adotadas.
- [ ] Criar Next.js com App Router e TypeScript estrito.
- [ ] Configurar Tailwind CSS e ESLint.
- [ ] Criar scripts de desenvolvimento, lint, typecheck e build.
- [ ] Organizar diretórios por domínio conforme a necessidade.
- [ ] Documentar requisitos e comandos locais efetivamente disponíveis.
- [ ] Verificar que segredos e arquivos gerados não serão versionados.

**Verificação:** instalar pelo lock, executar lint, typecheck e build; iniciar a aplicação localmente.

**Fluxo de dados:** navegador solicita uma rota → Next.js renderiza a página inicial. Ainda sem banco.

## 3. Criar layout e estados visuais

**Objetivo:** estabelecer navegação e componentes reutilizáveis.

**Arquivos previstos:** layouts e páginas em `src/app/`, estilos e `src/components/`.

- [ ] Criar estrutura responsiva e navegação para os dois perfis.
- [ ] Criar campos, botões, badges de status, mensagens e confirmação acessível.
- [ ] Implementar estados de carregamento, vazio, erro e envio pendente.
- [ ] Verificar rótulos, foco, contraste e navegação por teclado.
- [ ] Usar dados fictícios temporários claramente identificados, sem simular persistência real.
- [ ] Usar Client Components apenas onde houver interação.

**Verificação:** lint, tipos, build e inspeção em celular e desktop; testes de componentes para interações relevantes quando configurados.

**Fluxo de dados:** navegação → página → componentes. Dados temporários ainda não representam registros no banco.

## 4. Modelar banco e migrações

**Objetivo:** persistir o domínio com integridade.

**Arquivos previstos:** `prisma/`, módulo de banco em `src/lib/`, `.env.example`, documentação local e testes de integração.

- [ ] Configurar PostgreSQL local e de testes isolados.
- [ ] Modelar User, Ticket, Comment, TicketHistory, Status e Priority.
- [ ] Definir relações, nulabilidade, restrições e índices iniciais.
- [ ] Criar migração inicial versionada.
- [ ] Validar migrações em banco vazio de desenvolvimento ou teste.
- [ ] Criar seed inicial fictício e reproduzível.
- [ ] Documentar variáveis sem valores secretos.

**Verificação:** validação do esquema, geração do cliente, aplicação de migrações e integridade referencial em banco de teste.

**Fluxo de dados:** scripts locais → Prisma → PostgreSQL. A interface ainda não precisa consumir o banco.

## 5. Implementar autenticação e autorização

**Objetivo:** identificar usuários e proteger operações.

**Arquivos previstos:** `src/domains/auth/`, `src/domains/users/`, páginas de login, integração da biblioteca de autenticação e seed.

- [ ] Validar e registrar a escolha da biblioteca de autenticação.
- [ ] Implementar login, sessão e logout.
- [ ] Armazenar senhas com hash adequado.
- [ ] Proteger páginas, consultas e mutações no servidor.
- [ ] Obter perfil e autoria a partir da sessão.
- [ ] Impedir alteração de perfil pela requisição.
- [ ] Testar credenciais inválidas, expiração ou sessão inválida, logout e restrições de perfil.

**Verificação:** CA01–CA04 e CA06; parte de CA05 será concluída junto das consultas de chamados. Executar verificações estáticas e testes aplicáveis.

**Fluxo de dados:** formulário → biblioteca no servidor → credenciais e usuário → sessão protegida → página autorizada.

## 6. Criar, listar e detalhar chamados

**Objetivo:** entregar o primeiro fluxo completo do solicitante.

**Arquivos previstos:** `src/domains/tickets/`, páginas de listagem, criação e detalhe; testes correspondentes.

- [ ] Validar formulário com Zod no servidor.
- [ ] Criar chamado Aberto e histórico na mesma transação.
- [ ] Implementar listagem e detalhe respeitando visibilidade.
- [ ] Exibir responsável, status, categoria, prioridade e datas.
- [ ] Tratar dados inválidos, registro inexistente e acesso indevido.
- [ ] Integrar estados visuais aos dados reais.
- [ ] Remover dados temporários das telas entregues.

**Verificação:** CA05 e CA07–CA10, persistência de CA30 e estados pertinentes. Testar leitura cruzada entre solicitantes e rollback da criação.

**Fluxo de dados:** envio → sessão e Zod → domínio → transação de chamado e histórico → PostgreSQL → detalhe atualizado.

## 7. Implementar atendimento e resolução

**Objetivo:** permitir atendimento consistente por um único responsável.

**Arquivos previstos:** comandos do domínio tickets, ações de assumir e resolver, confirmações e testes de integração.

- [ ] Assumir e iniciar atendimento em operação atômica.
- [ ] Restringir resolução ao responsável.
- [ ] Exigir descrição válida para resolver.
- [ ] Gravar resolução, data e histórico na mesma transação.
- [ ] Rejeitar transições inválidas e operações repetidas incompatíveis.
- [ ] Tratar disputa entre atendentes e tela desatualizada.
- [ ] Confirmar ações e atualizar os dados exibidos após sucesso.

**Verificação:** CA11–CA18 e CA28, exceto partes de comentários concluídas na etapa 8; integração com PostgreSQL para concorrência e atomicidade.

**Fluxo de dados:** confirmação → sessão → autorização e estado atual → atualização condicional/transacional e histórico → resposta ou conflito → interface atualizada.

## 8. Implementar comentários, histórico e consultas completas

**Objetivo:** completar acompanhamento e organização da fila.

**Arquivos previstos:** consultas e comandos de tickets, componentes de comentários e histórico, filtros e paginação.

- [ ] Adicionar comentários com autoria e histórico atômicos.
- [ ] Aplicar permissões e bloqueio após resolução, inclusive sob concorrência.
- [ ] Exibir histórico cronológico completo.
- [ ] Implementar busca por identificador e título.
- [ ] Implementar filtros combináveis e filtros do atendente.
- [ ] Implementar paginação de 10 itens e contagens autorizadas.
- [ ] Preservar critérios na URL e voltar à página 1 ao alterá-los.
- [ ] Tratar parâmetros inválidos e ausência de resultados.

**Verificação:** completar CA13, CA17 e CA19–CA26; testar combinação de filtros, isolamento de dados e concorrência entre comentário e resolução.

**Fluxo de dados:** comentário → comando autorizado → comentário e histórico no banco. Filtros → URL validada → consulta paginada no servidor → lista autorizada.

## 9. Consolidar testes, acessibilidade e CI

**Objetivo:** tornar a qualidade reproduzível. Testes das funcionalidades começam nas etapas anteriores.

**Arquivos previstos:** configuração Vitest, testes de componentes e integração, configuração Playwright, `tests/`, `.github/workflows/` e documentação de comandos.

- [ ] Cobrir regras críticas com Vitest.
- [ ] Testar formulários e confirmações com React Testing Library.
- [ ] Verificar transações e concorrência em PostgreSQL isolado.
- [ ] Cobrir fluxos de ambos os perfis com Playwright.
- [ ] Cobrir tentativa de acesso indevido em E2E.
- [ ] Revisar teclado, foco, rótulos, mensagens e responsividade.
- [ ] Criar CI com instalação pelo lock, lint, tipos, testes e build.
- [ ] Preparar banco e dados de teste reproduzíveis no CI.
- [ ] Separar segredos e ambientes; não usar banco de demonstração em testes.
- [ ] Documentar resultados reais e eventuais limitações.

**Verificação:** CA27–CA34 e revisão dos critérios anteriores. Confirmar a execução do pipeline após o autor enviar as alterações ao GitHub.

**Fluxo de dados:** testes simulam interações e requisições → aplicação de teste → banco isolado → asserções sobre resultados e efeitos persistidos.

## 10. Preparar publicação e documentação final

**Objetivo:** disponibilizar uma demonstração segura e apresentar evidências do projeto.

**Arquivos previstos:** README da raiz, instruções de publicação, `.env.example`, seed de demonstração e configurações do provedor escolhido.

- [ ] Selecionar hospedagem e registrar limitações/custos conhecidos.
- [ ] Preparar variáveis, migrações e procedimento de publicação.
- [ ] Preparar dados fictícios e contas de demonstração.
- [ ] Definir reposição dos dados e proteção contra abuso.
- [ ] Autor executar deploy e operações de produção manualmente.
- [ ] Verificar fluxos principais no ambiente publicado com dados fictícios.
- [ ] Publicar README curto com problema, solução e link real da demonstração.
- [ ] Incluir funcionalidades, stack, arquitetura e decisões importantes.
- [ ] Documentar execução local, testes e comandos conferidos.
- [ ] Informar limitações reais e próximos passos.
- [ ] Incluir portfólio, LinkedIn e repositórios principais quando fornecidos.
- [ ] Usar GIF ou imagens somente se ajudarem a explicar o fluxo.
- [ ] Revisar todos os critérios e remover alegações sem evidência.

**Verificação:** CA35–CA36, instalação local seguindo o README, verificações de qualidade e teste de fumaça após deploy manual.

**Fluxo de dados:** navegador → aplicação hospedada → autorização no servidor → PostgreSQL da demonstração → resposta. Publicação é uma ação manual do autor.
