import { Box, FormControl, InputLabel, MenuItem, Select, Snackbar } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";

import PackageManager from "../../../Managers/PackageManager";
import StoresManager from "../../../Managers/StoresManager";
import SubscriptionManager from "../../../Managers/SubscriptionManager";
import { INewSubscription } from "../../../models";
import { formatCurrency } from "../../../Utils/functions/Ui";
import ModalWrapper from "../../components/Modals/ModalWrapper";

interface ICreateSubscriptionModalProps {
  isOpen: boolean;
  onClose: (saved: boolean) => void;
}

const CreateSubscriptionModal: React.FC<ICreateSubscriptionModalProps> = ({ isOpen, onClose }) => {
  const [modalData, setModalData] = React.useState<any | undefined>();
  const [subscription, setSubscription] = React.useState<INewSubscription>({} as INewSubscription);
  const [showPopup, setShowPopup] = React.useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { data: packages } = useQuery({ queryKey: ["packages"], queryFn: () => PackageManager.getPackages() });
  const { data: stores } = useQuery({ queryKey: ["stores"], queryFn: () => StoresManager.getStores() });

  const { mutate: createSubscriptionMutation, isPending: saveLoading } = useMutation({
    mutationKey: ["createSubscriptions"],
    mutationFn: (data: INewSubscription) => SubscriptionManager.createSubscription(data),
    onSuccess: () => {
      setToastMessage("Subscrição criada com sucesso");
      setShowPopup(true);
      onClose(true);
    },
    onError: () => {
      setToastMessage("Erro ao criar Subscrição");
      setShowPopup(true);
    },
  });

  const handleCreateNewUser = useCallback(() => {
    setShowPopup(false);
    setToastMessage("");

    createSubscriptionMutation(subscription);
  }, [subscription]);

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
      id: "create-subscription-modal",
      isOpen: false,
      title: "Nova Subscrição",
      actionButtonText: "Salvar",
    });
  }, [modalData, subscription]);

  const initUserData = () => {
    setSubscription({
      shopId: "",
      packageId: "",
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
      setSubscription({ ...subscription, [event.target.name]: event.target.value });
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
          {stores && stores.length && (
            <FormControl fullWidth style={{ margin: "8px" }}>
              <InputLabel id="demo-simple-select-label">Loja</InputLabel>
              <Select labelId="role-labelId" id="demo-simple-select" name="shopId" value={subscription.shopId} label="Seleccione a Loja" onChange={handleFieldChange} disabled={saveLoading}>
                {stores.map((store) => (
                  <MenuItem value={store.id}>{store.shopReference}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {packages && packages.length && (
            <FormControl fullWidth style={{ margin: "8px" }}>
              <InputLabel id="demo-simple-select-label">Tipo de Pacote</InputLabel>
              <Select labelId="role-labelId" id="demo-simple-select" name="packageId" value={subscription.packageId} label="Selecione o Pacote" onChange={handleFieldChange} disabled={saveLoading}>
                {packages.map((packageItem) => (
                  <MenuItem value={packageItem.id}>
                    {packageItem.name} / {packageItem.monthsDuration} Mês - {formatCurrency(packageItem.price)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>

        <Snackbar open={showPopup} autoHideDuration={6000} onClose={handleClose} message={toastMessage} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} />
      </div>
    </ModalWrapper>
  ) : null;
};

export default CreateSubscriptionModal;
