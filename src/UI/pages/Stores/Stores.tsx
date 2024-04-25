import { Delete, Edit } from "@mui/icons-material";
import { Button, Chip, Grid, IconButton } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import StoresManager from "../../../Managers/StoresManager";
import { IShop } from "../../../models";
import CustomCardComponent from "../../components/Generic/CustomCard/CustomCard";
import ConfirmModal from "../../components/Modals/ConfirmModal";
import TableWrapper from "../../components/Tables/TableWrapper";
import { ButtonsControl } from "../MpesaConfig/Style";
import CreateStoreModal from "./CreateStoreModal";
import UpdateStoreModal from "./UpdateStoreModal";

const Stores: React.FC = () => {
  const { t } = useTranslation();
  const [storeList, setStoreList] = useState<IShop[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = React.useState(false);
  const [selectedStore, setSelectedStore] = React.useState<IShop>();
  const [isRemovePopupOpen, setIsRemovePopupOpen] = useState(false);
  const [removeConfirmationModal, setRemoveConfirmationModal] = React.useState<any>({});

  const fetchStores = () => {
    setFetchLoading(true);
    StoresManager.getStores()
      .then((stores: IShop[]) => {
        setStoreList(stores);
      })
      .finally(() => {
        setFetchLoading(false);
      });
  };

  const initRemoveModalData = useCallback(() => {
    setRemoveConfirmationModal({
      title: t("pages.stores.removeModal.title"),
      message: t("pages.stores.removeModal.message"),
      isOpen: false,
      onClose: () => {
        setIsRemovePopupOpen(false);
      },
    });
  }, []);

  useEffect(() => {
    fetchStores();
    initRemoveModalData();
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

  const openEditModal = (store: IShop) => {
    setSelectedStore(store);
    setIsUpdateModalOpen(!isUpdateModalOpen);
  };

  const handleDeleteItem = useCallback(() => {
    if (!selectedStore) {
      console.log("No store selected");
      return;
    }

    console.log("Deleting store", selectedStore);

    StoresManager.deleteStore(selectedStore.id!).then(() => {
      setIsRemovePopupOpen(false);
      fetchStores();
    });
  }, [selectedStore]);

  const openDeleteModal = (store: IShop) => {
    setSelectedStore(store);
    setIsRemovePopupOpen(true);
  };

  const getActionButtons = (store: IShop) => {
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

  const createStoresTableRows = (stores: IShop[]) => {
    if (!stores.length) {
      return [];
    }

    return stores.map((store: IShop) => {
      return [store.shopReference, store.accessToken, getStatusBadge(store.status), getActionButtons(store)];
    });
  };

  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12} className="buttons-control">
        {isCreateModalOpen && <CreateStoreModal isOpen={isCreateModalOpen} onClose={handleCloseModal} />}
        {isUpdateModalOpen && <UpdateStoreModal isOpen={isUpdateModalOpen} onClose={handleCloseModal} storeData={selectedStore as IShop} />}
        <ConfirmModal {...removeConfirmationModal} isOpen={isRemovePopupOpen} onAccept={handleDeleteItem} />
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
