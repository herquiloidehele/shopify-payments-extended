import { ApexOptions } from "apexcharts";
import React, { ReactElement } from "react";

import SmoothLineChart from "../Charts/SmoothLineChart/SmoothLineChart";
import { StatisticCardWrapper } from "./Style";

interface ICardStatisticsProps {
  title: string;
  value: number;
  chartData: ApexOptions["series"];
  icon: ReactElement;
  colors: string[];
}
const CardStatistics: React.FC<ICardStatisticsProps> = ({ title, icon, value, chartData, colors }) => {
  return (
    <StatisticCardWrapper>
      <div className="heading">
        {icon}
        <h1>{value}</h1>
        <p>{title}</p>
      </div>
      <SmoothLineChart chartData={chartData} colors={colors} />
    </StatisticCardWrapper>
  );
};

export default CardStatistics;
