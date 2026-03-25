import { useQuery } from "@tanstack/react-query";

import { sessionFindPatientSummary } from "@/features/sessions/api";
import { PatientSummary } from "@/entities/session/types";
import { sessionsQueryKeys } from "./queryKeys";
import { ApiResponse } from "@/shared/api/types";

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
