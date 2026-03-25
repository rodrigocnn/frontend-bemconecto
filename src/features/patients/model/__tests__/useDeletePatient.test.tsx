import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PatientDelete } from "@/features/patients/api";
import { useDeletePatient } from "../useDeletePatient";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

jest.mock("@/features/patients/api", () => ({
  PatientDelete: jest.fn(),
}));

describe("useDeletePatient", () => {
  it("Should delete pacient correctly", async () => {
    const mockData = [
      { id: "1", name: "John Doe", email: "john@example.com", phone: "9999" },
    ];

    (PatientDelete as jest.Mock).mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useDeletePatient(), { wrapper });

    result.current.mutate("1");

    await waitFor(() => expect(result.current.isSuccess).toBe(false));

    expect(PatientDelete).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockData);
  });
});
