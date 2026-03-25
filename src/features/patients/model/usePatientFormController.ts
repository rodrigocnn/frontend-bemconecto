import type { FormEvent } from "react";

import { Patient } from "@/entities/patient/types";
import { usePatientFormState } from "./usePatientFormState";
import { usePersistPatient } from "./usePersistPatient";

export const usePatientFormController = (
  initialData?: Patient,
  edit: boolean = false,
) => {
  const formState = usePatientFormState({ initialData });
  const { createPatient, handleSubmit: persistHandleSubmit } =
    usePersistPatient({ edit });

  const handleSubmit = (event?: FormEvent) =>
    persistHandleSubmit(formState.form, event);

  return {
    ...formState,
    handleSubmit,
    createPatient,
  };
};
