import api from "@/services/api";
import { ApiResponse, Patient } from "../interfaces";

export const patientsFindAll = async (): Promise<ApiResponse<Patient[]>> => {
  const response = await api.index("api/patients");
  return response.data;
};

export const PatientCreate = async (Patient: Patient): Promise<Patient> => {
  const response = await api.store("api/patients", Patient);
  return response.data;
};

export const PatientDelete = async (id: string): Promise<Patient> => {
  const response = await api.delete("api/patients", id);
  return response.data;
};

export const PatientShowApi = async (
  id: string,
): Promise<ApiResponse<Patient>> => {
  const response = await api.show("api/patients", id);
  return response.data;
};

export const PatientUpdateApi = async (Patient: Patient): Promise<Patient> => {
  const response = await api.update(
    "api/patients",
    Patient?.id as string,
    Patient,
  );
  return response.data;
};
