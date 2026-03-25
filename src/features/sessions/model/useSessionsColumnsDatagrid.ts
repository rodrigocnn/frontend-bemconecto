import { useRouter } from "next/router";
import { useState } from "react";
import { useDeleteSession } from "./useDeleteSession";

export function useSessionsColumnsDataGrid() {
  const router = useRouter();
  const deleteSession = useDeleteSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSessionClick = (row: any) => {
    router.push(`/admin/pacientes/sessoes/${row.id}`);
  };

  const handleEditClick = (row: any) => {
    router.push(`/admin/pacientes/sessoes/editar/${row.id}`);
  };

  const handleDeleteClick = (row: any) => {
    deleteSession.mutate(row.id);
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
