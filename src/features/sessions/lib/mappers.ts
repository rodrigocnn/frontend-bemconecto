import { FormSession } from "../model/types";

export function persistMapperSession(
  form: FormSession,
  idPatient: string,
): FormSession {
  const payload = { ...form };
  payload.patientId = idPatient;
  payload.sessionDate = new Date().toISOString();
  return {
    ...payload,
  };
}

export function updateMapperSession(form: FormSession): FormSession {
  const payload = { ...form };

  return {
    ...payload,
  };
}
