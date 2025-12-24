import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDeleteSession } from "../useDeleteSession";
import { sessionDelete } from "../../api";
import { renderHook, waitFor } from "@testing-library/react";
import { mockSession } from "../../mocks";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

jest.mock("../../api", () => ({
  sessionDelete: jest.fn(),
}));

describe("useDeleteSession", () => {
  it("Should delete session correctly", async () => {
    (sessionDelete as jest.Mock).mockResolvedValueOnce(mockSession);

    const { result } = renderHook(() => useDeleteSession(), { wrapper });
    result.current.mutate("sess-001");
    await waitFor(() => expect(result.current.isSuccess).toBe(false));

    expect(sessionDelete).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockSession);
  });
});
