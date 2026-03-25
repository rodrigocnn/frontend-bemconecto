import { useQuery } from "@tanstack/react-query";

import { sessionsFindAll } from "@/features/sessions/api";
import { Session } from "@/entities/session/types";
import { sessionsQueryKeys } from "./queryKeys";
import { ApiResponse } from "@/shared/api/types";

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
