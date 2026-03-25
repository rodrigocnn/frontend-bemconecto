import api from "@/services/api";
import { DashboardData } from "../interfaces";
import { ApiResponse } from "@/modules/appointments/interfaces";

export const findAllInfoDashboard = async (): Promise<
  ApiResponse<DashboardData>
> => {
  const response = await api.index("api/dashboard");
  return response.data;
};
