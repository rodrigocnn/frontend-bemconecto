import { useCallback } from "react";

import { AppointmentForm } from "./types";
import {
  persistMapperAppointment,
  persistUpdateMapperAppointment,
} from "../lib/mappers";
import { appointmentValidation } from "../lib/validation";
import { useAppointmentCreate } from "./useAppointmentCreate";
import { useAppointmentUpdate } from "./useAppointmentUpdate";

type UsePersistAppointmentParams = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

export function usePersistAppointment(
  params: UsePersistAppointmentParams = {},
) {
  const { onSuccess, onError } = params;
  const appointmentCreate = useAppointmentCreate();
  const appointmentUpdate = useAppointmentUpdate();

  const createAppointment = useCallback(
    async (data: AppointmentForm) => {
      try {
        if (!(await appointmentValidation(data))) return;

        const payload = persistMapperAppointment(data);
        await appointmentCreate.mutateAsync(payload);
        onSuccess?.();
      } catch (error) {
        onError?.(error);
      }
    },
    [appointmentCreate, onError, onSuccess],
  );

  const updateAppointment = useCallback(
    async (data: AppointmentForm) => {
      try {
        if (!(await appointmentValidation(data))) return;
        const payload = persistUpdateMapperAppointment(data);
        await appointmentUpdate.mutateAsync(payload);
        onSuccess?.();
      } catch (error) {
        onError?.(error);
      }
    },
    [appointmentUpdate, onError, onSuccess],
  );

  return {
    createAppointment,
    updateAppointment,
    createMutation: appointmentCreate,
    updateMutation: appointmentUpdate,
  };
}
