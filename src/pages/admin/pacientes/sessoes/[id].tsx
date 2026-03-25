import { useRouter } from "next/router";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { useState } from "react";
import Link from "next/link";

import LayoutAdmin from "@/widgets/admin-layout";
import { useFindAllSessions } from "@/features/sessions/model/useFindAllSessions";
import { columnsSessions } from "@/features/sessions/ui/columns";
import { ButtonApp } from "@/shared/ui/button";
import { PatientSummaryLine } from "@/features/patients/ui/PatientSummaryLine";
import { useFindPatientSummary } from "@/features/sessions/model/useFindPatientSummary";
import { formatDateBR } from "@/shared/lib/date";

export default function Pacientes() {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 5,
    page: 0,
  });

  const router = useRouter();
  const patientId = router.query.id as string;
  const { data: sessions, isLoading } = useFindAllSessions(patientId);
  const { data: patientSummary } = useFindPatientSummary(patientId);

  return (
    <LayoutAdmin>
      <h2 className="text-2xl font-semibold  mb-4">Sessões</h2>

      <div className="bg-white p-4 rounded h-screen ">
        <Link href={`/admin/pacientes/sessoes/criar/${patientId}`}>
          <ButtonApp> Iniciar Atendimento</ButtonApp>
        </Link>

        <PatientSummaryLine
          name={patientSummary?.data.name || "-"}
          age={patientSummary?.data.age || 0}
          totalAppointments={patientSummary?.data.qtdServices || 0}
          firstDate={formatDateBR(patientSummary?.data.initialDate)}
          lastDate="10/10/2025"
        />

        <div className="overflow-x-auto">
          <DataGrid
            loading={isLoading}
            rows={sessions || []}
            columns={columnsSessions}
            checkboxSelection
            disableRowSelectionOnClick
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </div>
    </LayoutAdmin>
  );
}
