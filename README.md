# Central de Chamados

Pedidos de suporte dispersos dificultam acompanhar responsáveis e soluções. Este projeto propõe uma central interna com abertura, atendimento e histórico de chamados.

**Em desenvolvimento — demonstração ainda não publicada.** Projeto de portfólio voltado a Front-end Júnior.

## Estado atual

A interface usa Next.js App Router, React, TypeScript estrito, Tailwind CSS e componentes reutilizáveis. Vitest e React Testing Library estão configurados para testes de componentes.

O PostgreSQL local pode ser iniciado com Docker Compose. Prisma, esquema do banco, autenticação e integração dos chamados com o banco ainda estão pendentes. A aplicação ainda não lê nem grava dados no PostgreSQL.

## Executar localmente

Requisitos: Node.js e npm conforme `.nvmrc`, e Docker Desktop em execução.

Clone o repositório e instale as dependências:

```powershell
git clone https://github.com/DescomplicaDevDan/Central-de-Chamados.git
cd Central-de-Chamados
npm ci
```

No primeiro uso, crie o arquivo local de variáveis e defina nele uma senha exclusiva:

```powershell
Copy-Item .env.example .env
```

Abra `.env` e preencha `POSTGRES_PASSWORD` com uma senha exclusiva para o banco local. Não compartilhe nem versione esse arquivo.

Inicie o PostgreSQL e confira se está pronto:

```powershell
docker compose up -d
docker compose ps
```

O serviço `db` deve aparecer com status `healthy`. Inicie a aplicação em outro terminal:

```powershell
npm run dev
```

Abra [localhost:3000](http://localhost:3000). A aplicação ainda não lê nem grava dados no PostgreSQL. Para parar o banco sem remover seus dados locais:

```powershell
docker compose stop
```

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run lint` | Análise estática, sem permitir avisos |
| `npm run typecheck` | Geração de tipos de rotas e checagem TypeScript |
| `npm test` | Executa testes unitários e de componentes uma vez |
| `npm run test:watch` | Executa testes novamente ao salvar alterações |
| `npm run build` | Build de produção com Webpack |
| `npm start` | Servir o build de produção |

Vitest e React Testing Library estão configurados para testes de componentes. Playwright e GitHub Actions serão incorporados conforme o [roteiro](docs/etapas.md).

## Arquitetura e decisões

- Código em `src/app`, com página e layout como Server Components.
- Domínios `tickets`, `auth` e `users` serão criados quando suas funcionalidades forem implementadas.
- Server Actions e Route Handlers atenderão as operações no servidor, sem Express separado.
- PostgreSQL local é executado com Docker Compose; Prisma e Zod ainda não estão instalados, e a aplicação ainda não se conecta ao banco.
- Dependências e lock versionados; arquivos gerados e segredos ignorados pelo Git.

Consulte a [documentação](docs/README.md), as [regras e critérios de aceite](docs/produto.md) e as [decisões técnicas](docs/arquitetura.md).

## Autor

[DescomplicaDevDan no GitHub](https://github.com/DescomplicaDevDan) · [Repositório](https://github.com/DescomplicaDevDan/Central-de-Chamados)

Portfólio, LinkedIn e outros repositórios serão incluídos quando os links forem fornecidos.
