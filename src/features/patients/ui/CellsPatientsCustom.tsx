import { GridRenderCellParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BsJournalMedical } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { BiTime } from "react-icons/bi";

import { useColumnsDataGrid } from "../model/useColumnsDatagrid";
import { CustomModal } from "@/shared/ui/modal";

interface IPropsCellCustomPatients {
  params: GridRenderCellParams;
}

export function CellsPatientsCustom(props: IPropsCellCustomPatients) {
  const {
    handleSessionClick,
    handleEditClick,
    handleDeleteClick,
    isModalOpen,
    setIsModalOpen,
  } = useColumnsDataGrid();
  const { params } = props;

  return (
    <div className="w-full h-full flex  justify-start space-x-2 px-1">
      <CustomModal
        primaryAction={{
          label: "Sim",
          onClick: () => handleDeleteClick(params.row),
        }}
        variant="danger"
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="flex flex-col  gap-4">
          <p className="text-lg font-medium">
            Deseja realmente excluir o registro selecionado?
          </p>
        </div>
      </CustomModal>

      <Button
        variant="text"
        color="inherit"
        startIcon={<BiTime />}
        onClick={() => handleSessionClick(params.row)}
      >
        Sessões
      </Button>

      <Button
        variant="text"
        color="inherit"
        startIcon={<FaEdit />}
        onClick={() => handleEditClick(params.row)}
        size="small"
      >
        Editar
      </Button>

      <Button
        variant="text"
        color="error"
        startIcon={<AiOutlineDelete />}
        onClick={() => setIsModalOpen(true)}
        size="small"
      >
        Excluir
      </Button>
    </div>
  );
}
