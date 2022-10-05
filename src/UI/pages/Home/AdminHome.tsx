import { Grid } from "@mui/material";
import { ApexOptions } from "apexcharts";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "styled-components";

import AuthService from "../../../Api/Services/AuthService";
import { IHomeProps, IUserReport } from "../../../models";
import { ReactComponent as GameRoundIcon } from "../../assets/icon/game-round-icon.svg";
import { ReactComponent as UserRoundIcon } from "../../assets/icon/user-round-icon.svg";
import CardStatistics from "../../components/CardStatistics/CardStatistics";
import CustomCardComponent from "../../components/Generic/CustomCard/CustomCard";
import TableWrapper from "../../components/Tables/TableWrapper";
import useHome from "./useHome";

const AdminHome: React.FC<IHomeProps> = ({ paymentReport, paymentReportError, paymentReportLoading }) => {
  const { t } = useTranslation();
  const themeContext = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<IUserReport>({} as IUserReport);
  const [userError, setUserError] = useState<boolean>(false);
  const { createPaymentData, paymentsTableColumns, createUsersTableRows, usersTableColumns } = useHome();

  const usersStatisticsData: ApexOptions["series"] = [
    {
      name: t("pages.home.statisticCard.users.title"),
      data: [31, 40, 28, 51, 42, 109, 100],
    },
  ];

  const paymentsStatisticsData: ApexOptions["series"] = [
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

  const fetchTotalUsers = () => {
    setLoading(true);
    setUserError(false);

    AuthService.getUsersReport()
      .then((usersData: IUserReport) => {
        setUserData(usersData);
      })
      .catch(() => {
        setUserError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTotalUsers();
  }, []);

  return (
    <Grid container>
      <Grid container columnSpacing={5}>
        <Grid item xs={4}>
          <CardStatistics
            value={userData?.total || ""}
            title={t("pages.home.statisticCard.users.subtitle")}
            icon={<UserRoundIcon />}
            chartData={usersStatisticsData}
            colors={[themeContext.colors.primary]}
          />
        </Grid>

        <Grid item xs={4}>
          <CardStatistics
            value={paymentReport.paymentsCount}
            title={t("pages.home.statisticCard.no-payments.subtitle")}
            icon={<UserRoundIcon />}
            chartData={paymentsStatisticsData}
            colors={[themeContext.colors.primary]}
          />
        </Grid>

        <Grid item xs={4}>
          <CardStatistics
            value={paymentReport.paymentsTotal}
            title={t("pages.home.statisticCard.total-payments.subtitle")}
            icon={<GameRoundIcon />}
            chartData={paysStatisticsData}
            colors={[themeContext.colors.primary]}
          />
        </Grid>
      </Grid>

      <Grid container columnSpacing={5} marginTop={5}>
        <Grid item xs={6}>
          <CustomCardComponent title={t("pages.home.cardPayments.title")}>
            <TableWrapper columns={paymentsTableColumns} rows={createPaymentData(paymentReport.payments)} />
          </CustomCardComponent>
        </Grid>

        <Grid item xs={6}>
          <CustomCardComponent title={t("pages.home.cardUsers.title")}>
            <TableWrapper columns={usersTableColumns} rows={createUsersTableRows(userData.users)} />
          </CustomCardComponent>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminHome;
