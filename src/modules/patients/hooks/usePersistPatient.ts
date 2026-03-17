import React, { useCallback } from "react";

import { Patient } from "../interfaces";
import { patientPersist } from "../validations";
import { persistMapperPatient } from "../mappers";
import { useCreatePatient } from "./useCreatePatient";
import { useUpdatePatient } from "./useUpdatePatient";

export type UsePersistPatientParams = {
  edit?: boolean;
  onError?: (error: unknown) => void;
};

export function usePersistPatient(
  params: UsePersistPatientParams = {},
) {
  const { edit = false, onError } = params;
  const createPatient = useCreatePatient();
  const updatePatient = useUpdatePatient();

  const handleSubmit = useCallback(
    async (form: Patient, event?: React.FormEvent) => {
      if (event) event.preventDefault();

      try {
        if (await patientPersist(form)) {
          const formMapped = persistMapperPatient(form);
          if (edit) {
            updatePatient.mutate(formMapped);
          } else {
            createPatient.mutate(formMapped);
          }
        }
      } catch (error) {
        onError?.(error);
      }
    },
    [createPatient, edit, onError, updatePatient],
  );

  return {
    handleSubmit,
    createPatient,
    updatePatient,
  };
}
