# Stack e arquitetura planejadas

Este documento descreve decisões de projeto, não uma implementação existente. Versões e compatibilidade serão verificadas na etapa 2 e registradas no manifesto e no arquivo de lock. A autenticação será validada antes da etapa 5.

## Tecnologias

Nem todos os itens são frameworks: há bibliotecas, linguagem, banco e ferramentas.

| Tecnologia | Categoria | Responsabilidade |
| --- | --- | --- |
| Next.js com App Router | Framework | Rotas, renderização e operações no servidor |
| React | Biblioteca de interface | Composição dos componentes |
| TypeScript estrito | Linguagem | Tipagem e verificações estáticas |
| JavaScript | Linguagem de execução | Fundamento do código TypeScript e das interações |
| Tailwind CSS | Framework CSS | Estilos responsivos e consistentes |
| PostgreSQL | Banco relacional | Persistência e integridade dos dados |
| Prisma ORM | ORM e migrações | Acesso tipado ao banco e evolução do esquema |
| Zod | Biblioteca | Validação dos dados recebidos |
| Autenticação: a definir | Biblioteca | Credenciais, sessões e integração compatível com Next.js |
| Vitest | Ferramenta de testes | Testes unitários e de integração |
| React Testing Library | Biblioteca de testes | Comportamento dos componentes pelo uso da interface |
| Playwright | Ferramenta de testes | Fluxos ponta a ponta no navegador |
| ESLint | Análise estática | Problemas de código e convenções |
| Git / GitHub | Versionamento e colaboração | Histórico, repositório e issues |
| GitHub Projects | Organização | Quadro Kanban |
| GitHub Actions | Automação | Pipeline de qualidade e testes |

## Organização proposta

```text
src/
  app/                 # Rotas, layouts, páginas, actions e handlers
  domains/
    auth/              # Sessão, autenticação e acesso
    users/             # Perfis e dados de usuário
    tickets/           # Consultas, comandos, validação e regras de chamados
  components/          # Componentes compartilhados de interface
  lib/                 # Banco e utilitários de infraestrutura
prisma/                # Esquema, migrações e seed
tests/                 # Integração e E2E; unitários podem ficar junto ao domínio
docs/                  # Especificação, decisões e roteiro
.github/workflows/     # Pipeline
```

A estrutura será criada gradualmente, conforme houver código que justifique cada arquivo. Evitar abstrações genéricas sem uso real.

## Responsabilidades

- **Server Components:** leitura de dados e renderização quando não for necessária interação no navegador.
- **Client Components:** formulários interativos, confirmações e outros comportamentos que dependem do navegador.
- **Server Actions:** entrada preferencial para mutações feitas pela interface; sempre validar sessão, entrada e autorização.
- **Route Handlers:** endpoints quando necessários, como os exigidos pela solução de autenticação. Não criar uma API REST redundante para cada action.
- **Domínio tickets:** fonte única das regras de transição, responsabilidade e acesso aos chamados.
- **Prisma e PostgreSQL:** persistência, transações e restrições de integridade. Acesso somente pelo servidor.

Não haverá servidor Express separado. Componentes cliente não importam cliente de banco nem módulos com segredos.

## Fluxo de dados

```text
Interação na interface
  → Server Action ou Route Handler
  → validação da sessão e da entrada
  → autorização e regras do domínio
  → operação transacional via Prisma
  → PostgreSQL: dados e histórico
  → resposta e atualização dos dados exibidos
```

Consultas seguem página no servidor → sessão e escopo autorizado → consulta filtrada ao banco → renderização. Dados protegidos não podem ser compartilhados entre usuários por configuração incorreta de cache.

Tipos TypeScript ajudam durante o desenvolvimento; não validam uma requisição recebida. Zod valida os dados em execução. A camada de domínio decide se a operação é permitida.

Esquemas de formato podem ser compartilhados com formulários. Regras de negócio e autorização não serão reimplementadas em componentes. A interface pode receber permissões de ação calculadas no servidor; toda mutação ainda revalida essas permissões.

## Modelo relacional previsto

- User possui chamados como solicitante e, quando atendente, como responsável.
- Ticket pertence a um solicitante e pode ter um responsável.
- Comment pertence a um Ticket e a um autor.
- TicketHistory pertence a um Ticket e a um autor.
- Status e Priority serão valores enumerados com rótulos em português na interface.
- Datas serão armazenadas de forma consistente e formatadas para apresentação.
- Índices serão definidos para as consultas implementadas; não serão apresentados ganhos de desempenho sem medição.
- Restrições do banco complementarão as regras do domínio quando apropriado.

## Autenticação e demonstração

- Escolher biblioteca mantida e compatível com as versões adotadas, evitando criar um protocolo próprio.
- Sessão em cookie com proteções apropriadas, incluindo HttpOnly, SameSite e Secure em produção.
- Definir expiração, invalidação no logout e proteção de operações conforme a biblioteca.
- Senhas persistidas somente com hash adequado; nunca em texto simples.
- Nenhum segredo de infraestrutura no repositório, nas respostas ou nos logs.
- LocalStorage não será fonte dos chamados ou da autenticação.
- Seed reproduzível com dados fictícios; bancos de desenvolvimento, testes e demonstração separados.
- Contas de demonstração não reutilizam credenciais reais ou de serviços externos.
- Limites de uso, reposição dos dados e proteção contra abuso serão definidos antes da publicação.

## Estratégia de testes

| Camada | Evidências esperadas |
| --- | --- |
| Unitários | Validação, permissões e transições de status |
| Componentes | Campos, mensagens, estados pendentes e confirmações pelo comportamento visível |
| Integração com PostgreSQL | Persistência, restrições, rollback e tentativas concorrentes |
| E2E | Login, abertura, atendimento, comentários, resolução e isolamento entre usuários |
| CI | Instalação reproduzível, lint, tipos, testes e build |

Mocks não comprovam transações ou concorrência no banco. Esses cenários exigem integração com PostgreSQL de teste. Os testes serão adicionados junto das funcionalidades; a etapa 9 consolida a cobertura e o pipeline.

## Decisões pendentes

- [ ] Fixar versões compatíveis de Node.js, gerenciador de pacotes e dependências.
- [ ] Escolher biblioteca e estratégia de sessão.
- [ ] Definir execução local do PostgreSQL e banco isolado de testes.
- [ ] Definir estratégia transacional para disputas e operações simultâneas.
- [ ] Escolher hospedagem da aplicação e do PostgreSQL considerando custos e limitações reais.
- [ ] Definir reposição e proteção dos dados públicos de demonstração.

O uso de npm nos exemplos do processo é uma convenção inicial; os comandos executáveis só serão documentados como verificados depois da criação dos scripts.
