import * as yup from "yup";

import { toast } from "react-toastify";
import { AppointmentForm } from "../interfaces";

export const AppointmentSchema = yup.object().shape({
  endTime: yup.string().required("Horário Final é obrigatório"),
  initialTime: yup.string().required("Horário Inicial é obrigatório"),
  date: yup.string().required("Data é obrigatório"),
  patientId: yup.string().required("Paciente é obrigatório"),
});

export const appointmentValidation = async (form: AppointmentForm) => {
  try {
    await AppointmentSchema.validate(form);
    return true;
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      error.errors.forEach((errMsg) => {
        toast.error(errMsg);
      });
    } else {
      toast.error("Erro inesperado na validação.");
    }
    return false;
  }
};
