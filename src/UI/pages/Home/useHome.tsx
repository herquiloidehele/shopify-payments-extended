import { Chip } from "@mui/material";
import { ApexOptions } from "apexcharts";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { IPayment, IUser } from "../../../models";
import { formatCurrency } from "../../../Utils/functions/Ui";
import AvatarWithName from "../../components/Generic/AvatarWithName";
import { MoneyStye } from "../../components/Generic/Style";

const useHome = () => {
  const { t } = useTranslation();
  const [error, setError] = useState(false);
  const [paymentReport, setPaymentsReport] = useState<any>({
    payments: [],
    paymentsCount: "0",
    paymentsTotal: `0 MZN`,
  });

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

  const getBadge = (status: boolean) => {
    if (status) {
      return <Chip label="Pago" color="primary" size="small" />;
    }
    return <Chip label="Falhado" color="error" size="small" />;
  };

  const getUserBadge = (status: boolean) => {
    if (status) {
      return <Chip label="Activo" color="primary" size="small" />;
    }
    return <Chip label="Desactivo" color="error" size="small" />;
  };

  const getMpesaAPIBadge = (status: boolean) => {
    if (status) {
      return <Chip label="SIM" color="primary" size="small" />;
    }
    return <Chip label="Não" color="error" size="small" />;
  };

  const paymentsTableColumns = [
    t("pages.home.cardPayments.table.order"),
    t("pages.home.cardPayments.table.customer"),
    t("pages.home.cardPayments.table.amount"),
    t("pages.home.cardPayments.table.date"),
    t("pages.home.cardPayments.table.status"),
  ];

  const usersTableColumns = [
    t("pages.home.cardUsers.table.name"),
    t("pages.home.cardUsers.table.role"),
    t("pages.home.cardUsers.table.shop"),
    t("pages.home.cardUsers.table.status"),
    t("pages.home.cardUsers.table.hasAPI"),
    t("pages.home.cardUsers.table.email"),
    t("pages.home.cardUsers.table.createdAt"),
  ];

  const createUsersTableRows = (users: IUser[]) => {
    if (!users) {
      return [];
    }

    return users.map((user: IUser) => {
      return [
        <AvatarWithName name={`${user.name}`} image="" />,
        user.role,
        user.storeId,
        getUserBadge(user.status),
        getMpesaAPIBadge(user.hasOwnPaymentSettings),
        user.email,
        user.createdAt.toString().slice(0, 15),
      ];
    });
  };

  function createPaymentData(paymentData: IPayment[]): any[] {
    if (!paymentData) {
      return [];
    }

    return paymentData.map((data: any) => {
      return {
        order: `${data.orderNumber}`,
        customer: <AvatarWithName name={data.customer} />,
        amount: <MoneyStye mode="SUCCESS">{formatCurrency(data.price)}</MoneyStye>,
        date: dayjs(data.createdAt).format("DD/MM/YYYY HH:mm"),
        status: getBadge(data.status),
      };
    });
  }

  return { usersStatisticsData, createUsersTableRows, usersTableColumns, paysStatisticsData, paymentReport, createPaymentData, paymentsTableColumns, getUserBadge, getMpesaAPIBadge };
};

export default useHome;
