import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PatientShowApi } from "../../api";

import { usePatientShowQuery } from "../usePatientShowQuery";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

jest.mock("../../api", () => ({
  PatientShowApi: jest.fn(),
}));

describe("usePatientShowQuery", () => {
  it("Should call PatientShowApi correctly", async () => {
    const mockData = {
      success: true,
      data: {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        phone: "9999",
      },
      notifications: [],
    };

    (PatientShowApi as jest.Mock).mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => usePatientShowQuery("1"), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(PatientShowApi).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockData.data);
  });
});
