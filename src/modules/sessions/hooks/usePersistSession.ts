import { useCallback } from "react";

import { FormSession } from "../interfaces";
import { persistMapperSession, updateMapperSession } from "../mappers";
import { sessionValidation } from "../validations";
import { useCreateSession } from "./useCreateSession";
import { useEditSession } from "./useEditSession";

type UsePersistSessionParams = {
  mode?: string;
  patientId?: string;
  onError?: (error: unknown) => void;
};

export function usePersistSession(params: UsePersistSessionParams = {}) {
  const { mode = "create", patientId, onError } = params;
  const createSession = useCreateSession();
  const editSession = useEditSession();

  const saveSession = useCallback(
    async (form: FormSession) => {
      try {
        if (!(await sessionValidation(form))) return;

        if (mode === "create") {
          const payload = persistMapperSession(form, patientId ?? "");
          createSession.mutate(payload);
          return;
        }

        const payload = updateMapperSession(form);
        editSession.mutate(payload);
      } catch (error) {
        onError?.(error);
      }
    },
    [createSession, editSession, mode, onError, patientId],
  );

  return {
    saveSession,
    createSession,
    editSession,
  };
}
