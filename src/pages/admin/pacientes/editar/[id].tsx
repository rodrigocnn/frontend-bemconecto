import { useRouter } from "next/router";

import LayoutAdmin from "@/widgets/admin-layout";
import { FormPatient } from "@/features/patients/ui/FormPatient";
import { usePatientShowQuery } from "@/features/patients/model/usePatientShowQuery";
import { Patient } from "@/entities/patient/types";

export default function PatientEdit() {
  const router = useRouter();
  const { patient, isLoading } = usePatientShowQuery(router.query.id as string);

  return (
    <LayoutAdmin>
      <h2 className="text-2xl font-semibold  mb-4">Editar Paciente</h2>
      <FormPatient edit={true} initialData={patient as Patient} />
    </LayoutAdmin>
  );
}
