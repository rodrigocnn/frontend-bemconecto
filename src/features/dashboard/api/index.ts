import api from "@/shared/api/client";
import { DashboardData } from "../model/types";
import { ApiResponse } from "@/shared/api/types";

export const findAllInfoDashboard = async (): Promise<
  ApiResponse<DashboardData>
> => {
  const response = await api.index("api/dashboard");
  return response.data;
};
