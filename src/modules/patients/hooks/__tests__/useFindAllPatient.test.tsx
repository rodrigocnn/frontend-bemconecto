import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { patientsFindAll } from "../../api";
import { useFindAllPatients } from "../useFindAllPatients";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

jest.mock("../../api", () => ({
  patientsFindAll: jest.fn(),
}));

describe("useFindAllPatients", () => {
  it("Should reset form with initial values", async () => {
    const mockData = [
      { id: "1", name: "John Doe", email: "john@example.com", phone: "9999" },
    ];

    (patientsFindAll as jest.Mock).mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useFindAllPatients(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(patientsFindAll).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockData);
  });
});
