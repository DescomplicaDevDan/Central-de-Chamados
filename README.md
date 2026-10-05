# Central de Chamados

Pedidos de suporte dispersos dificultam acompanhar responsáveis e soluções. Este projeto propõe uma central interna com abertura, atendimento e histórico de chamados.

**Em desenvolvimento — demonstração ainda não publicada.** Projeto de portfólio voltado a Front-end Júnior.

## Estado atual

Base com Next.js App Router, React, TypeScript estrito, Tailwind CSS e ESLint. A página inicial informa o andamento do projeto.

Login, banco de dados, chamados e testes automatizados ainda não estão implementados. Próxima etapa: layout responsivo, navegação e componentes compartilhados.

## Executar localmente

Ambiente verificado: Node.js 26.4.0 e npm 11.17.0. A versão de Node está em `.nvmrc`; as dependências são fixadas em `package-lock.json`. O Next.js requer Node.js 20.9.0 ou superior; este projeto aceita versões anteriores à 27.

```bash
git clone https://github.com/DescomplicaDevDan/Central-de-Chamados.git
cd Central-de-Chamados
npm ci
npm run dev
```

Abra [localhost:3000](http://localhost:3000). Nesta etapa não são necessários banco ou variáveis de ambiente.

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
- PostgreSQL, Prisma e Zod estão planejados; não instalados nesta etapa.
- Dependências e lock versionados; arquivos gerados e segredos ignorados pelo Git.

Consulte a [documentação](docs/README.md), as [regras e critérios de aceite](docs/produto.md) e as [decisões técnicas](docs/arquitetura.md).

## Autor

[DescomplicaDevDan no GitHub](https://github.com/DescomplicaDevDan) · [Repositório](https://github.com/DescomplicaDevDan/Central-de-Chamados)

Portfólio, LinkedIn e outros repositórios serão incluídos quando os links forem fornecidos.
