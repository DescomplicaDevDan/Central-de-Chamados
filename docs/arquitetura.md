# Stack e arquitetura

Este documento distingue a base instalada da arquitetura planejada. A autenticação será validada antes da etapa 5.

## Base instalada na etapa 2

| Tecnologia | Versão | Uso atual |
| --- | --- | --- |
| Next.js | 16.3.8 | App Router, página inicial e comandos de desenvolvimento/build |
| React / React DOM | 19.3.0 | Renderização da página e layout |
| TypeScript | 5.9.3 | Modo estrito e checagem sem emissão |
| Tailwind CSS / plugin PostCSS | 4.3.3 | Estilos da página inicial |
| PostCSS | 8.5.28 | Processamento do CSS |
| ESLint | 9.39.5 | Análise estática com configuração Next.js |
| eslint-config-next | 16.3.8 | Regras do framework e TypeScript |

O manifesto e o lock são as fontes exatas das dependências, incluindo pacotes de tipos. Node.js 26.4.0 e npm 11.17.0 são o ambiente verificado do projeto. `.nvmrc` registra essa versão, sem instalar Node automaticamente. A automação usada para instalar pacotes também validou o lock com Node.js 22.23.0 e npm 10.9.8.

TypeScript 5.9.3 foi escolhido conservadoramente para esta base. As dependências diretas ficam fixadas, e `npm ci` reproduz o lock.

**Pendência de manutenção:** o npm sinaliza ESLint 9 como fora de suporte. ESLint 10.11.0 foi avaliado, mas o plugin React da configuração Next.js falhou com `contextOrFilename.getFilename is not a function`. A base mantém 9.39.5 por compatibilidade; revisar essa decisão quando a configuração suportar a atualização. Nenhuma regra foi desligada para contornar a falha.

A instalação manual preservou a documentação e o repositório existentes. Foram consultadas as instruções oficiais de [Next.js](https://nextjs.org/docs/app/getting-started/installation) e [Tailwind CSS](https://tailwindcss.com/docs/installation/framework-guides/nextjs).

`src/app/layout.tsx` define idioma, metadados e estilos globais. `src/app/page.tsx` é um Server Component estático. `next typegen` prepara tipos de rotas antes de `tsc --noEmit`, inclusive em uma instalação nova. Não há banco, sessão ou domínio funcional nesta etapa.

O build de produção usa `next build --webpack`. Neste ambiente Windows, o Turbopack recebeu `Access is denied` ao criar o processo que transforma o CSS; Webpack é a alternativa suportada pelo próprio Next.js e permite manter a verificação de produção reproduzível. O servidor de desenvolvimento mantém `next dev`, cujo padrão é Turbopack, e essa decisão poderá ser revista quando o ambiente permitir.

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

- [x] Registrar ambiente de referência e fixar dependências da base; acompanhar a pendência de manutenção do ESLint.
- [ ] Escolher biblioteca e estratégia de sessão.
- [ ] Definir execução local do PostgreSQL e banco isolado de testes.
- [ ] Definir estratégia transacional para disputas e operações simultâneas.
- [ ] Escolher hospedagem da aplicação e do PostgreSQL considerando custos e limitações reais.
- [ ] Definir reposição e proteção dos dados públicos de demonstração.

O projeto usa npm e `package-lock.json`. Os scripts atuais estão no README da raiz; scripts de testes serão adicionados nas entregas correspondentes.
