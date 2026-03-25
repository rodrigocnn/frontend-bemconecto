import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PatientCreate } from "@/features/patients/api";

import { mockDataPatient } from "../../mocks";
import { useCreatePatient } from "../useCreatePatient";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

jest.mock("@/features/patients/api", () => ({
  PatientCreate: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
  }),
}));

describe("useCreatePatient", () => {
  it("Should create patient correctly", async () => {
    (PatientCreate as jest.Mock).mockResolvedValueOnce(mockDataPatient);
    const { result } = renderHook(() => useCreatePatient(), { wrapper });
    result.current.mutate(mockDataPatient);
    await waitFor(() => expect(result.current.isSuccess).toBe(false));

    expect(PatientCreate).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockDataPatient);
  });
});
