import { useQuery } from "@tanstack/react-query";

import { patientsFindAll } from "../api";
import { ApiResponse, Patient } from "../interfaces";
import { patientsQueryKeys } from "../constants/patients-query-keys";

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
