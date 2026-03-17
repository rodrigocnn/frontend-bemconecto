import { useState } from "react";

export function useAppointmentModalState() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModeUpdate, setIsModeUpdate] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsModeUpdate(false);
  };

  return {
    isModalOpen,
    isModeUpdate,
    openModal,
    closeModal,
    setIsModeUpdate,
  };
}
