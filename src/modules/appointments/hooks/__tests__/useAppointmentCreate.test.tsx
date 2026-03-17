import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AppointmentCreate } from "../../api";
import { renderHook, waitFor } from "@testing-library/react";

import { useAppointmentCreate } from "../useAppointmentCreate";
import { act } from "react";
import { mockAppointmentStore } from "../../mocks";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

jest.mock("../../api", () => ({
  AppointmentCreate: jest.fn(),
}));

describe("useAppointmentCreate", () => {
  it("Should call create mutate correctly", async () => {
    const mockResponse = {
      success: true,
      data: mockAppointmentStore,
      notifications: [],
    };

    (AppointmentCreate as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useAppointmentCreate(), {
      wrapper,
    });

    result.current.mutate(mockAppointmentStore);
    await waitFor(() => expect(result.current.isSuccess).toBe(false));

    expect(AppointmentCreate).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockAppointmentStore);
  });
});
