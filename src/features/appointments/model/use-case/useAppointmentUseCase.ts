import type { AppointmentForm } from "../types";

import { useCallback } from "react";
import type { useAppointmentFormState } from "../form/useAppointmentFormState";
import type { useAppointmentModalState } from "../modal/useAppointmentModalState";
import type { useAppointmentCreate } from "../create/useAppointmentCreate";
import type { useAppointmentUpdate } from "../update/useAppointmentUpdate";
import {
  persistMapperAppointment,
  persistUpdateMapperAppointment,
} from "../../lib/mappers";
import { appointmentValidation } from "../../lib/validation";
import { AppointmentEvent } from "@/entities/appointment/types";

type AppointmentFormState = ReturnType<typeof useAppointmentFormState>;
type AppointmentModalState = ReturnType<typeof useAppointmentModalState>;
type AppointmentCreateMutation = ReturnType<typeof useAppointmentCreate>;
type AppointmentUpdateMutation = ReturnType<typeof useAppointmentUpdate>;

interface UseAppointmentControllerProps {
  appointments: AppointmentEvent[];
  formState: AppointmentFormState;
  modalState: AppointmentModalState;
  appointmentCreate: AppointmentCreateMutation;
  appointmentUpdate: AppointmentUpdateMutation;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export function useAppointmentUseCase({
  appointments,
  formState,
  modalState,
  appointmentCreate,
  appointmentUpdate,
  onSuccess,
  onError,
}: UseAppointmentControllerProps) {
  const eventFilter = (id: string) => {
    return appointments?.find((event) => event.id === id);
  };

  const handleEventClick = (arg: { event: { id: string } }) => {
    modalState.setIsModeUpdate(true);
    const selectedEvent = eventFilter(arg.event.id);
    if (selectedEvent) {
      formState.updateFormFromEvent(selectedEvent);
      modalState.openModal();
    }
  };

  const closeModal = useCallback(() => {
    modalState.closeModal();
    formState.resetForm();
  }, [formState, modalState]);

  const handleSuccess = useCallback(() => {
    closeModal();
    onSuccess?.();
  }, [closeModal, onSuccess]);

  const createAppointment = useCallback(
    async (dataForm: AppointmentForm) => {
      try {
        if (!(await appointmentValidation(dataForm))) return;

        const payload = persistMapperAppointment(dataForm);
        await appointmentCreate.mutateAsync(payload);
        handleSuccess();
      } catch (error) {
        onError?.(error);
      }
    },
    [appointmentCreate, handleSuccess, onError],
  );

  const updateAppointment = useCallback(
    async (dataForm: AppointmentForm) => {
      try {
        if (!(await appointmentValidation(dataForm))) return;

        const idAppointment = formState.form.getValues("id");
        const payload = persistUpdateMapperAppointment({
          ...dataForm,
          id: idAppointment,
        });
        await appointmentUpdate.mutateAsync(payload);
        handleSuccess();
      } catch (error) {
        onError?.(error);
      }
    },
    [appointmentUpdate, formState.form, handleSuccess, onError],
  );

  const bookAppointment = async (dataForm: AppointmentForm) => {
    if (modalState.isModeUpdate) {
      await updateAppointment(dataForm);
      return;
    }

    await createAppointment(dataForm);
  };

  return {
    handleEventClick,
    bookAppointment,
    resetFormModal: formState.resetForm,
    isModalOpen: modalState.isModalOpen,
    openModal: modalState.openModal,
    closeModal,
    isModeUpdate: modalState.isModeUpdate,
    form: formState.form,
  };
}
