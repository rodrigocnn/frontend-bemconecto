import React, { useEffect, useState } from "react";

import { Patient } from "@/entities/patient/types";
import { INITIAL_STATE_FORM_CLIENT } from "./constants";
import { formatCPF, formatPhone } from "@/shared/lib/formatters";

export type UsePatientFormStateParams = {
  initialData?: Patient;
};

export function usePatientFormState(params: UsePatientFormStateParams = {}) {
  const { initialData } = params;
  const [form, setForm] = useState<Patient>(() => ({
    ...INITIAL_STATE_FORM_CLIENT,
    ...(initialData ?? {}),
  }));

  useEffect(() => {
    if (initialData) {
      setForm({
        ...INITIAL_STATE_FORM_CLIENT,
        ...initialData,
      });
    }
  }, [initialData]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleChangeCPF = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const formattedValue = formatCPF(value);

    setForm((prevForm) => ({
      ...prevForm,
      [name]: formattedValue,
    }));
  };

  const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const formattedValue = formatPhone(value);

    setForm((prevForm) => ({
      ...prevForm,
      [name]: formattedValue,
    }));
  };

  const handleLocationChange = (latitude: number, longitude: number) => {
    setForm((prevForm) => ({
      ...prevForm,
      location: { latitude, longitude },
    }));
  };

  const resetForm = () => {
    setForm(INITIAL_STATE_FORM_CLIENT);
  };

  return {
    form,
    setForm,
    handleChange,
    handleChangeCPF,
    handleChangePhone,
    handleLocationChange,
    resetForm,
  };
}
