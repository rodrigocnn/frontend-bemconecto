import { useForm } from "react-hook-form";

import { AppointmentEvent, AppointmentForm } from "../interfaces";
import { getDateFromISO, getTimeFromISO } from "@/utils";

export function useAppointmentFormState() {
  const form = useForm<AppointmentForm>();

  const updateFormFromEvent = (selectedEvent: AppointmentEvent) => {
    const { patientId, userId, start, end, status, id } = selectedEvent;
    form.setValue("id", id);
    form.setValue("patientId", patientId ?? userId ?? "");
    form.setValue("date", getDateFromISO(start));
    form.setValue("initialTime", getTimeFromISO(start));
    form.setValue("endTime", getTimeFromISO(end));
    form.setValue("status", status);
  };

  const resetForm = () => {
    form.resetField("patientId");
    form.resetField("date");
    form.resetField("initialTime");
    form.resetField("endTime");
    form.resetField("status");
  };

  return {
    form,
    updateFormFromEvent,
    resetForm,
  };
}
