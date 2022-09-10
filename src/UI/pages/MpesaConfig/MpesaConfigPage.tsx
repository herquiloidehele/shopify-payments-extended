import { Box, Button, Grid, Snackbar, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import AppService from "../../../Api/Services/AppService";
import CustomCardComponent from "../../components/Generic/CustomCard/CustomCard";
import { ButtonsControl } from "./Style";

const MpesaConfigPage = () => {
  const { t } = useTranslation();

  const [settingsData, setSettingsData] = useState({
    apiKey: "",
    publicKey: "",
    origin: "",
    host: "",
    serviceProviderCode: "",
    accessToken: "",
    shop: "sugarfitshop.myshopify.com",
  });

  const [showError, setShowError] = useState(false);
  const [toastMeessage, setToastMessage] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [formTouched, setFormTouched] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const getPaymentSettings = useCallback(() => {
    setFetchLoading(true);

    AppService.getPaymentSettings("sugarfitshop.myshopify.com")
      .then((response: any) => {
        setSettingsData(response);
      })
      .catch((error: any) => {
        console.log(error);
        setOpen(true);
        setToastMessage("Erro ao Buscar Configurações");
      })
      .finally(() => {
        setFetchLoading(false);
      });
  }, [settingsData, fetchLoading]);

  const onSaveChanges = useCallback(() => {
    setSaveLoading(true);
    setShowError(false);

    AppService.savePaymentSettings(settingsData)
      .then((settingsResponse: any) => {
        setSettingsData(settingsResponse);
        setFormTouched(false);
        setOpen(true);
        setToastMessage("Configurações salvas com sucesso");
      })
      .catch((error: any) => {
        console.log(error);
        setShowError(true);
        setOpen(true);
        setToastMessage("Erro ao salvar configurações");
      })
      .finally(() => {
        setSaveLoading(false);
      });
  }, [settingsData, saveLoading]);

  useEffect(() => {
    getPaymentSettings();
  }, []);

  const handleFieldChange = useCallback(
    (keyValue: any) => {
      setSettingsData({ ...settingsData, ...keyValue });
      setFormTouched(true);
    },
    [settingsData]
  );

  return (
    <Grid container columnSpacing={5} rowSpacing={4}>
      <Grid xs={12} className="buttons-control">
        <ButtonsControl>
          <Button disabled={saveLoading || !formTouched} className="save-button" variant="contained" color="primary" disableElevation onClick={() => onSaveChanges()}>
            {t("generics.buttons.save")}
          </Button>
        </ButtonsControl>
      </Grid>
      <Grid item xs={7} style={{ height: "100%" }}>
        <CustomCardComponent title={t("pages.mpesaConfig.form1.title")}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField fullWidth required label="MPESA API KEY" value={settingsData.apiKey} onChange={(event) => handleFieldChange({ apiKey: event.target.value })} disabled={saveLoading} />
            <TextField fullWidth required label="MPESA PUBLIC KEY" value={settingsData.publicKey} onChange={(event) => handleFieldChange({ publicKey: event.target.value })} disabled={saveLoading} />
            <TextField fullWidth required label="MPESA API HOST" value={settingsData.host} onChange={(event) => handleFieldChange({ host: event.target.value })} disabled={saveLoading} />
            <TextField fullWidth required label="MPESA ORIGIN" value={settingsData.origin} onChange={(event) => handleFieldChange({ origin: event.target.value })} disabled={saveLoading} />
            <TextField
              fullWidth
              required
              label="MPESA SERVICE PROVIDER CODE"
              value={settingsData.serviceProviderCode}
              onChange={(event) => handleFieldChange({ serviceProviderCode: event.target.value })}
              disabled={saveLoading}
            />
          </Box>
        </CustomCardComponent>
      </Grid>

      <Grid item xs={5} style={{ height: "100%" }}>
        <CustomCardComponent title={t("pages.mpesaConfig.form2.title")}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField fullWidth required label="ACCESS TOKEN" value={settingsData.accessToken} onChange={(event) => handleFieldChange({ accessToken: event.target.value })} disabled={saveLoading} />
          </Box>
        </CustomCardComponent>
      </Grid>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message={toastMeessage} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} />
    </Grid>
  );
};

export default MpesaConfigPage;
