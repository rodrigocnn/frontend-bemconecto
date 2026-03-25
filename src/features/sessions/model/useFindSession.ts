import { useQuery } from "@tanstack/react-query";

import { sessionFindOne } from "@/features/sessions/api";
import { Session } from "@/entities/session/types";
import { sessionsQueryKeys } from "./queryKeys";
import { ApiResponse } from "@/shared/api/types";

export function useFindSession(id: string) {
  const { data, isLoading, error } = useQuery<ApiResponse<Session>>({
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
