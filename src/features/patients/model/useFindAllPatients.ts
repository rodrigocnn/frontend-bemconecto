import { useQuery } from "@tanstack/react-query";

import { patientsFindAll } from "@/features/patients/api";
import { ApiResponse } from "@/shared/api/types";
import { Patient } from "@/entities/patient/types";
import { patientsQueryKeys } from "./queryKeys";

export function useFindAllPatients() {
  const { data, isLoading, error } = useQuery<ApiResponse<Patient[]>>({
    queryKey: patientsQueryKeys.findAllInfoPatients,
    queryFn: patientsFindAll,
  });

  return {
    isLoading,
    data: data?.data ?? [],
    error,
  };
}
