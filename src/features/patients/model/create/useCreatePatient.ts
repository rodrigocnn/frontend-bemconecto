import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { PatientCreate } from "@/features/patients/api";

export function useCreatePatient() {
  const router = useRouter();

  return useMutation({
    mutationFn: PatientCreate,
    onSuccess: () => {
      router.push("/admin/pacientes");
      toast.success("Paciente criado com sucesso");
    },
  });
}
