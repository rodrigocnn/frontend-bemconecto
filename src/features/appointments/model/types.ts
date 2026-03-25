import type { AppointmentStatus } from "@/entities/appointment/types";

export interface AppointmentForm {
  id?: string;
  patientId: string;
  date: string;
  initialTime: string;
  endTime: string;
  status?: AppointmentStatus;
}
