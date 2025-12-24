import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { sessionDelete } from "../api";
import { sessionsQueryKeys } from "../constants/sessions-query-keys";

export function useDeleteSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sessionDelete,
    onSuccess: () => {
      toast.success("Sessão excluída com sucesso");
      queryClient.refetchQueries({
        queryKey: sessionsQueryKeys.findAllInfoPatients,
      });
    },
  });
}
