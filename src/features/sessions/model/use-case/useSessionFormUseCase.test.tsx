import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react";
import { useSessionFormUseCase } from "./useSessionFormUseCase";
import * as validations from "../../lib/validation";
import { useSessionFormState } from "../form/useSessionFormState";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const fakeEvent = {
  target: { value: "novo valor" },
} as React.ChangeEvent<HTMLTextAreaElement>;

const form = {
  summary: "resume of session",
};

const mockCreateMutateAsync = jest.fn().mockResolvedValue(undefined);
const mockEditMutateAsync = jest.fn().mockResolvedValue(undefined);

const createSessionMock = {
  mutateAsync: mockCreateMutateAsync,
};

const editSessionMock = {
  mutateAsync: mockEditMutateAsync,
};

describe("useSessionFormUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should handleChange form correctly", () => {
    const { result } = renderHook(() => {
      const formState = useSessionFormState();

      return useSessionFormUseCase({
        formState,
        createSession: createSessionMock as never,
        editSession: editSessionMock as never,
        patientId: "1",
        mode: "create",
      });
    }, { wrapper });

    act(() => {
      result.current.handleChange(fakeEvent, "summary");
    });

    expect(result.current.form.summary).toBe("novo valor");
  });

  it("Should in mode create save session correctly", async () => {
    jest.spyOn(validations, "sessionValidation").mockResolvedValue(true);

    const { result } = renderHook(() => {
      const formState = useSessionFormState();

      return useSessionFormUseCase({
        formState,
        createSession: createSessionMock as never,
        editSession: editSessionMock as never,
        patientId: "1",
        mode: "create",
      });
    }, { wrapper });

    act(() => {
      result.current.setForm(form);
    });

    await act(async () => {
      await result.current.saveSession();
    });

    expect(mockCreateMutateAsync).toHaveBeenCalledWith(
      expect.objectContaining({
        patientId: "1",
        summary: "resume of session",
        sessionDate: expect.any(String),
      }),
    );
  });

  it("Should in mode edit save session correctly", async () => {
    jest.spyOn(validations, "sessionValidation").mockResolvedValue(true);

    const { result } = renderHook(() => {
      const formState = useSessionFormState();

      return useSessionFormUseCase({
        formState,
        createSession: createSessionMock as never,
        editSession: editSessionMock as never,
        patientId: "1",
        mode: "edit",
      });
    }, { wrapper });

    act(() => {
      result.current.setForm(form);
    });

    await act(async () => {
      await result.current.saveSession();
    });

    expect(mockEditMutateAsync).toHaveBeenCalledWith(
      expect.objectContaining({
        summary: "resume of session",
      }),
    );
  });
});
