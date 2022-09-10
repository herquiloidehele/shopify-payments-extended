import { Grid } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import CustomCardComponent from "../../components/Generic/CustomCard/CustomCard";
import PaymentsTable from "../Home/PaymentsTable";
import useHome from "../Home/useHome";

const PaymentsPage = () => {
  const { t } = useTranslation();
  const { lastPlaysRows } = useHome();

  return (
    <Grid container>
      <Grid item xs={12} style={{ height: "100%" }}>
        <CustomCardComponent title={t("pages.payments.title")}>
          <PaymentsTable tableRows={lastPlaysRows} />
        </CustomCardComponent>
      </Grid>
    </Grid>
  );
};

export default PaymentsPage;
