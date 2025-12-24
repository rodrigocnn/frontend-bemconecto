import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { PatientDelete } from "../api";
import { patientsQueryKeys } from "../constants/patients-query-keys";

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
