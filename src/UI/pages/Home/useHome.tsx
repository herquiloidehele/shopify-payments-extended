import { Chip } from "@mui/material";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import AppService from "../../../Api/Services/AppService";
import AuthService from "../../../Api/Services/AuthService";
import AvatarWithName from "../../components/Generic/AvatarWithName";
import { MoneyStye } from "../../components/Generic/Style";

const useHome = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<any[]>([]);
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

  function createPaymentData(paymentData: any[]): any[] {
    if (!paymentData) {
      return [];
    }

    return paymentData.map((data: any) => {
      return {
        order: `${data.orderNumber}`,
        customer: <AvatarWithName name={data.customer} />,
        amount: <MoneyStye mode="SUCCESS">{data.price} MZN</MoneyStye>,
        date: new Date(data.createdAt).toString().slice(0, 15),
        status: getBadge(data.status),
      };
    });
  }

  const fetchPayments = () => {
    setLoading(true);
    setError(false);

    const userStoreId = AuthService.getAuthUser?.storeId || "";

    AppService.getPaymentsList(userStoreId)
      .then((paymentList: any) => {
        setPayments(createPaymentData(paymentList));
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchPaymentsReport = () => {
    setLoading(true);
    setError(false);

    const userStoreId = AuthService.getAuthUser?.storeId || "";

    AppService.getShopReport(userStoreId)
      .then((paymentReport: any) => {
        setPaymentsReport(paymentReport);
        // setPayments(createPaymentData(paymentReport.payments));
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return { usersStatisticsData, payments, paysStatisticsData, paymentReport, fetchPaymentsReport };
};

export default useHome;
