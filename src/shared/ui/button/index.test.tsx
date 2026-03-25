import React from "react";
import { render } from "@testing-library/react";
import { ButtonApp } from ".";

test("renderiza o botão", () => {
  const { getByRole } = render(<ButtonApp />);
  expect(getByRole("button", { name: /cadastrar/i })).toBeInTheDocument();
});
