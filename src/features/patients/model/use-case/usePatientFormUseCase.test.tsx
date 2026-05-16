import React from "react";
import { renderHook } from "@testing-library/react";
import { act } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { INITIAL_STATE_FORM_CLIENT } from "../shared/constants";
import { formatCPF, formatPhone } from "@/shared/lib/formatters";

import * as validations from "../../lib/validation";
import { usePatientFormUseCase } from "./usePatientFormUseCase";
import { usePatientFormState } from "../form/usePatientFormState";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
  }),
}));

const mockCreateMutateAsync = jest.fn().mockResolvedValue(undefined);
const mockUpdateMutateAsync = jest.fn().mockResolvedValue(undefined);

const createPatientMock = {
  mutateAsync: mockCreateMutateAsync,
  isPending: false,
};

const updatePatientMock = {
  mutateAsync: mockUpdateMutateAsync,
  isPending: false,
};

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("usePatientFormUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should reset form with initial values", async () => {
    const { result } = renderHook(() => {
      const formState = usePatientFormState();

      return usePatientFormUseCase({
        formState,
        createPatient: createPatientMock as never,
        updatePatient: updatePatientMock as never,
      });
    }, { wrapper });

    act(() => {
      result.current.setForm(INITIAL_STATE_FORM_CLIENT);
    });

    await act(async () => {
      result.current.resetForm();
    });

    expect(result.current.form).toEqual(INITIAL_STATE_FORM_CLIENT);
  });

  it("Should update form location when handleLocationChange is called", async () => {
    const { result } = renderHook(() => {
      const formState = usePatientFormState();

      return usePatientFormUseCase({
        formState,
        createPatient: createPatientMock as never,
        updatePatient: updatePatientMock as never,
      });
    }, { wrapper });

    const updateForm = {
      ...INITIAL_STATE_FORM_CLIENT,
      location: { latitude: "41.40338", longitude: " 2.17403" },
    };

    act(() => {
      result.current.setForm(updateForm);
    });

    expect(result.current.form).toEqual(updateForm);
  });

  it("should update the form phone field with formatted value", () => {
    const { result } = renderHook(() => {
      const formState = usePatientFormState();

      return usePatientFormUseCase({
        formState,
        createPatient: createPatientMock as never,
        updatePatient: updatePatientMock as never,
      });
    }, { wrapper });

    const event = {
      target: {
        name: "phone",
        value: "11987654321",
      },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChangePhone(event);
    });

    expect(result.current.form.phone).toEqual(formatPhone("11987654321"));
  });

  it("should update the form cpf field with formatted value", () => {
    const { result } = renderHook(() => {
      const formState = usePatientFormState();

      return usePatientFormUseCase({
        formState,
        createPatient: createPatientMock as never,
        updatePatient: updatePatientMock as never,
      });
    }, { wrapper });

    const event = {
      target: {
        name: "cpf",
        value: "80852848873",
      },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChangeCPF(event);
    });

    expect(result.current.form.cpf).toEqual(formatCPF("80852848873"));
  });

  it("should update the form when handleChange is called", () => {
    const { result } = renderHook(() => {
      const formState = usePatientFormState();

      return usePatientFormUseCase({
        formState,
        createPatient: createPatientMock as never,
        updatePatient: updatePatientMock as never,
      });
    }, { wrapper });

    const event = {
      target: {
        name: "email",
        value: "carlos@globo.com",
      },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChange(event);
    });

    expect(result.current.form.email).toEqual("carlos@globo.com");
  });

  it("should submit form to create patient", async () => {
    const { result } = renderHook(() => {
      const formState = usePatientFormState();

      return usePatientFormUseCase({
        formState,
        createPatient: createPatientMock as never,
        updatePatient: updatePatientMock as never,
      });
    }, { wrapper });
    const mockPreventDefault = jest.fn();

    jest.spyOn(validations, "patientPersist").mockResolvedValue(true);

    const event = {
      preventDefault: mockPreventDefault,
    } as unknown as React.FormEvent<Element>;

    await act(async () => {
      await result.current.handleSubmit(event);
    });

    expect(mockPreventDefault).toHaveBeenCalled();
    expect(mockCreateMutateAsync).toHaveBeenCalled();
  });
});
