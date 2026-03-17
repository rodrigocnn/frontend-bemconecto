import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { renderHook, waitFor } from "@testing-library/react";

import { act } from "react";
import { useAppointment } from "../useAppointment";
import { mockAppointmentEvents } from "../../mocks";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

jest.mock("../useFindAllAppoitments", () => ({
  useFindAllAppoitments: jest.fn(() => ({
    isLoading: false,
    error: null,
    data: mockAppointmentEvents,
  })),
}));

describe("useAppointment", () => {
  it("Should update state modal to true", async () => {
    const { result } = renderHook(() => useAppointment(), { wrapper });

    await act(async () => {
      result.current.openModal();
    });

    expect(result.current.isModalOpen).toBe(true);
  });

  it("Should update isModalOpen and isModeUpdate state and resetFormModal ", async () => {
    const { result } = renderHook(() => useAppointment(), { wrapper });

    await act(async () => {
      result.current.closeModal();
    });

    expect(result.current.isModalOpen).toBe(false);
    expect(result.current.isModeUpdate).toBe(false);

    expect(result.current.form.getValues("patientId")).toBeFalsy();
    expect(result.current.form.getValues("date")).toBeFalsy();
    expect(result.current.form.getValues("initialTime")).toBeFalsy();
    expect(result.current.form.getValues("endTime")).toBeFalsy();
    expect(result.current.form.getValues("status")).toBeFalsy();
  });

  it("Should openModal and updateFormModal if event was selected", async () => {
    const { result } = renderHook(() => useAppointment(), { wrapper });

    const eventSelected = {
      event: {
        id: "appt-001",
      },
    };

    await act(async () => {
      result.current.handleEventClick(eventSelected);
    });

    expect(result.current.isModalOpen).toBe(true);
    expect(result.current.form.getValues("id")).toBe("appt-001");
  });
});
