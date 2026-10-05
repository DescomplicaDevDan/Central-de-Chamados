import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TicketFormPreview } from "./ticket-form-preview";

describe("TicketFormPreview", () => {
  it("exibe os campos obrigatórios com rótulos acessíveis", () => {
    render(<TicketFormPreview />);

    expect(screen.getByRole("textbox", { name: /título/i })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /descrição/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /categoria/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /prioridade/i }),
    ).toBeInTheDocument();
  });

  it("mantém o envio desabilitado enquanto não existe criação real", () => {
    render(<TicketFormPreview />);

    expect(
      screen.getByRole("button", { name: "Criar chamado" }),
    ).toBeDisabled();
  });
});