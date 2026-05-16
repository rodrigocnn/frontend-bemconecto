import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { createSession } from "@/features/sessions/api";

export function useCreateSession() {
  const router = useRouter();

  return useMutation({
    mutationFn: createSession,
    onSuccess: (data) => {
      router.push(`/admin/pacientes/sessoes/${data.data.patientId}`);
      toast.success("Sessão finalizada com sucesso");
      // queryClient.refetchQueries({
      //   queryKey: sessionsQueryKeys.findAllInfoPatients,
      // });

      // queryClient.invalidateQueries({
      //   queryKey: sessionsQueryKeys.findAllInfoPatients,
      // });
    },
  });
}
