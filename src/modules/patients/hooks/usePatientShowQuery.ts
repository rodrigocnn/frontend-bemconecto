import { useQuery } from "@tanstack/react-query";

import { PatientShowApi } from "../api";
import { ApiResponse, Patient } from "../interfaces";
import { patientsQueryKeys } from "../constants/patients-query-keys";

export function usePatientShowQuery(id: string) {
  const { data, isLoading, error } = useQuery<ApiResponse<Patient>>({
    queryKey: patientsQueryKeys.showPatient(id),
    queryFn: () => PatientShowApi(id),
    enabled: !!id,
  });

  return {
    isLoading,
    patient: data?.data,
    error,
  };
}
