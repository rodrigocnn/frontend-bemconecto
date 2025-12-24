import { useQuery } from "@tanstack/react-query";

import { findAllAppointments } from "../api";
import { AppointmentEvent } from "../interfaces";

import { appointmentKeys } from "../constants/queryKeys";

export function useFindAllAppoitments() {
  const { data, isLoading, error } = useQuery<AppointmentEvent[]>({
    queryKey: appointmentKeys.findAllAppointments,
    queryFn: findAllAppointments,
  });

  return {
    isLoading,
    data,
    error,
  };
}
