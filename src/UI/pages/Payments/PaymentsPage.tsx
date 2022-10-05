import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import AppService from "../../../Api/Services/AppService";
import { IPaymentReport } from "../../../models";
import CustomCardComponent from "../../components/Generic/CustomCard/CustomCard";
import TableWrapper from "../../components/Tables/TableWrapper";
import useHome from "../Home/useHome";

const PaymentsPage = () => {
  const [paymentReport, setPaymentsReport] = useState<IPaymentReport>({} as IPaymentReport);
  const [paymentsError, setPaymentsError] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation();
  const { paymentsTableColumns, createPaymentData } = useHome();

  const fetchPaymentsReport = () => {
    setLoading(true);
    setPaymentsError(false);

    AppService.getShopReport()
      .then((paymentReport: any) => {
        setPaymentsReport(paymentReport);
      })
      .catch(() => {
        setPaymentsError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPaymentsReport();
  }, []);

  return (
    <Grid container>
      <Grid item xs={12} style={{ height: "100%" }}>
        <CustomCardComponent title={t("pages.payments.title")}>
          <TableWrapper columns={paymentsTableColumns} rows={createPaymentData(paymentReport.payments)} />
        </CustomCardComponent>
      </Grid>
    </Grid>
  );
};

export default PaymentsPage;
