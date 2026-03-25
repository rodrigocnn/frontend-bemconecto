import { renderHook, act } from "@testing-library/react";

import { useDeletePatient } from "../useDeletePatient";
import { useRouter } from "next/router";
import { useColumnsDataGrid } from "../useColumnsDatagrid";

// --- Mocks ---
jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
  }),
}));

jest.mock("./../useDeletePatient", () => ({
  useDeletePatient: jest.fn(),
}));

describe("useColumnsDataGrid ", () => {
  const mockMutate = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useDeletePatient as jest.Mock).mockReturnValue({ mutate: mockMutate });
  });

  it("Should call deletePatient.mutate and close the modal", () => {
    const { result } = renderHook(() => useColumnsDataGrid());

    act(() => {
      result.current.handleDeleteClick({ id: "123" });
    });

    expect(mockMutate).toHaveBeenCalledWith("123");
    expect(result.current.isModalOpen).toBe(false);
  });

  it("Should redirect user to edit route ", () => {
    const { result } = renderHook(() => useColumnsDataGrid());

    act(() => {
      result.current.handleEditClick({ id: "123" });
    });

    expect(mockPush).toHaveBeenCalledWith("/admin/pacientes/editar/123");
  });

  it("Should redirect user to session route ", () => {
    const { result } = renderHook(() => useColumnsDataGrid());

    act(() => {
      result.current.handleSessionClick({ id: "123" });
    });

    expect(mockPush).toHaveBeenCalledWith("/admin/pacientes/sessoes/123");
  });
});
