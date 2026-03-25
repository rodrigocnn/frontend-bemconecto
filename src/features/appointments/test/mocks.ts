import {
  AppointmentEvent,
  AppointmentStore,
} from "@/entities/appointment/types";

export const mockAppointmentStore: AppointmentStore = {
  id: "appt-001",
  start: "2025-11-03T14:00:00.000Z",
  end: "2025-11-03T14:50:00.000Z",
  status: "COMPLETED",
  patientId: "patient-123",
};

export const mockAppointmentEvents: AppointmentEvent[] = [
  {
    id: "appt-001",
    start: "2025-11-03T13:00:00.000Z",
    end: "2025-11-03T14:00:00.000Z",
    status: "SCHEDULED",
    psychologistId: "psych-001",
    patientId: "patient-001",
    backgroundColor: "#E0BBE4",
    textColor: "#4B0082",
    display: "block",
    title: "Sessão com Maria Silva",
    createdAt: "2025-11-01T10:15:00.000Z",
    updatedAt: "2025-11-03T10:00:00.000Z",
    deletedAt: null,
  },
  {
    id: "appt-002",
    start: "2025-11-04T09:30:00.000Z",
    end: "2025-11-04T10:20:00.000Z",
    status: "COMPLETED",
    psychologistId: "psych-001",
    patientId: "patient-002",
    backgroundColor: "#C1E1C1",
    textColor: "#006400",
    display: "block",
    title: "Sessão com João Pereira",
    createdAt: "2025-11-01T11:00:00.000Z",
    updatedAt: "2025-11-04T10:25:00.000Z",
    deletedAt: null,
  },
];
