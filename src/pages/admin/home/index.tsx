"use client";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

import { ImUserPlus } from "react-icons/im";
import { FaCalendarCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { ImCheckboxChecked } from "react-icons/im";

import { CardDashboard } from "@/widgets/admin-dashboard-card";
import { getChartData } from "@/features/dashboard/lib/charts";
import { useGetInfoDashboard } from "@/features/dashboard/model/useGetInfoDashboard";
import LayoutAdmin from "@/widgets/admin-layout";

export default function Home() {
  const { data } = useGetInfoDashboard();

  // 🔥 centraliza aqui pra não repetir data?.data toda hora
  const dashboard = data?.data;

  const { chartData, chartCallServices } = getChartData(
    dashboard?.chartNewPatients || [],
    dashboard?.chartAppointments || [],
  );

  return (
    <LayoutAdmin>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <CardDashboard
          title="Pacientes"
          value={dashboard?.patients?.total || 0}
          percent={dashboard?.patients?.totalCurrentMonth || 0}
          miniDescription="novos cadastros no mês atual"
          color="blue"
          link="/admin/contratos"
          footerDescription="Total de Pacientes"
          icon={<ImUserPlus fontSize={20} />}
        />

        <CardDashboard
          title="Agendamentos"
          value={dashboard?.appointments?.total || 0}
          percent={dashboard?.appointments?.totalCurrentMonth || 0}
          miniDescription="novos agendamentos no mês atual"
          color="blue"
          link="/admin/contratos"
          footerDescription="Total de Agendamentos"
          icon={<FaCalendarCheck fontSize={20} />}
        />

        <CardDashboard
          title="Atendimentos"
          value={dashboard?.appointments?.totalCompleted || 0}
          percent={dashboard?.appointments?.totalCompletedCurrentMonth || 0}
          miniDescription="atendimentos no mês atual"
          color="blue"
          link="/admin/contratos"
          footerDescription="Total de Atendimentos"
          icon={<ImCheckboxChecked fontSize={20} />}
        />

        <CardDashboard
          title="Não Compareceu"
          value={dashboard?.appointments?.totalCanceled || 0}
          percent={dashboard?.appointments?.totalCanceledCurrentMonth || 0}
          miniDescription="cancelamentos no mês atual"
          color="blue"
          link="/admin/contratos"
          footerDescription="Total de Não Comparecimentos"
          icon={<MdCancel fontSize={20} />}
        />
      </div>

      <div className="mt-5 hidden lg:flex lg:gap-3">
        <div className="w-1/2 bg-white">
          <h2 className="m-3 font-semibold">Novos Pacientes por mês</h2>
          <ReactApexChart options={chartData} series={chartData.series} />
        </div>

        <div className="w-1/2 bg-white">
          <h2 className="m-3 font-semibold">Atendimentos no mês</h2>
          <ReactApexChart
            options={chartCallServices}
            type="bar"
            series={chartCallServices.series}
          />
        </div>
      </div>
    </LayoutAdmin>
  );
}
