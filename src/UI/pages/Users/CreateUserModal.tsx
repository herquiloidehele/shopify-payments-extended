import { Box, FormControl, InputLabel, MenuItem, Select, Snackbar, Switch, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

import UserService from "../../../Api/Services/UserService";
import { IUser, USER_ROLES } from "../../../models";
import ModalWrapper from "../../components/Modals/ModalWrapper";

interface ICreateUserModalProps {
  isOpen: boolean;
  onClose: (saved: boolean) => void;
}

const CreateUserModal: React.FC<ICreateUserModalProps> = ({ isOpen, onClose }) => {
  const [saveLoading, setSaveLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState<any | undefined>();
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [user, setUser] = React.useState<IUser>({} as IUser);
  const [showPopup, setShowPopup] = React.useState(false);
  const [toastMeessage, setToastMessage] = useState("");

  const handleFieldChange = (event: any) => {
    if (event.target) {
      if (event.target.name === "status") {
        setUser({ ...user, status: event.target.checked });
      } else {
        setUser({ ...user, [event.target.name]: event.target.value });
      }
    }
  };

  const handleCreateNewUser = useCallback(() => {
    setSaveLoading(true);

    UserService.createUser(user)
      .then((response) => {
        onClose(true);
      })
      .catch((error) => {
        console.log(error);
        setToastMessage("Erro ao criar usuário");
      })
      .finally(() => {
        setSaveLoading(false);
      });
  }, [user]);

  const handleClodeModal = useCallback(() => {
    if (!modalData) {
      onClose(false);
      return;
    }

    setModalData({ ...modalData, isOpen: false });
    onClose(false);
  }, [modalData]);

  const initModalInfo = useCallback(() => {
    setModalData({
      id: "create-user-modal",
      isOpen: false,
      title: "Novo utilizador",
      actionButtonText: "Salvar",
    });
  }, [modalData, user]);

  const initUserData = () => {
    setUser({
      id: "",
      role: USER_ROLES.STORE_OWNER,
      createdAt: new Date(),
      name: "",
      storeId: "",
      status: true,
      token: "",
      password: "",
      email: "",
    });
  };

  useEffect(() => {
    initModalInfo();
    initUserData();
  }, []);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setShowPopup(false);
  };

  return modalData ? (
    <ModalWrapper {...modalData} isOpen={isOpen} actionButtonOnClick={handleCreateNewUser} handleClose={handleClodeModal}>
      <div style={{ width: "100%" }}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField fullWidth required label="Nome" name="name" value={user.name} onChange={(event) => handleFieldChange(event)} disabled={saveLoading} />
          <TextField fullWidth required label="Email" name="email" value={user.email} onChange={(event) => handleFieldChange(event)} disabled={saveLoading} />
          <TextField fullWidth required label="Password" name="password" value={user.password} onChange={(event) => handleFieldChange(event)} disabled={saveLoading} />
          <FormControl fullWidth style={{ margin: "8px" }}>
            <InputLabel id="demo-simple-select-label">Tipo de Utilizador</InputLabel>
            <Select labelId="role-labelId" id="demo-simple-select" name="role" value={user.role} label="Tipo de Utilizador" onChange={(event) => handleFieldChange(event)}>
              <MenuItem value={USER_ROLES.ADMIN}>Administrator</MenuItem>
              <MenuItem value={USER_ROLES.STORE_OWNER}>Store Owner</MenuItem>
            </Select>
          </FormControl>
          {user.role === USER_ROLES.STORE_OWNER && (
            <TextField fullWidth required label="Domínio da loja Shopify" name="storeId" value={user.storeId} onChange={(event) => handleFieldChange(event)} disabled={saveLoading} />
          )}

          <div style={{ margin: "8px" }}>
            <InputLabel id="user-status">Estado</InputLabel>
            <Switch id="user-status" name="status" style={{ width: "100%" }} checked={user.status} onChange={handleFieldChange} {...label} />
          </div>
        </Box>

        <Snackbar open={showPopup} autoHideDuration={6000} onClose={handleClose} message={toastMeessage} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} />
      </div>
    </ModalWrapper>
  ) : null;
};

export default CreateUserModal;