import { Patient } from "@/entities/patient/types";

export function persistMapperPatient(input: Patient): Patient {
  let birthDateISO = "";

  if (input.birthDate) {
    const date = new Date(input.birthDate);
    birthDateISO = date.toISOString(); // garante "1980-04-21T00:00:00.000Z"
  }

  return {
    ...input,
    birthDate: birthDateISO,
  };
}
