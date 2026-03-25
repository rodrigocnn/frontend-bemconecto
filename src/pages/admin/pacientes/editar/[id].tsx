import { useRouter } from "next/router";

import LayoutAdmin from "@/components/admin/LayoutAdmin";
import { FormPatient } from "@/modules/patients/component/form";
import { usePatientShowQuery } from "@/modules/patients/hooks/usePatientShowQuery";
import { Patient } from "@/modules/patients/interfaces";

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
