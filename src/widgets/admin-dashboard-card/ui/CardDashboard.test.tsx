import React from "react";
import { render } from "@testing-library/react";
import { CardDashboard } from "./CardDashboard";

describe("CardDashboard", () => {
  it("Should render correctly", () => {
    const { getByText } = render(
      <CardDashboard
        title="Pacientes"
        link="/admin/contratos"
        value="+50"
        miniDescription="Em relação ao mês passado"
        color="blue"
      />
    );

    expect(getByText(/Pacientes/)).toBeInTheDocument();
    expect(getByText("+50")).toBeInTheDocument();
    expect(getByText(/Em relação ao mês passado/)).toBeInTheDocument();
  });
});
