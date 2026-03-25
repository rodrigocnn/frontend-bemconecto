import { toast } from "react-toastify";
import * as yup from "yup";
import { FormSession } from "../model/types";

export const sessionSchema = yup.object().shape({
  summary: yup.string().required("Resumo de sessão é obrigatório"),
});

export const sessionValidation = async (form: FormSession) => {
  try {
    await sessionSchema.validate(form);
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
