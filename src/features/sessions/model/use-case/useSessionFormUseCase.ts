import { useCallback } from "react";

import { persistMapperSession, updateMapperSession } from "../../lib/mappers";
import { sessionValidation } from "../../lib/validation";
import { useSessionFormState } from "../form/useSessionFormState";
import type { useCreateSession } from "../create/useCreateSession";
import type { useEditSession } from "../update/useEditSession";

type SessionFormState = ReturnType<typeof useSessionFormState>;
type CreateSessionMutation = ReturnType<typeof useCreateSession>;
type EditSessionMutation = ReturnType<typeof useEditSession>;
type SessionMode = "create" | "edit";

type UseSessionFormUseCaseProps = {
  formState: SessionFormState;
  createSession: CreateSessionMutation;
  editSession: EditSessionMutation;
  patientId: string;
  mode: SessionMode;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

export function useSessionFormUseCase({
  formState,
  createSession,
  editSession,
  patientId,
  mode,
  onSuccess,
  onError,
}: UseSessionFormUseCaseProps) {
  const saveSession = useCallback(async () => {
    try {
      if (!(await sessionValidation(formState.form))) return;

      if (mode === "create") {
        const payload = persistMapperSession(formState.form, patientId);
        await createSession.mutateAsync(payload);
        onSuccess?.();
        return;
      }

      const payload = updateMapperSession(formState.form);
      await editSession.mutateAsync(payload);
      onSuccess?.();
    } catch (error) {
      onError?.(error);
    }
  }, [
    createSession,
    editSession,
    formState.form,
    mode,
    onError,
    onSuccess,
    patientId,
  ]);

  return {
    ...formState,
    saveSession,
  };
}
