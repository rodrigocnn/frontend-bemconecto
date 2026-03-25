export interface DashboardData {
  patients: {
    total: number;
    totalCurrentMonth: number;
  };
  appointments: {
    total: number;
    totalCurrentMonth: number;
    totalCompleted: number;
    totalCompletedCurrentMonth: number;
    totalCanceled: number;
    totalCanceledCurrentMonth: number;
  };
  chartNewPatients: number[];
  chartAppointments: number[];
}
