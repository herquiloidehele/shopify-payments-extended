import { Grid } from "@mui/material";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "styled-components";

import { ReactComponent as GameRoundIcon } from "../../assets/icon/game-round-icon.svg";
import { ReactComponent as UserRoundIcon } from "../../assets/icon/user-round-icon.svg";
import CardStatistics from "../../components/CardStatistics/CardStatistics";
import CustomCardComponent from "../../components/Generic/CustomCard/CustomCard";
import TimelineEvents from "../../components/TimeLineEvents/TimelineEvents";
import WellcomeCard from "../../components/WellcomeCard/WellcomeCard";
import BestPlayersTable from "./BestPlayersTable";
import LastPlaysTable from "./LastPlaysTable";
import useHome from "./useHome";

const Home: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  const { usersStatisticsData, lastPlaysRows, bestPlayersRows, timeLineData, paysStatisticsData } = useHome();
  const { t } = useTranslation();

  return (
    <Grid container>
      <Grid container columnSpacing={5}>
        <Grid item xs={6}>
          <WellcomeCard />
        </Grid>

        <Grid item xs={3}>
          <CardStatistics value={150} title={t("pages.home.statisticCard.users.subtitle")} icon={<UserRoundIcon />} chartData={usersStatisticsData} colors={[themeContext.colors.primary]} />
        </Grid>

        <Grid item xs={3}>
          <CardStatistics value={800} title={t("pages.home.statisticCard.games.subtitle")} icon={<GameRoundIcon />} chartData={paysStatisticsData} colors={[themeContext.colors.primary]} />
        </Grid>
      </Grid>

      <Grid container columnSpacing={5} marginTop={5}>
        <Grid item xs={5}>
          <CustomCardComponent title={t("pages.home.timeLineEvents.title")}>
            <TimelineEvents events={timeLineData} />
          </CustomCardComponent>
        </Grid>

        <Grid item xs={7} style={{ height: "100%" }}>
          <CustomCardComponent title={t("pages.home.cardBestPlayers.title")}>
            <BestPlayersTable tableRows={bestPlayersRows} />
          </CustomCardComponent>
        </Grid>
      </Grid>

      <Grid container columnSpacing={5} marginTop={5}>
        <Grid item xs={12} style={{ height: "100%" }}>
          <CustomCardComponent title={t("pages.home.cardLastPlays.title")}>
            <LastPlaysTable tableRows={lastPlaysRows} />
          </CustomCardComponent>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
