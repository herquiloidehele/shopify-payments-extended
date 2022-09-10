import { ApexOptions } from "apexcharts";
import React from "react";
import { useTranslation } from "react-i18next";

import { TIMELINE_EVENTS_TYPES } from "../../../Utils/constants/Constants";
import AvatarWithName from "../../components/Generic/AvatarWithName";
import { MoneyStye } from "../../components/Generic/Style";
import { ITimeLineData } from "../../components/TimeLineEvents/TimelineEvents";

const useHome = () => {
  const { t } = useTranslation();

  const usersStatisticsData: ApexOptions["series"] = [
    {
      name: t("pages.home.statisticCard.users.title"),
      data: [31, 40, 28, 51, 42, 109, 100],
    },
  ];

  const paysStatisticsData: ApexOptions["series"] = [
    {
      name: t("pages.home.statisticCard.games.title"),
      data: [100, 430, 28, 341, 162, 109, 600],
    },
  ];

  // TODO: Implement translations for timeline descriptions
  const timeLineData: ITimeLineData[] = [
    {
      eventType: TIMELINE_EVENTS_TYPES.NEW_CHALLENGE,
      title: t("pages.home.timeLineEvents.newChallenge"),
      description: (
        <>
          Foi criado um novo jogo de <MoneyStye mode="SUCCESS">100 MZN</MoneyStye>
        </>
      ),
      date: new Date(2022, 7, 5),
    },
    {
      eventType: TIMELINE_EVENTS_TYPES.CHALLENGE_ACCEPTED,
      title: t("pages.home.timeLineEvents.challengeAccepted"),
      description: (
        <>
          O <b>Herquiloide</b> aceitou o jogo do <b>Mauro</b>
        </>
      ),
      date: new Date(2022, 7, 4),
    },
    {
      eventType: TIMELINE_EVENTS_TYPES.BUY_CREDITS,
      title: t("pages.home.timeLineEvents.buyCredits"),
      description: (
        <>
          Foi comprado uma recarga de <MoneyStye mode="SUCCESS">500 MZN</MoneyStye>
        </>
      ),
      date: new Date(2022, 7, 3),
    },
    {
      eventType: TIMELINE_EVENTS_TYPES.WITHDRAW_MONEY,
      title: t("pages.home.timeLineEvents.withdrawMoney"),
      description: (
        <>
          Foi levantado um valor de <MoneyStye mode="DANGER">-1500 MZN</MoneyStye>
        </>
      ),
      date: new Date(2022, 7, 4),
    },
  ];

  function createData(name: string, balance: number, winnies: number, defeats: number) {
    return {
      name,
      balance: <MoneyStye mode="SUCCESS">{balance} MZN</MoneyStye>,
      winnesDefiets: (
        <>
          {" "}
          <MoneyStye mode="SUCCESS">{winnies} vit.</MoneyStye> / <MoneyStye mode="DANGER">{defeats} der.</MoneyStye>{" "}
        </>
      ),
    };
  }

  function createLastPlaysData(createdBy: string, acceptedBy: string, value: number, winner: string) {
    return {
      createdBy: <AvatarWithName name={createdBy} image="https://material-ui.com/static/images/avatar/2.jpg" />,
      acceptedBy: <AvatarWithName name={acceptedBy} image="https://material-ui.com/static/images/avatar/1.jpg" />,
      value: <MoneyStye mode="SUCCESS">{value} MZN</MoneyStye>,
      winner: <AvatarWithName name={winner} image="https://material-ui.com/static/images/avatar/3.jpg" />,
    };
  }

  const bestPlayersRows = [
    createData("Frozen yoghurt", 159, 6, 24),
    createData("Ice cream sandwich", 237, 9.0, 37),
    createData("Eclair", 262, 16, 24),
    createData("Cupcake", 305, 3, 67),
    createData("Gingerbread", 356, 16, 49),
  ];

  const lastPlaysRows = [
    createLastPlaysData("Frozen yoghurt", "Herquiloide Hele", 176, "Frozen yoghurt"),
    createLastPlaysData("Frozen yoghurt", "Herquiloide Hele", 176, "Frozen yoghurt"),
    createLastPlaysData("Frozen yoghurt", "Herquiloide Hele", 176, "Frozen yoghurt"),
    createLastPlaysData("Frozen yoghurt", "Herquiloide Hele", 176, "Frozen yoghurt"),
    createLastPlaysData("Frozen yoghurt", "Herquiloide Hele", 176, "Frozen yoghurt"),
    createLastPlaysData("Frozen yoghurt", "Herquiloide Hele", 176, "Frozen yoghurt"),
  ];

  return { usersStatisticsData, lastPlaysRows, bestPlayersRows, timeLineData, paysStatisticsData };
};

export default useHome;
