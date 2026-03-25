import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

import { FormSession } from "./types";
import { INITIALSTATESESSION } from "./constants";

type UseSessionFormStateParams = {
  initialData?: FormSession;
};

export function useSessionFormState(
  params: UseSessionFormStateParams = {},
) {
  const { initialData } = params;
  const [form, setForm] = useState<FormSession>(() => ({
    ...INITIALSTATESESSION,
    ...(initialData ?? {}),
  }));

  useEffect(() => {
    if (initialData) {
      setForm({
        ...INITIALSTATESESSION,
        ...initialData,
      });
    }
  }, [initialData]);

  const onEditorChange = (value: string, field: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
    field: keyof FormSession,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const resetForm = () => {
    setForm(INITIALSTATESESSION);
  };

  return {
    form,
    setForm,
    onEditorChange,
    handleChange,
    resetForm,
  };
}
