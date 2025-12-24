import { useQuery } from "@tanstack/react-query";

import { patientsFindAll } from "../api";
import { Patient } from "../interfaces";
import { patientsQueryKeys } from "../constants/patients-query-keys";

export function useFindAllPatients() {
  const { data, isLoading, error } = useQuery<Patient[]>({
    queryKey: patientsQueryKeys.findAllInfoPatients,
    queryFn: patientsFindAll,
  });

  return {
    isLoading,
    data,
    error,
  };
}
