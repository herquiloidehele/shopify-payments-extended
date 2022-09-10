import { ApexOptions } from "apexcharts";
import React from "react";
import { useTranslation } from "react-i18next";

import AvatarWithName from "../../components/Generic/AvatarWithName";
import { MoneyStye } from "../../components/Generic/Style";

const useHome = () => {
  const { t } = useTranslation();

  const usersStatisticsData: ApexOptions["series"] = [
    {
      name: t("pages.home.statisticCard.no-payments.title"),
      data: [31, 40, 28, 51, 42, 109, 100],
    },
  ];

  const paysStatisticsData: ApexOptions["series"] = [
    {
      name: t("pages.home.statisticCard.total-payments.title"),
      data: [100, 430, 28, 341, 162, 109, 600],
    },
  ];

  function createLastPlaysData(createdBy: string, acceptedBy: string, value: number, winner: string, status: string) {
    return {
      order: <AvatarWithName name={createdBy} image="https://material-ui.com/static/images/avatar/2.jpg" />,
      customer: <AvatarWithName name={acceptedBy} image="https://material-ui.com/static/images/avatar/1.jpg" />,
      amount: <MoneyStye mode="SUCCESS">{value} MZN</MoneyStye>,
      date: <AvatarWithName name={winner} image="https://material-ui.com/static/images/avatar/3.jpg" />,
      status,
    };
  }

  const lastPlaysRows = [
    createLastPlaysData("Frozen yoghurt", "Herquiloide Hele", 176, "Frozen yoghurt", "Frozen yoghurt"),
    createLastPlaysData("Frozen yoghurt", "Herquiloide Hele", 176, "Frozen yoghurt", "Frozen yoghurt"),
    createLastPlaysData("Frozen yoghurt", "Herquiloide Hele", 176, "Frozen yoghurt", "Frozen yoghurt"),
    createLastPlaysData("Frozen yoghurt", "Herquiloide Hele", 176, "Frozen yoghurt", "Frozen yoghurt"),
    createLastPlaysData("Frozen yoghurt", "Herquiloide Hele", 176, "Frozen yoghurt", "Frozen yoghurt"),
    createLastPlaysData("Frozen yoghurt", "Herquiloide Hele", 176, "Frozen yoghurt", "Frozen yoghurt"),
  ];

  return { usersStatisticsData, lastPlaysRows, paysStatisticsData };
};

export default useHome;
