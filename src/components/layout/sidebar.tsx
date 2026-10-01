import Link from "next/link";

export function Sidebar() {
  return (
    <aside
      aria-label="Navegação principal"
      className="hidden w-64 flex-col border-r border-slate-200 bg-white p-4 md:flex"
    >
      <p className="px-3 py-2 text-sm font-semibold text-slate-900">
        Central de Chamados
      </p>

      <nav className="mt-6">
        <ul className="space-y-1">
          <li>
            <Link
                className="block rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-900"
                href="/"
            >
                Visão geral
            </Link>
          </li>

          <li>
            <span className="block px-3 py-2 text-sm text-slate-500">
              Meus chamados
            </span>
          </li>

          <li>
            <span className="block px-3 py-2 text-sm text-slate-500">
              Novo chamado
            </span>
          </li>
        </ul>
      </nav>

      <div className="mt-auto">
        <span className="block px-3 py-2 text-sm text-slate-500">Sair</span>
      </div>
    </aside>
  );
}