import { Delete, Edit } from "@mui/icons-material";
import { Button, Grid, IconButton } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import AuthService from "../../../Api/Services/AuthService";
import UserService from "../../../Api/Services/UserService";
import { IUser, IUserReport } from "../../../models";
import AvatarWithName from "../../components/Generic/AvatarWithName";
import CustomCardComponent from "../../components/Generic/CustomCard/CustomCard";
import ConfirmModal from "../../components/Modals/ConfirmModal";
import TableWrapper from "../../components/Tables/TableWrapper";
import useHome from "../Home/useHome";
import { ButtonsControl } from "../MpesaConfig/Style";
import CreateUserModal from "./CreateUserModal";

const Users: React.FC = () => {
  const [usersReport, setUsersReport] = React.useState<IUserReport>({} as IUserReport);
  const [loading, setLoading] = React.useState(true);
  const [usersError, setUsersError] = React.useState(false);
  const { usersTableColumns, getUserBadge } = useHome();
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<IUser>();
  const [removeConfirmationModal, setRemoveConfirmationModal] = React.useState<any>({});
  const [isRemovePoupOpen, setIsRemovePopupOpen] = useState(false);

  const { t } = useTranslation();

  const tableColumnsWrapper = [...usersTableColumns, "Acções"];

  const openCreateUserModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
  };

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

  const handleDeleteItem = useCallback(() => {
    if (!selectedUser) {
      console.log("No user selected");
      return;
    }

    console.log("Deleting user", selectedUser);

    UserService.deleteUser(selectedUser.id)
      .then((response) => {
        setIsRemovePopupOpen(false);
        fetchUsersReport();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedUser]);

  const handleEditItem = (user: IUser) => {
    openCreateUserModal();
  };

  const openRemoveConfirmationModal = (user: IUser) => {
    console.log("Set Selected", user);
    setSelectedUser(user);
    setIsRemovePopupOpen(true);
  };

  const getActionButtons = (user: IUser) => {
    return (
      <div>
        <IconButton aria-label="delete" onClick={() => openRemoveConfirmationModal(user)}>
          <Delete />
        </IconButton>

        <IconButton aria-label="edit" onClick={() => handleEditItem(user)}>
          <Edit />
        </IconButton>
      </div>
    );
  };

  const createUsersTableRows = (users: IUser[]) => {
    if (!users) {
      return [];
    }

    return users.map((user: IUser) => {
      return [<AvatarWithName name={`${user.name}`} image="" />, user.role, user.storeId, getUserBadge(user.status), user.email, user.createdAt.toString().slice(0, 15), getActionButtons(user)];
    });
  };

  const handleCloseModal = (isSaved: boolean) => {
    if (isSaved) {
      fetchUsersReport();
    }

    setIsCreateModalOpen(false);
  };

  const initRemoveModalData = useCallback(() => {
    setRemoveConfirmationModal({
      title: "Deseja realmente remover este utilizador?",
      message: "Ao remover este utilizador, todos os dados associados a ele serão perdidos.",
      isOpen: false,
      onClose: () => {
        setIsRemovePopupOpen(false);
      },
    });
  }, []);

  useEffect(() => {
    fetchUsersReport();
    initRemoveModalData();
  }, []);

  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12} className="buttons-control">
        {isCreateModalOpen && <CreateUserModal isOpen={isCreateModalOpen} onClose={handleCloseModal} />}
        <ConfirmModal {...removeConfirmationModal} isOpen={isRemovePoupOpen} onAccept={handleDeleteItem} />
        <ButtonsControl>
          <Button className="save-button" variant="contained" color="primary" disableElevation onClick={() => openCreateUserModal()}>
            {t("generics.buttons.new")}
          </Button>
        </ButtonsControl>
      </Grid>
      <Grid item xs={12} style={{ height: "100%" }}>
        <CustomCardComponent title={t("pages.users.title")}>
          <TableWrapper columns={tableColumnsWrapper} rows={createUsersTableRows(usersReport.users)} />
        </CustomCardComponent>
      </Grid>
    </Grid>
  );
};

export default Users;
