export const patientsQueryKeys = {
  findAllInfoPatients: ["find-all-patients"] as const,
  showPatient: (id: string) => ["query-patient-show", id] as const,
};
