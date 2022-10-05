import { Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import AppService from "../../../Api/Services/AppService";
import AuthService from "../../../Api/Services/AuthService";
import { IUserReport } from "../../../models";
import CustomCardComponent from "../../components/Generic/CustomCard/CustomCard";
import TableWrapper from "../../components/Tables/TableWrapper";
import useHome from "../Home/useHome";
import { ButtonsControl } from "../MpesaConfig/Style";

const Users: React.FC = () => {
  const [usersReport, setUsersReport] = React.useState<IUserReport>({} as IUserReport);
  const [loading, setLoading] = React.useState(true);
  const [usersError, setUsersError] = React.useState(false);
  const { usersTableColumns, createUsersTableRows } = useHome();
  const { t } = useTranslation();

  const fetchUsersReport = () => {
    setLoading(true);
    setUsersError(false);

    AuthService.getUsersReport()
      .then((usersReport: any) => {
        setUsersReport(usersReport);
      })
      .catch(() => {
        setUsersError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const openCreateUserModal = () => {};

  useEffect(() => {
    fetchUsersReport();
  }, []);

  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12} className="buttons-control">
        <ButtonsControl>
          <Button className="save-button" variant="contained" color="primary" disableElevation onClick={() => openCreateUserModal()}>
            {t("generics.buttons.new")}
          </Button>
        </ButtonsControl>
      </Grid>
      <Grid item xs={12} style={{ height: "100%" }}>
        <CustomCardComponent title={t("pages.users.title")}>
          <TableWrapper columns={usersTableColumns} rows={createUsersTableRows(usersReport.users)} />
        </CustomCardComponent>
      </Grid>
    </Grid>
  );
};

export default Users;
