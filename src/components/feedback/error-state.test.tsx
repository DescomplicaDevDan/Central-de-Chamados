import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "@/components/ui/button";

import { ErrorState } from "./error-state";

describe("ErrorState", () => {
  it("exibe uma mensagem em uma região de alerta", () => {
    render(
      <ErrorState
        description="Tente novamente em alguns instantes."
        title="Não foi possível carregar os chamados"
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Não foi possível carregar os chamados",
    );
    expect(
      screen.getByText("Tente novamente em alguns instantes."),
    ).toBeInTheDocument();
  });

  it("exibe uma ação opcional", () => {
    render(
      <ErrorState
        action={<Button>Tentar novamente</Button>}
        description="Tente novamente em alguns instantes."
        title="Não foi possível carregar os chamados"
      />,
    );

    expect(
      screen.getByRole("button", { name: "Tentar novamente" }),
    ).toBeInTheDocument();
  });
});