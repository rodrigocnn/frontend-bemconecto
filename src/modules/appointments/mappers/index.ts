import {
  AppointmentStore,
  AppointmentForm,
  AppointmentStatus,
} from "../interfaces";

function buildDateTime(date: string, time: string): string {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);
  const localDate = new Date(year, month - 1, day, hours, minutes, 0);
  const offsetMinutes = -localDate.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const absOffset = Math.abs(offsetMinutes);
  const offsetHours = String(Math.floor(absOffset / 60)).padStart(2, "0");
  const offsetMins = String(absOffset % 60).padStart(2, "0");

  return `${date}T${time}:00${sign}${offsetHours}:${offsetMins}`;
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
    patientId: data.patientId || null,
  };
}
