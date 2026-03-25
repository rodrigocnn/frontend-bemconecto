import { useQuery } from "@tanstack/react-query";

import { PatientShowApi } from "@/features/patients/api";
import { ApiResponse } from "@/shared/api/types";
import { Patient } from "@/entities/patient/types";
import { patientsQueryKeys } from "./queryKeys";

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
