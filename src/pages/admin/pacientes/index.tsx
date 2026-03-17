import Link from "next/link";

import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import { useState } from "react";
import { useFindAllPatients } from "@/modules/patients/hooks/useFindAllPatients";
import { columnsPatients } from "@/modules/patients/columns";

import { ButtonApp } from "@/components/admin/Button";
import LayoutAdmin from "@/components/admin/LayoutAdmin";

export default function Patients() {
  const { data: patients, isLoading } = useFindAllPatients();
  const emptyRowSelection = { type: "include" as const, ids: new Set() };

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 5,
    page: 0,
  });

  return (
    <LayoutAdmin>
      <h2 className="text-2xl font-semibold  mb-4">Pacientes</h2>

      <div className="bg-white p-4 rounded h-screen ">
        <Link href={"/admin/pacientes/cadastrar"}>
          <ButtonApp />
        </Link>

        <div className="overflow-x-auto">
          <DataGrid
            loading={isLoading}
            rows={patients}
            columns={columnsPatients}
            disableRowSelectionOnClick
            disableColumnSelector
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10]}
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            rowSelection={false}
            disableColumnSorting={true}
            disableMultipleRowSelection={true}
            sx={{
              "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
                outline: "none",
              },
              "& .MuiDataGrid-row.Mui-selected": {
                backgroundColor: "inherit",
              },
            }}
          />
        </div>
      </div>
    </LayoutAdmin>
  );
}
