import api from "@/shared/api/client";
import { ApiResponse } from "@/shared/api/types";
import {
  AppointmentEvent,
  AppointmentStore,
} from "@/entities/appointment/types";

export const findAllAppointments = async (): Promise<
  ApiResponse<AppointmentEvent[]>
> => {
  const response = await api.index("api/appointments");
  return response.data;
};

export const AppointmentCreate = async (
  appointment: AppointmentStore,
): Promise<ApiResponse<AppointmentEvent>> => {
  const response = await api.store("api/appointments", appointment);
  return response.data;
};

export const AppointmentUpdate = async (
  appointment: AppointmentStore,
): Promise<ApiResponse<AppointmentEvent>> => {
  const response = await api.update(
    "api/appointments",
    appointment.id as string,
    appointment,
  );
  return response.data;
};
