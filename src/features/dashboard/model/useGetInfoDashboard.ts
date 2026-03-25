import { useQuery } from "@tanstack/react-query";

import { findAllInfoDashboard } from "../api";
import { DashboardData } from "./types";
import { dashboardKeys } from "./queryKeys";
import { ApiResponse } from "@/shared/api/types";

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
