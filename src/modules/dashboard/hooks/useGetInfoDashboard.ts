import { useQuery } from "@tanstack/react-query";

import { findAllInfoDashboard } from "../api";
import { DashboardData } from "../interfaces";
import { dashboardKeys } from "../constants/queryKeys";
import { ApiResponse } from "@/modules/appointments/interfaces";

export function useGetInfoDashboard() {
  const { data, isLoading, error } = useQuery<ApiResponse<DashboardData>>({
    queryKey: dashboardKeys.findAllInfoDashboard,
    queryFn: () => findAllInfoDashboard(),
  });

  return {
    isLoading,
    data,
    error,
  };
}
