import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MutationFunction } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AppointmentUpdate } from "@/features/appointments/api";
import { appointmentKeys } from "./queryKeys";
import type {
  AppointmentEvent,
  AppointmentStore,
} from "@/entities/appointment/types";

export function useAppointmentUpdate() {
  const queryClient = useQueryClient();

  const mutationFn: MutationFunction<AppointmentEvent, AppointmentStore> = async (
    payload,
  ) => {
    const response = await AppointmentUpdate(payload);
    return response.data;
  };

  return useMutation<AppointmentEvent, Error, AppointmentStore>({
    mutationFn,
    onSuccess: () => {
      toast.success("Agendamento atualizado com sucesso");
      queryClient.refetchQueries({
        queryKey: appointmentKeys.findAllAppointments,
      });
    },
  });
}
