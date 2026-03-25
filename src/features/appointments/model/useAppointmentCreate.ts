import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MutationFunction } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AppointmentCreate } from "@/features/appointments/api";
import { appointmentKeys } from "./queryKeys";
import type {
  AppointmentEvent,
  AppointmentStore,
} from "@/entities/appointment/types";

export function useAppointmentCreate() {
  const queryClient = useQueryClient();

  const mutationFn: MutationFunction<AppointmentEvent, AppointmentStore> = async (
    payload,
  ) => {
    const response = await AppointmentCreate(payload);
    return response.data;
  };

  return useMutation<AppointmentEvent, Error, AppointmentStore>({
    mutationFn,
    onSuccess: () => {
      toast.success("Agendamento realizado com sucesso");
      queryClient.refetchQueries({
        queryKey: appointmentKeys.findAllAppointments,
      });
    },
  });
}
