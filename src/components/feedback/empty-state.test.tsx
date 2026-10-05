import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "@/components/ui/button";

import { EmptyState } from "./empty-state";

describe("EmptyState", () => {
  it("exibe título e descrição", () => {
    render(
      <EmptyState
        description="Crie seu primeiro chamado para solicitar suporte."
        title="Nenhum chamado encontrado"
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Nenhum chamado encontrado" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Crie seu primeiro chamado para solicitar suporte."),
    ).toBeInTheDocument();
  });

  it("exibe uma ação opcional", () => {
    render(
      <EmptyState
        action={<Button>Novo chamado</Button>}
        description="Crie seu primeiro chamado para solicitar suporte."
        title="Nenhum chamado encontrado"
      />,
    );

    expect(
      screen.getByRole("button", { name: "Novo chamado" }),
    ).toBeInTheDocument();
  });
});
