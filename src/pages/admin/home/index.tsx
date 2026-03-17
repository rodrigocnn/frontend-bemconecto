"use client";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

import { ImUserPlus } from "react-icons/im";
import { FaCalendarCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { ImCheckboxChecked } from "react-icons/im";

import { CardDashboard } from "@/components/admin/CardDashboard";
import { getChartData } from "@/modules/dashboard/charts";
import { useGetInfoDashboard } from "@/modules/dashboard/hooks/useGetInfoDashboard";
import LayoutAdmin from "@/components/admin/LayoutAdmin";

export default function Home() {
  const { data } = useGetInfoDashboard();

  const { chartData, chartCallServices } = getChartData(
    data?.chartNewPatients || [],
    data?.chartAppointments || []
  );

  return (
    <LayoutAdmin>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <CardDashboard
          title="Pacientes"
          value={data?.patients.total || 0}
          percent={data?.patients.totalCurrentMonth || 0}
          miniDescription="novos cadastros no mês atual"
          color="blue"
          link="/admin/contratos"
          footerDescription="Total de Pacientes"
          icon={<ImUserPlus fontSize={20} />}
        />

        <CardDashboard
          title="Agendamentos"
          value={data?.appointments.total || 0}
          percent={data?.appointments.totalCurrentMonth || 0}
          miniDescription="novos agendamentos no mês atual"
          color="blue"
          link="/admin/contratos"
          footerDescription="Total de Agendamentos"
          icon={<FaCalendarCheck fontSize={20} />}
        />

        <CardDashboard
          title="Atendimentos"
          value={data?.appointments.totalCompleted || 0}
          percent={data?.appointments.totalCompletedCurrentMonth || 0}
          miniDescription="atendimentos no mês atual"
          color="blue"
          link="/admin/contratos"
          footerDescription="Total de Atendimentos"
          icon={<ImCheckboxChecked fontSize={20} />}
        />
        <CardDashboard
          title="Não Compareceu"
          value={data?.appointments.totalCanceled || 0}
          percent={data?.appointments.totalCanceledCurrentMonth || 0}
          miniDescription="cancelamentos no mês atual"
          color="blue"
          link="/admin/contratos"
          footerDescription="Total de Não Comparecimentos"
          icon={<MdCancel fontSize={20} />}
        />
      </div>

      <div className="mt-5 hidden   lg:flex  lg:gap-3 ">
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
