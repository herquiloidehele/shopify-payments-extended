import { Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import AuthService from "../../../Api/Services/AuthService";
import { IUserReport } from "../../../models";
import CustomCardComponent from "../../components/Generic/CustomCard/CustomCard";
import TableWrapper from "../../components/Tables/TableWrapper";
import useHome from "../Home/useHome";
import { ButtonsControl } from "../MpesaConfig/Style";
import CreateUserModal from "./CreateUserModal";

const Users: React.FC = () => {
  const [usersReport, setUsersReport] = React.useState<IUserReport>({} as IUserReport);
  const [loading, setLoading] = React.useState(true);
  const [usersError, setUsersError] = React.useState(false);
  const { usersTableColumns, createUsersTableRows } = useHome();
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

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

  const openCreateUserModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  const handleCloseModal = (isSaved: boolean) => {
    if (isSaved) {
      fetchUsersReport();
    }

    setIsCreateModalOpen(false);
  };

  useEffect(() => {
    fetchUsersReport();
  }, []);

  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12} className="buttons-control">
        {isCreateModalOpen && <CreateUserModal isOpen={isCreateModalOpen} onClose={handleCloseModal} />}
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
