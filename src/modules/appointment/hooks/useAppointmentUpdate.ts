import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AppointmentUpdate } from "../api";
import { Dispatch, SetStateAction } from "react";
import { appointmentKeys } from "../constants/queryKeys";

export function useAppointmentUpdate(
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AppointmentUpdate,
    onSuccess: () => {
      toast.success("Agendamento atualizado com sucesso");
      queryClient.refetchQueries({
        queryKey: appointmentKeys.findAllAppointments,
      });
      setIsModalOpen(false);
    },
  });
}
