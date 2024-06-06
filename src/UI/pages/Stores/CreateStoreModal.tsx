import { Box, InputLabel, Snackbar, Switch, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

import StoresManager from "../../../Managers/StoresManager";
import { IShop } from "../../../models";
import ModalWrapper from "../../components/Modals/ModalWrapper";

interface ICreateUserModalProps {
  isOpen: boolean;
  onClose: (saved: boolean) => void;
}

const CreateStoreModal: React.FC<ICreateUserModalProps> = ({ isOpen, onClose }) => {
  const [saveLoading, setSaveLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState<any | undefined>();
  const label = { inputProps: { "aria-label": "Modal Create Store" } };
  const [store, setStore] = React.useState<IShop>({} as IShop);
  const [showPopup, setShowPopup] = React.useState(false);
  const [toastMeessage, setToastMessage] = useState("");

  const handleCreateNewUser = useCallback(() => {
    setSaveLoading(true);
    setShowPopup(false);
    setToastMessage("");

    StoresManager.createStore(store)
      .then(() => {
        setToastMessage("Loja criada com sucesso");
        setShowPopup(true);
        onClose(true);
      })
      .catch(() => {
        setToastMessage("Erro ao criar usuário");
        setShowPopup(true);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  }, [store]);

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
      id: "create-store-modal",
      isOpen: false,
      title: "Nova Loja",
      actionButtonText: "Salvar",
    });
  }, [modalData, store]);

  const initUserData = () => {
    setStore({
      id: "",
      status: true,
      shopName: "",
      shopReference: "",
      accessToken: "",
      withdrawPhoneNumber: "",
      hasOwnPaymentSettings: true,
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

  const handleFieldChange = (event: any) => {
    if (event.target) {
      if (event.target.name === "status") {
        setStore({ ...store, status: event.target.checked });
        return;
      }

      if (event.target.name === "hasOwnPaymentSettings") {
        setStore({ ...store, hasOwnPaymentSettings: event.target.checked });
        return;
      }

      setStore({ ...store, [event.target.name]: event.target.value });
    }
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
          <TextField fullWidth required label="Nome da Loja" name="shopName" value={store.shopName} onChange={handleFieldChange} disabled={saveLoading} />
          <TextField fullWidth required label="Dominio da Loja Shopify" name="shopReference" value={store.shopReference} onChange={handleFieldChange} disabled={saveLoading} />
          <TextField fullWidth required label="Access Token" name="accessToken" value={store.accessToken} onChange={handleFieldChange} disabled={saveLoading} />

          <div style={{ margin: "8px" }}>
            <InputLabel id="user-status">Possui API Mpesa?</InputLabel>
            <Switch
              id="hasOwnPaymentSettings"
              name="hasOwnPaymentSettings"
              style={{ width: "100%" }}
              checked={store.hasOwnPaymentSettings}
              onChange={handleFieldChange}
              {...label}
              disabled={saveLoading}
            />
          </div>

          {!store.hasOwnPaymentSettings && (
            <TextField fullWidth required label="Número Mpesa para Levantamento" name="withdrawPhoneNumber" value={store.withdrawPhoneNumber} onChange={handleFieldChange} disabled={saveLoading} />
          )}

          <div style={{ margin: "8px" }}>
            <InputLabel id="user-status">Estado</InputLabel>
            <Switch id="user-status" name="status" style={{ width: "100%" }} checked={store.status} onChange={handleFieldChange} {...label} disabled={saveLoading} />
          </div>
        </Box>

        <Snackbar open={showPopup} autoHideDuration={6000} onClose={handleClose} message={toastMeessage} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} />
      </div>
    </ModalWrapper>
  ) : null;
};

export default CreateStoreModal;
