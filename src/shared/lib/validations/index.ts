import * as Yup from "yup";
import { toast } from "react-toastify";

export const validation = async <T>(
  form: T,
  schema: Yup.Schema<T>
): Promise<boolean> => {
  try {
    await schema.validate(form);
    return true;
  } catch (error: any) {
    if (error instanceof Yup.ValidationError) {
      error.errors.forEach((errMsg) => {
        toast.error(errMsg);
      });
    } else {
      toast.error("Erro inesperado na validação.");
    }
    return false;
  }
};
