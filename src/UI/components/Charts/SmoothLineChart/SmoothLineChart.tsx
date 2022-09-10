import { ApexOptions } from "apexcharts";
import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const chartSeriesData = {
  options: {
    chart: {
      height: 100,
      type: "area",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
      grid: {
        show: false,
        padding: {
          left: 0,
          right: 0,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2.5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.9,
        opacityFrom: 0.7,
        opacityTo: 0.5,
        stops: [0, 80, 100],
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: [
      {
        y: 0,
        offsetX: 0,
        offsetY: 0,
        padding: { left: 0, right: 0 },
        labels: {
          show: false,
        },
      },
    ],
    tooltip: {
      x: { show: false },
    },
  },
};

interface ISmoothLineChartProps {
  chartData: ApexOptions["series"];
  colors: string[];
}

const SmoothLineChart: React.FC<ISmoothLineChartProps> = ({ chartData, colors }) => {
  const [chartHeight, setChartHeight] = React.useState(90);

  const chartOptions: any = { ...chartSeriesData, series: chartData };
  chartOptions.options.colors = colors;

  useEffect(() => {
    setChartHeight(100);
  }, []);

  // @ts-ignore
  return <ReactApexChart options={chartOptions.options} series={chartOptions.series} type="area" height={chartHeight} />;
};

export default SmoothLineChart;
