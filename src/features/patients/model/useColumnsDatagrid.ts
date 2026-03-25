import { useRouter } from "next/router";
import { useDeletePatient } from "./useDeletePatient";
import { useState } from "react";

export function useColumnsDataGrid() {
  const router = useRouter();
  const deletePatient = useDeletePatient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSessionClick = (row: any) => {
    router.push(`/admin/pacientes/sessoes/${row.id}`);
  };

  const handleEditClick = (row: any) => {
    router.push(`/admin/pacientes/editar/${row.id}`);
  };

  const handleDeleteClick = (row: any) => {
    deletePatient.mutate(row.id);
    setIsModalOpen(false);
  };

  return {
    handleSessionClick,
    handleEditClick,
    handleDeleteClick,
    isModalOpen,
    setIsModalOpen,
  };
}
