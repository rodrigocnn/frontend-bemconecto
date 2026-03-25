import { PatientCreate } from "@/features/patients/api";
import { Patient } from "@/entities/patient/types";

export const INITIAL_STATE_FORM_CLIENT = {
  name: "",
  email: "",
  cpf: "",
  phone: "",
  birthDate: "",
  notes: "",
};

export const patientCreateApi = {
  queryKey: "get-clients",
  onSuccessMsg: "Cliente cadastrado com sucesso",
  mutationFn: (client: Patient) => PatientCreate(client),
  urlRedirect: "/admin/clientes",
};

export const richEditorPlugins = [
  "advlist autolink lists link charmap print preview anchor",
  "searchreplace visualblocks code fullscreen",
  "insertdatetime table paste code help wordcount",
];

export const richEditorToolbar =
  "undo redo | formatselect | bold italic underline strikethrough | \
       alignleft aligncenter alignright alignjustify | \
       bullist numlist outdent indent | link | code";

export const richEditorStyle =
  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }";
