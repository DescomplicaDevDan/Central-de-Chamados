import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "./button";

describe("Button", () => {
  it("renderiza um botão desabilitado", () => {
    render(<Button disabled>Salvar</Button>);

    expect(
      screen.getByRole("button", { name: "Salvar" }),
    ).toBeDisabled();
  });
});