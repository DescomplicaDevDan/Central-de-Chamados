import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <AppShell>
      <section>
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
          <Card>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-950">
                Abertura de chamados
              </h2>

              <Badge variant="warning">Em breve</Badge>
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              O formulário de abertura será implementado nas próximas etapas.
            </p>

            <Button className="mt-6" disabled>
              Abrir chamado
            </Button>
          </Card>
        </div>
      </section>
    </AppShell>
  );
}