import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react";
import { useSessionFormController } from "../useSessionFormController";
import * as validations from "../../lib/validation";
import { persistMapperSession, updateMapperSession } from "../../lib/mappers";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
  }),
}));

const fakeEvent = {
  target: { value: "novo valor" },
} as React.ChangeEvent<HTMLTextAreaElement>;

const form = {
  summary: "resume of session",
};

const mockMutate = jest.fn();

jest.mock("../useCreateSession", () => ({
  useCreateSession: () => ({
    mutate: mockMutate, // Aqui você consegue espiar se foi chamado
  }),
}));

jest.mock("../useEditSession", () => ({
  useEditSession: () => ({
    mutate: mockMutate,
  }),
}));

describe("useSessionFormController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should handleChange form correctly", () => {
    const { result } = renderHook(
      () => useSessionFormController("1", "create"),
      {
        wrapper,
      },
    );

    act(() => {
      result.current.handleChange(fakeEvent, "summary");
    });

    expect(result.current.form.summary).toBe("novo valor");
  });

  it("Should in mode create save session correctly", async () => {
    jest.spyOn(validations, "sessionValidation").mockResolvedValue(true);

    const { result } = renderHook(
      () => useSessionFormController("1", "create"),
      {
        wrapper,
      },
    );

    act(() => {
      result.current.setForm(form);
    });

    await act(async () => {
      await result.current.saveSession();
    });

    persistMapperSession(result.current.form, "1");

    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        patientId: "1",
        summary: "resume of session",
        status: "COMPLETED",
      })
    );
  });

  it("Should in mode edit save session correctly", async () => {
    jest.spyOn(validations, "sessionValidation").mockResolvedValue(true);

    const { result } = renderHook(
      () => useSessionFormController("1", "edit"),
      {
        wrapper,
      },
    );

    act(() => {
      result.current.setForm(form);
    });

    await act(async () => {
      await result.current.saveSession();
    });

    updateMapperSession(result.current.form);

    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        summary: "resume of session",
      })
    );
  });
});
