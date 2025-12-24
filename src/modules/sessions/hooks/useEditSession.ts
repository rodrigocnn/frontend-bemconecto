import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { editSession } from "../api";
import { sessionsQueryKeys } from "../constants/sessions-query-keys";

export function useEditSession() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: editSession,
    onSuccess: (data) => {
      router.push(`/admin/pacientes/sessoes/${data.patientId}`);
      toast.success("Sessão atualizada com sucesso");
      queryClient.refetchQueries({
        queryKey: sessionsQueryKeys.findAllInfoPatients,
      });
    },
  });
}
