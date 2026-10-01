import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Central de Chamados",
  description: "Projeto de uma central interna de suporte. Em desenvolvimento.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-50 text-slate-950 antialiased">{children}</body>
    </html>
  );
}
