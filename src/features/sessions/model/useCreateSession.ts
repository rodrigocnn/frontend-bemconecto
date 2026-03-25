import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { createSession } from "@/features/sessions/api";
import { sessionsQueryKeys } from "./queryKeys";

export function useCreateSession() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createSession,
    onSuccess: (data) => {
      router.push(`/admin/pacientes/sessoes/${data.data.patientId}`);
      toast.success("Sessão finalizada com sucesso");
      queryClient.refetchQueries({
        queryKey: sessionsQueryKeys.findAllInfoPatients,
      });
    },
  });
}
