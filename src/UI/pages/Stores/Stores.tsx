import { Delete, Edit } from "@mui/icons-material";
import { Button, Chip, Grid, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import StoresManager from "../../../Managers/StoresManager";
import { IStore } from "../../../models";
import CustomCardComponent from "../../components/Generic/CustomCard/CustomCard";
import TableWrapper from "../../components/Tables/TableWrapper";
import { ButtonsControl } from "../MpesaConfig/Style";
import CreateStoreModal from "./CreateStoreModal";

const Stores: React.FC = () => {
  const { t } = useTranslation();
  const [storeList, setStoreList] = useState<IStore[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = React.useState(false);

  const fetchStores = () => {
    setFetchLoading(true);
    StoresManager.getStores()
      .then((stores: IStore[]) => {
        setStoreList(stores);
      })
      .finally(() => {
        setFetchLoading(false);
      });
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const openCreateStoreModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  const handleCloseModal = (isSaved: boolean) => {
    if (isSaved) {
      fetchStores();
    }

    setIsCreateModalOpen(false);
    setIsUpdateModalOpen(false);
  };

  const storesTableRows = [t("pages.stores.table.name"), t("pages.stores.table.accessToken"), t("pages.stores.table.status"), t("pages.stores.table.actions")];

  const getStatusBadge = (status: boolean) => {
    if (status) {
      return <Chip label="Activo" color="primary" size="small" />;
    }
    return <Chip label="Desactivo" color="error" size="small" />;
  };

  const openEditModal = (store: IStore) => {
    console.log("Edit store", store);
  };

  const openDeleteModal = (store: IStore) => {
    console.log("Delete store", store);
  };

  const getActionButtons = (store: IStore) => {
    return (
      <div>
        <IconButton aria-label="delete" onClick={() => openDeleteModal(store)}>
          <Delete />
        </IconButton>

        <IconButton aria-label="edit" onClick={() => openEditModal(store)}>
          <Edit />
        </IconButton>
      </div>
    );
  };

  const createStoresTableRows = (stores: IStore[]) => {
    if (!stores.length) {
      return [];
    }

    return stores.map((store: IStore) => {
      return [store.shopReference, store.accessToken, getStatusBadge(store.status), getActionButtons(store)];
    });
  };

  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12} className="buttons-control">
        {isCreateModalOpen && <CreateStoreModal isOpen={isCreateModalOpen} onClose={handleCloseModal} />}
        <ButtonsControl>
          <Button disabled={fetchLoading} className="save-button" variant="contained" color="primary" disableElevation onClick={() => openCreateStoreModal()}>
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
