import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { PatientDelete } from "@/features/patients/api";
import { patientsQueryKeys } from "./queryKeys";

export function useDeletePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PatientDelete,
    onSuccess: () => {
      toast.success("Paciente excluído com sucesso");
      queryClient.refetchQueries({
        queryKey: patientsQueryKeys.findAllInfoPatients,
      });
    },
  });
}
