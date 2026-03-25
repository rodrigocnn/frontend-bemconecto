import api from "@/shared/api/client";
import { ApiResponse } from "@/shared/api/types";
import { PatientSummary, Session } from "@/entities/session/types";

export const createSession = async (
  session: Session,
): Promise<ApiResponse<Session>> => {
  const response = await api.store("api/sessions", session);
  return response.data;
};

export const editSession = async (
  session: Session,
): Promise<ApiResponse<Session>> => {
  const response = await api.update(
    "api/sessions",
    session.id as string,
    session,
  );
  return response.data;
};

export const sessionsFindAll = async (
  id: string,
): Promise<ApiResponse<Session[]>> => {
  const response = await api.show("api/sessions", id);
  return response.data;
};

export const sessionFindOne = async (
  id: string,
): Promise<ApiResponse<Session>> => {
  const response = await api.show("api/sessions/show", id);
  return response.data;
};

export const sessionFindPatientSummary = async (
  id: string,
): Promise<ApiResponse<PatientSummary>> => {
  const response = await api.show("api/sessions/attend", id);
  return response.data;
};

export const sessionDelete = async (
  id: string,
): Promise<ApiResponse<Session>> => {
  const response = await api.delete("api/sessions", id);
  return response.data;
};
