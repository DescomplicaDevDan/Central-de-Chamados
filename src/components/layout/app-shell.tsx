import type { ReactNode } from "react";

import { MobileNav } from "./mobile-nav";
import { Sidebar } from "./sidebar";

type AppShellProps = Readonly<{
  children: ReactNode;
}>;

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-8">
          <p className="text-sm font-semibold text-slate-900 md:hidden">
            Central de Chamados
          </p>

          <p className="ml-auto text-sm text-slate-600">
            Usuário temporário
          </p>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 pb-24 md:px-8 md:py-8 md:pb-8">
          {children}
        </main>
      </div>

      <MobileNav />
    </div>
  );
}