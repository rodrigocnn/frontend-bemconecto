import type { FormEvent } from "react";
import { useCallback } from "react";

import { usePatientFormState } from "../form/usePatientFormState";
import { patientPersist } from "../../lib/validation";
import { persistMapperPatient } from "../../lib/mappers";
import type { useCreatePatient } from "../create/useCreatePatient";
import type { useUpdatePatient } from "../update/useUpdatePatient";

type PatientFormState = ReturnType<typeof usePatientFormState>;
type CreatePatientMutation = ReturnType<typeof useCreatePatient>;
type UpdatePatientMutation = ReturnType<typeof useUpdatePatient>;

type UsePatientFormUseCaseProps = {
  formState: PatientFormState;
  createPatient: CreatePatientMutation;
  updatePatient: UpdatePatientMutation;
  edit?: boolean;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

export const usePatientFormUseCase = ({
  formState,
  createPatient,
  updatePatient,
  edit = false,
  onSuccess,
  onError,
}: UsePatientFormUseCaseProps) => {
  const persistPatient = useCallback(async () => {
    try {
      if (!(await patientPersist(formState.form))) return;

      const formMapped = persistMapperPatient(formState.form);

      if (edit) {
        await updatePatient.mutateAsync(formMapped);
      } else {
        await createPatient.mutateAsync(formMapped);
      }

      onSuccess?.();
    } catch (error) {
      onError?.(error);
    }
  }, [createPatient, edit, formState.form, onError, onSuccess, updatePatient]);

  const handleSubmit = async (event?: FormEvent) => {
    if (event) event.preventDefault();
    await persistPatient();
  };

  return {
    ...formState,
    handleSubmit,
    createPatient,
    updatePatient,
  };
};
