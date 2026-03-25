import { useQuery } from "@tanstack/react-query";

import { sessionsFindAll } from "../api";
import { Session } from "../interfaces";
import { sessionsQueryKeys } from "../constants/sessions-query-keys";
import { ApiResponse } from "@/modules/appointments/interfaces";

export function useFindAllSessions(patientId: string) {
  const { data, isLoading, error } = useQuery<ApiResponse<Session[]>>({
    queryKey: sessionsQueryKeys.findAllInfoPatients,
    queryFn: () => sessionsFindAll(patientId),
    enabled: !!patientId,
  });

  return {
    isLoading,
    data: data?.data ?? [],
    error,
  };
}
