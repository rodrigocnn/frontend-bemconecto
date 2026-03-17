import {
  AppointmentStore,
  AppointmentForm,
  AppointmentStatus,
} from "../interfaces";

function buildDateTime(date: string, time: string): string {
  return new Date(`${date}T${time}:00.000Z`).toISOString();
}

export function persistMapperAppointment(
  data: AppointmentForm,
): AppointmentStore {
  return {
    start: buildDateTime(data.date, data.initialTime),
    end: buildDateTime(data.date, data.endTime),
    patientId: data.patientId,
  };
}

export function persistUpdateMapperAppointment(
  data: AppointmentForm,
): AppointmentStore {
  data.date;

  return {
    id: data.id,
    start: buildDateTime(data.date, data.initialTime),
    end: buildDateTime(data.date, data.endTime),
    status: data.status as AppointmentStatus,
    patientId: data.patientId,
  };
}
