import LayoutAdmin from "@/components/admin/LayoutAdmin";
import { FormPatient } from "@/modules/patients/component/form";

export default function PatientCreate() {
  return (
    <LayoutAdmin>
      <h2 className="text-2xl font-semibold  mb-4">Cadastro de Paciente</h2>
      <FormPatient />
    </LayoutAdmin>
  );
}
