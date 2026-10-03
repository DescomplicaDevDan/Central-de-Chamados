import { AppShell } from "@/components/layout/app-shell";
import { TicketFormPreview } from "@/domains/tickets/components/ticket-form-preview";

export default function HomePage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold text-blue-700">
          Projeto em desenvolvimento
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
          Visão geral
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
          A Central de Chamados permitirá que solicitantes acompanhem pedidos de
          suporte e que atendentes organizem seus atendimentos.
        </p>

        <div className="mt-8 max-w-xl">
          <TicketFormPreview />
        </div>
      </section>
    </AppShell>
  );
}