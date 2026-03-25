import LayoutAdmin from "@/widgets/admin-layout";
import { FormPatient } from "@/features/patients/ui/FormPatient";

export default function PatientCreate() {
  return (
    <LayoutAdmin>
      <h2 className="text-2xl font-semibold  mb-4">Cadastro de Paciente</h2>
      <FormPatient />
    </LayoutAdmin>
  );
}
