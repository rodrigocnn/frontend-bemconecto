import { useFindSession } from "./useFindSession";
import { usePersistSession } from "./usePersistSession";
import { useSessionFormState } from "./useSessionFormState";

export function useSessionFormController(id: string, mode: string) {
  const shouldFetch = mode === "edit";
  const findOne = useFindSession(shouldFetch ? id : "");
  const formState = useSessionFormState({
    initialData: shouldFetch ? findOne.data : undefined,
  });
  const { saveSession } = usePersistSession({ mode, patientId: id });

  const handleSave = () => saveSession(formState.form);

  return {
    ...formState,
    saveSession: handleSave,
  };
}
