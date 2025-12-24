import { useEffect, useState } from "react";
import { useCreateSession } from "./useCreateSession";
import { FormSession } from "../interfaces";
import { persistMapperSession, updateMapperSession } from "../mappers";
import { INITIALSTATESESSION } from "../constants";
import { sessionValidation } from "../validations";
import { useEditSession } from "./useEditSession";
import { useFindSession } from "./useFindSession";

export function useFormSession(id: string, mode: string) {
  const [form, setForm] = useState<FormSession>(INITIALSTATESESSION);
  const sessionCreate = useCreateSession();
  const sessionUpdate = useEditSession();
  const findOne = useFindSession(id);

  useEffect(() => {
    if (findOne && mode === "edit") {
      setForm(findOne.data || INITIALSTATESESSION);
    }
  }, [findOne.data]);

  const onEditorChange = (value: string, field: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    field: keyof typeof form
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const saveSession = async () => {
    if (mode === "create") {
      if (await sessionValidation(form)) {
        const payload = persistMapperSession(form, id);
        sessionCreate.mutate(payload);
      }
    } else {
      if (await sessionValidation(form)) {
        const payload = updateMapperSession(form);
        sessionUpdate.mutate(payload);
      }
    }
  };

  return {
    form,
    setForm,
    onEditorChange,
    handleChange,
    saveSession,
  };
}
