import { useQuery } from "@tanstack/react-query";

import { sessionsFindAll } from "../api";
import { Session } from "../interfaces";
import { sessionsQueryKeys } from "../constants/sessions-query-keys";

export function useFindAllSessions(patientId: string) {
  const { data, isLoading, error } = useQuery<Session[]>({
    queryKey: sessionsQueryKeys.findAllInfoPatients,
    queryFn: () => sessionsFindAll(patientId),
    enabled: !!patientId,
  });

  return {
    isLoading,
    data,
    error,
  };
}
