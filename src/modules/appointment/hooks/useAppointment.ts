import { useState } from "react";
import { useForm } from "react-hook-form";

import { useFindAllAppoitments } from "./useFindAllAppoitments";
import { AppointmentEvent, AppointmentForm } from "../interfaces";
import {
  persistMapperAppointment,
  persistUpdateMapperAppointment,
} from "../mappers";
import { useAppointmentCreate } from "./useAppointmentCreate";
import { getDateFromISO, getTimeFromISO } from "@/utils";
import { useAppointmentUpdate } from "./useAppointmentUpdate";
import { appointmentValidation } from "../validations";

export function useAppointment() {
  const form = useForm<AppointmentForm>();
  const { data } = useFindAllAppoitments();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModeUpdate, setIsModeUpdate] = useState(false);
  const appointmentCreate = useAppointmentCreate(setIsModalOpen);
  const appointmentUpdate = useAppointmentUpdate(setIsModalOpen);

  const handleEventClick = (arg: any) => {
    setIsModeUpdate(true);
    const selectedEvent = eventFilter(arg.event.id);
    if (selectedEvent) {
      updateFormModal(selectedEvent);
      openModal();
    }
  };

  const updateFormModal = (selectedEvent: AppointmentEvent) => {
    const { patientId, start, end, status, id } = selectedEvent;
    form.setValue("id", id);
    form.setValue("patientId", patientId);
    form.setValue("date", getDateFromISO(start));
    form.setValue("initialTime", getTimeFromISO(start));
    form.setValue("endTime", getTimeFromISO(end));
    form.setValue("status", status);
  };

  const resetFormModal = () => {
    form.resetField("patientId");
    form.resetField("date");
    form.resetField("initialTime");
    form.resetField("endTime");
    form.resetField("status");
  };

  const eventFilter = (id: string) => {
    return data?.find((event) => event.id === id);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsModeUpdate(false);
    resetFormModal();
  };

  const bookAppointment = async (data: AppointmentForm) => {
    if (isModeUpdate) {
      const idAppointment = form.getValues("id");
      const dataForm = { ...data };
      dataForm.id = idAppointment;
      const payload = persistUpdateMapperAppointment(dataForm);
      appointmentUpdate.mutate(payload);
    } else {
      if (await appointmentValidation(data)) {
        const payload = persistMapperAppointment(data);
        appointmentCreate.mutate(payload);
      }
    }
  };

  return {
    data,
    handleEventClick,
    bookAppointment,
    resetFormModal,
    isModalOpen,
    openModal,
    closeModal,
    isModeUpdate,
    form,
  };
}
