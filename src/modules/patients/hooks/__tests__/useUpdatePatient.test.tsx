import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PatientUpdateApi } from "../../api";

import { useUpdatePatient } from "../useUpdatePatient";
import { mockDataPatient } from "../../mocks";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

jest.mock("../../api", () => ({
  PatientUpdateApi: jest.fn(),
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

describe("useUpdatePatient", () => {
  it("Should delete pacient correctly", async () => {
    (PatientUpdateApi as jest.Mock).mockResolvedValueOnce(mockDataPatient);
    const { result } = renderHook(() => useUpdatePatient(), { wrapper });
    result.current.mutate(mockDataPatient);
    await waitFor(() => expect(result.current.isSuccess).toBe(false));

    expect(PatientUpdateApi).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockDataPatient);
  });
});
