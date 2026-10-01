export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
      <p className="text-sm font-semibold text-blue-700">Projeto em desenvolvimento</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">Central de Chamados</h1>
      <p className="mt-5 text-lg leading-8 text-slate-700">
        Uma central interna para abrir, atender e acompanhar pedidos de suporte.
      </p>
      <p className="mt-3 leading-7 text-slate-600">
        A base técnica está em construção. Login e gerenciamento de chamados
        estarão disponíveis nas próximas etapas.
      </p>
    </main>
  );
}
