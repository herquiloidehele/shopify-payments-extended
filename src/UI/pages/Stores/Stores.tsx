import { Button, Chip, Grid } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { IStore } from "../../../models";
import CustomCardComponent from "../../components/Generic/CustomCard/CustomCard";
import TableWrapper from "../../components/Tables/TableWrapper";
import { ButtonsControl } from "../MpesaConfig/Style";

const Stores: React.FC = () => {
  const { t } = useTranslation();
  const [storeList, setStoreList] = useState<IStore[]>([]);

  const openCreateStoreModal = () => {};

  const storesTableRows = [t("pages.stores.table.name"), t("pages.stores.table.accessToken"), t("pages.stores.table.status"), t("pages.stores.table.actions")];

  const getStatusBadge = (status: boolean) => {
    if (status) {
      return <Chip label="Activo" color="primary" size="small" />;
    }
    return <Chip label="Desactivo" color="error" size="small" />;
  };

  const createStoresTableRows = (stores: IStore[]) => {
    if (!stores.length) {
      return [];
    }

    return stores.map((store: IStore) => {
      return [store.shopReference, store.accessToken, getStatusBadge(store.status)];
    });
  };

  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12} className="buttons-control">
        <ButtonsControl>
          <Button className="save-button" variant="contained" color="primary" disableElevation onClick={() => openCreateStoreModal()}>
            {t("generics.buttons.new")}
          </Button>
        </ButtonsControl>
      </Grid>
      <Grid item xs={12} style={{ height: "100%" }}>
        <CustomCardComponent title={t("pages.stores.title")}>
          <TableWrapper columns={storesTableRows} rows={createStoresTableRows(storeList)} />
        </CustomCardComponent>
      </Grid>
    </Grid>
  );
};

export default Stores;
