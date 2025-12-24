import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AppointmentCreate } from "../api";
import { Dispatch, SetStateAction } from "react";
import { appointmentKeys } from "../constants/queryKeys";

export function useAppointmentCreate(
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AppointmentCreate,
    onSuccess: () => {
      toast.success("Agendamento realizado com sucesso");
      queryClient.refetchQueries({
        queryKey: appointmentKeys.findAllAppointments,
      });
      setIsModalOpen(false);
    },
  });
}
