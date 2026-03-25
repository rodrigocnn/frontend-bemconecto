import { useQuery } from "@tanstack/react-query";
import type { QueryFunction } from "@tanstack/react-query";
import { findAllInfoDashboard } from "../api";
import { useEffect, useState } from "react";
import { createChartOptions, rentalReceived } from "../lib/charts";
import { ApexOptions } from "apexcharts";

type DashboardLegacyData = {
  total_clients: number;
  total_owners: number;
  total_properties: number;
  total_rental_contracts: number;
  total_cities: number;
  total_neighborhoods: number;
  monthly_received_rents: Array<{ amount: number }>;
};

export function useDashboard() {
  const queryFn: QueryFunction<DashboardLegacyData> = async () =>
    (await findAllInfoDashboard()) as unknown as DashboardLegacyData;

  const { data, isLoading } = useQuery<DashboardLegacyData>({
    queryKey: ["dashboard"],
    queryFn,
  });

  const [chartRegisters, setChartRegisters] = useState<
    ApexOptions | undefined
  >();

  const [chartRental, setChartRental] = useState<ApexOptions | undefined>();

  useEffect(() => {
    if (data) {
      const cadastros = [
        data?.total_clients,
        data?.total_owners,
        data?.total_properties,
        data?.total_rental_contracts,
        data?.total_cities,
        data?.total_neighborhoods,
      ];

      const options = createChartOptions(cadastros);
      setChartRegisters(options);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const received = data.monthly_received_rents.map((item) => item.amount);
      const options = rentalReceived(received);

      setChartRental(options);
    }
  }, [data]);

  return { data, isLoading, chartRegisters, chartRental };
}
