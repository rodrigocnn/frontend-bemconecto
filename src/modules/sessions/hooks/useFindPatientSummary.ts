import { useQuery } from "@tanstack/react-query";

import { sessionFindPatientSummary } from "../api";
import { PatientSummary } from "../interfaces";
import { sessionsQueryKeys } from "../constants/sessions-query-keys";
import { ApiResponse } from "@/modules/appointments/interfaces";

export function useFindPatientSummary(id: string) {
  const { data, isLoading, error } = useQuery<ApiResponse<PatientSummary>>({
    queryKey: sessionsQueryKeys.showSession(id),
    queryFn: () => sessionFindPatientSummary(id),
    enabled: !!id,
  });

  return {
    isLoading,
    data,
    error,
  };
}
