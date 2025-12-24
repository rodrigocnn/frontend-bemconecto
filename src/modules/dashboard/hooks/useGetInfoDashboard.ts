import { useQuery } from "@tanstack/react-query";

import { findAllInfoDashboard } from "../api";
import { DashboardData } from "../interfaces";
import { dashboardKeys } from "../constants/queryKeys";

export function useGetInfoDashboard() {
  const { data, isLoading, error } = useQuery<DashboardData>({
    queryKey: dashboardKeys.findAllInfoDashboard,
    queryFn: () => findAllInfoDashboard(),
  });

  return {
    isLoading,
    data,
    error,
  };
}
