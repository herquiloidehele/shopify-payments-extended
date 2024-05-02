import { Delete } from "@mui/icons-material";
import { Button, Grid, IconButton } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { useTranslation } from "react-i18next";

import SubscriptionManager from "../../../Managers/SubscriptionManager";
import { IPackage, ISubscription } from "../../../models";
import { Constants } from "../../../Utils/constants/Constants";
import { formatCurrency } from "../../../Utils/functions/Ui";
import CustomCardComponent from "../../components/Generic/CustomCard/CustomCard";
import ConfirmModal from "../../components/Modals/ConfirmModal";
import TableWrapper from "../../components/Tables/TableWrapper";
import { ButtonsControl } from "../MpesaConfig/Style";
import CreateSubscriptionModal from "./CreateSubscriptionModal";

function SubscriptionsPage() {
  const { t } = useTranslation();

  const { data, refetch } = useQuery({ queryKey: ["subscriptions"], queryFn: () => SubscriptionManager.getSubscriptions() });
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [isRemovePoupOpen, setIsRemovePoupOpen] = React.useState(false);
  const [removeConfirmationModal, setRemoveConfirmationModal] = React.useState<any>({});
  const [selectedSubscriptionId, setSelectedSubscriptionId] = React.useState<string>("");

  const { mutate: deleteSubscriptionMutation } = useMutation({
    mutationKey: ["deleteSubscription"],
    mutationFn: (subscriptionId: string) => SubscriptionManager.deleteSubscription(subscriptionId),
    onSuccess: () => {
      setIsRemovePoupOpen(false);
      refetch();
    },
    onError: () => () => {
      setIsRemovePoupOpen(false);
    },
  });

  const handleDeleteItem = (subscriptionId: string) => {
    deleteSubscriptionMutation(subscriptionId);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    refetch();
  };

  const openCreateSubscriptionModal = () => {
    setIsCreateModalOpen(true);
    refetch();
  };

  const getPackageName = (packageItem: Partial<IPackage>) => {
    if (!packageItem) {
      return "--";
    }

    return `${packageItem.name} - ${formatCurrency(packageItem.price)}`;
  };

  const openRemoveConfirmationModal = (subscription: ISubscription) => {
    if (subscription.id) {
      setSelectedSubscriptionId(subscription.id);
      setRemoveConfirmationModal({
        title: t("pages.subscriptions.removeModal.title"),
        message: t("pages.subscriptions.removeModal.message"),
        isOpen: false,
      });
      setIsRemovePoupOpen(true);
    }
  };

  const getActionButtons = (subscription: ISubscription) => {
    return (
      <div>
        <IconButton aria-label="delete" onClick={() => openRemoveConfirmationModal(subscription)}>
          <Delete />
        </IconButton>
      </div>
    );
  };

  const createSubscriptionsTableRows = (subscriptions: ISubscription[]) => {
    if (!subscriptions.length) {
      return [];
    }

    return subscriptions.map((subscription: ISubscription) => {
      return [
        subscription.shop.shopReference,
        getPackageName(subscription.package),
        `${subscription.package.monthsDuration} / Mês`,
        subscription.created_at.format(Constants.DATE_FORMATS.DATE),
        subscription.validUntil.format(Constants.DATE_FORMATS.DATE),
        getActionButtons(subscription),
      ];
    });
  };

  const tableColumnsWrapper = [
    t("pages.subscriptions.table.store"),
    t("pages.subscriptions.table.packageName"),
    t("pages.subscriptions.table.duration"),
    t("pages.subscriptions.table.createdAt"),
    t("pages.subscriptions.table.validUntil"),
    t("pages.subscriptions.table.actions"),
  ];

  return (
    <div>
      <Grid container rowSpacing={3}>
        <Grid item xs={12} className="buttons-control">
          {isCreateModalOpen && <CreateSubscriptionModal isOpen={isCreateModalOpen} onClose={handleCloseModal} />}
          <ConfirmModal {...removeConfirmationModal} isOpen={isRemovePoupOpen} onAccept={() => handleDeleteItem(selectedSubscriptionId)} onClose={() => setIsRemovePoupOpen(false)} />
          <ButtonsControl>
            <Button className="save-button" variant="contained" color="primary" disableElevation onClick={() => openCreateSubscriptionModal()}>
              {t("generics.buttons.new")}
            </Button>
          </ButtonsControl>
        </Grid>
        <Grid item xs={12} style={{ height: "100%" }}>
          <CustomCardComponent title={t("pages.subscriptions.title")}>{data && <TableWrapper columns={tableColumnsWrapper} rows={createSubscriptionsTableRows(data)} />}</CustomCardComponent>
        </Grid>
      </Grid>
    </div>
  );
}

export default SubscriptionsPage;
