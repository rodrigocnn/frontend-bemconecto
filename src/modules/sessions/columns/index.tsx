import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { CellsSessionsCustom } from "../components/cells-sessions-custom";

export const columnsSessions: GridColDef[] = [
  {
    field: "sessionDate",
    headerName: "Data",
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
  { field: "summary", headerName: "Resumo", flex: 1, minWidth: 150 },
  {
    field: "acoes",
    headerName: "Ações",
    flex: 1,
    minWidth: 220,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams) => {
      return <CellsSessionsCustom params={params} />;
    },
  },
];
