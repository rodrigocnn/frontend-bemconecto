import { useQuery } from "@tanstack/react-query";

import { findAllAppointments } from "@/features/appointments/api";
import { ApiResponse } from "@/shared/api/types";
import { AppointmentEvent } from "@/entities/appointment/types";

import { appointmentKeys } from "./queryKeys";

export function useFindAllAppointments() {
  const { data, isLoading, error } = useQuery<
    ApiResponse<AppointmentEvent[]>
  >({
    queryKey: appointmentKeys.findAllAppointments,
    queryFn: findAllAppointments,
  });

  return {
    isLoading,
    data: data?.data ?? [],
    error,
  };
}
