import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import AppService from "../../../Api/Services/AppService";
import AuthService from "../../../Api/Services/AuthService";
import { IPaymentReport } from "../../../models";
import CustomCardComponent from "../../components/Generic/CustomCard/CustomCard";
import TableWrapper from "../../components/Tables/TableWrapper";
import useHome from "../Home/useHome";
import { ButtonsControl } from "../MpesaConfig/Style";

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

  const hasPendingPayments = paymentReport?.payments?.some((payment) => !payment.hasWithdrawed);

  const openWithdrawModal = () => {
    // TODO: Open Withdraw Modal
  };

  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12} style={{ height: "100%" }}>
        <ButtonsControl>
          {AuthService.isUserAdmin && (
            <Button disabled={hasPendingPayments} className="save-button" variant="contained" color="primary" disableElevation onClick={() => openWithdrawModal()}>
              {t("generics.buttons.withdraw")}
            </Button>
          )}
        </ButtonsControl>
      </Grid>
      <Grid item xs={12}>
        <CustomCardComponent title={t("pages.payments.title")}>
          <TableWrapper columns={paymentsTableColumns} rows={createPaymentData(paymentReport.payments)} />
        </CustomCardComponent>
      </Grid>
    </Grid>
  );
};

export default PaymentsPage;
