import Link from "next/link";

export function MobileNav() {
  return (
    <nav
      aria-label="Navegação móvel"
      className="fixed inset-x-0 bottom-0 border-t border-slate-200 bg-white p-2 md:hidden"
    >
      <ul className="grid grid-cols-3 gap-1">
        <li>
          <Link
            className="block rounded-md bg-slate-100 px-3 py-2 text-center text-sm font-medium text-slate-900"
            href="/"
          >
            Início
          </Link>
        </li>

        <li>
          <span className="block px-3 py-2 text-center text-sm text-slate-500">
            Chamados
          </span>
        </li>

        <li>
          <span className="block px-3 py-2 text-center text-sm text-slate-500">
            Novo
          </span>
        </li>
      </ul>
    </nav>
  );
}