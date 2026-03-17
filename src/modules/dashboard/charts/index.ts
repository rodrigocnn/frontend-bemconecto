import { ApexOptions } from "apexcharts";

export function createChartOptions(data: number[]): ApexOptions {
  return {
    series: [
      {
        name: "Cadastros",
        data: data,
      },
    ],
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: [
      "#01d8da",
      "#546E7A",
      "#d4526e",
      "#13d8aa",
      "#A5978B",
      "#2b908f",
      "#f9a3a4",
      "#90ee7e",
      "#f48024",
      "#69d2e7",
    ],
    xaxis: {
      categories: [
        "Clientes ",
        "Proprietários",
        "Imóveis",
        "Contratos",
        "Cidades",
        "Bairros",
      ],
    },
  };
}

export function rentalReceived(data: number[]): ApexOptions {
  return {
    chart: {
      zoom: {
        enabled: false,
      },

      toolbar: {
        show: false,
      },

      foreColor: "#008FFB",
      type: "line",
    },
    stroke: {
      show: false,
      width: 0,
    },
    xaxis: {
      categories: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ],
    },
    fill: {
      type: "solid",
    },
    legend: {
      width: 400,
    },
    series: [
      {
        name: "Recebimento de Alugueis",
        type: "column",
        data: data,
      },
    ],
  };
}

export function getChartData(
  pacientes: number[],
  atendimentos: number[],
): { chartData: ApexOptions; chartCallServices: ApexOptions } {
  const chartData: ApexOptions = {
    chart: {
      zoom: { enabled: false },
      toolbar: { show: false },
      foreColor: "#008FFB",
      type: "line",
    },
    stroke: { show: false, width: 0 },
    xaxis: {
      categories: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ],
    },
    fill: { type: "solid" },
    legend: { width: 400 },
    series: [
      {
        name: "Novos Clientes",
        type: "column",
        data: pacientes,
      },
    ],
  };

  const chartCallServices: ApexOptions = {
    series: [
      {
        name: "Atendimentos ",
        data: atendimentos,
      },
    ],
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: { borderRadius: 0, horizontal: true },
    },
    dataLabels: { enabled: false },
    colors: [
      "#01d8da",
      "#546E7A",
      "#d4526e",
      "#13d8aa",
      "#A5978B",
      "#2b908f",
      "#f9a3a4",
      "#90ee7e",
      "#f48024",
      "#69d2e7",
    ],
    xaxis: {
      categories: [
        "Agendado",
        "Confirmado",
        "Reagendado",
        "Atendido",
        "Cancelado",
      ],
    },
  };

  return { chartData, chartCallServices };
}
