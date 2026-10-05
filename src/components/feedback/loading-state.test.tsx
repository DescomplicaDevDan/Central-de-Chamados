import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LoadingState } from "./loading-state";

describe("LoadingState", () => {
  it("exibe a mensagem padrão em uma região de status", () => {
    render(<LoadingState />);

    expect(screen.getByRole("status")).toHaveTextContent(
      "Carregando dados...",
    );
  });

  it("exibe uma mensagem personalizada", () => {
    render(<LoadingState message="Carregando chamados..." />);

    expect(screen.getByRole("status")).toHaveTextContent(
      "Carregando chamados...",
    );
  });
});
