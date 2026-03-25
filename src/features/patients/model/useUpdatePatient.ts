import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { PatientUpdateApi } from "@/features/patients/api";
import { patientsQueryKeys } from "./queryKeys";

export function useUpdatePatient() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: PatientUpdateApi,
    onSuccess: () => {
      router.push("/admin/pacientes");
      toast.success("Paciente atualizado com sucesso");
      queryClient.refetchQueries({
        queryKey: patientsQueryKeys.findAllInfoPatients,
      });
    },
  });
}
