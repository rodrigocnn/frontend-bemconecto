import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { CellsPatientsCustom } from "../component/cells-patients-custom";
import { Patient } from "../interfaces";

export const columnsPatients: GridColDef<Patient>[] = [
  { field: "name", headerName: "Nome", flex: 1, minWidth: 150 },
  { field: "email", headerName: "E-mail", flex: 1, minWidth: 150 },
  {
    field: "birthDate",
    headerName: "Data de Nascimento",
    flex: 1,
    minWidth: 150,
    valueFormatter: (value: string | null) => {
      if (!value) return "";
      const datePart = String(value).split("T")[0];
      const [year, month, day] = datePart.split("-");
      if (!year || !month || !day) return String(value);
      return `${day}/${month}/${year}`;
    },
  },
  {
    field: "acoes",
    headerName: "Ações",
    flex: 1,
    minWidth: 220,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams) => {
      return <CellsPatientsCustom params={params} />;
    },
  },
];
