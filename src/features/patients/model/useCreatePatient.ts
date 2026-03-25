import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { PatientCreate } from "@/features/patients/api";
import { patientsQueryKeys } from "./queryKeys";

export function useCreatePatient() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: PatientCreate,
    onSuccess: () => {
      router.push("/admin/pacientes");
      toast.success("Paciente criado com sucesso");
      queryClient.refetchQueries({
        queryKey: patientsQueryKeys.findAllInfoPatients,
      });
    },
  });
}
