import { useQuery } from "@tanstack/react-query";

import { sessionFindOne } from "../api";
import { Session } from "../interfaces";
import { sessionsQueryKeys } from "../constants/sessions-query-keys";

export function useFindSession(id: string) {
  const { data, isLoading, error } = useQuery<Session>({
    queryKey: sessionsQueryKeys.showSession(id),
    queryFn: () => sessionFindOne(id),
    enabled: !!id,
  });

  return {
    isLoading,
    data,
    error,
  };
}
