import type { AppointmentForm } from "../interfaces";

import { useFindAllAppointments } from "./useFindAllAppointments";
import { useAppointmentFormState } from "./useAppointmentFormState";
import { useAppointmentModalState } from "./useAppointmentModalState";
import { usePersistAppointment } from "./usePersistAppointment";

export function useAppointmentController() {
  const { data } = useFindAllAppointments();
  const formState = useAppointmentFormState();
  const modalState = useAppointmentModalState();
  const persist = usePersistAppointment({
    onSuccess: () => {
      modalState.closeModal();
      formState.resetForm();
    },
  });

  const eventFilter = (id: string) => {
    return data?.find((event) => event.id === id);
  };

  const handleEventClick = (arg: { event: { id: string } }) => {
    modalState.setIsModeUpdate(true);
    const selectedEvent = eventFilter(arg.event.id);
    if (selectedEvent) {
      formState.updateFormFromEvent(selectedEvent);
      modalState.openModal();
    }
  };

  const closeModal = () => {
    modalState.closeModal();
    formState.resetForm();
  };

  const bookAppointment = async (dataForm: AppointmentForm) => {
    if (modalState.isModeUpdate) {
      const idAppointment = formState.form.getValues("id");
      await persist.updateAppointment({ ...dataForm, id: idAppointment });
      return;
    }

    await persist.createAppointment(dataForm);
  };

  return {
    data,
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
