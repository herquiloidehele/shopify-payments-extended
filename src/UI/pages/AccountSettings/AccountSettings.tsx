import { LoadingButton } from "@mui/lab";
import { Avatar, Chip, Grid, MenuItem, Select, SelectChangeEvent, Snackbar } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useTranslation } from "react-i18next";
import useWindowSize from "react-use/lib/useWindowSize";

import AuthService from "../../../Api/Services/AuthService";
import PackageManager from "../../../Managers/PackageManager";
import SubscriptionManager from "../../../Managers/SubscriptionManager";
import { INewSubscription, ISubscription, IUser } from "../../../models";
import { Constants } from "../../../Utils/constants/Constants";
import { formatCurrency, getPackageName } from "../../../Utils/functions/Ui";
import AvatarFallback from "../../assets/img/avatar-fallback.png";
import CustomCardComponent from "../../components/Generic/CustomCard/CustomCard";
import TableWrapper from "../../components/Tables/TableWrapper";
import { InputInfo, SubscriptionForm, SubscriptionInfo, UserInfo } from "./styles";

const AccountSettings: React.FC = () => {
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState<IUser>();
  const [subscription, setSubscription] = React.useState<INewSubscription>({} as INewSubscription);
  const [showPopup, setShowPopup] = React.useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  const { data, refetch: refetchSubscriptions } = useQuery({ queryKey: ["subscriptions", userInfo?.storeId], queryFn: () => SubscriptionManager.getSubscriptionByStoreId(userInfo?.storeId) });
  const { data: packages } = useQuery({ queryKey: ["packages"], queryFn: () => PackageManager.getPackages() });
  const { data: currentSubscription, refetch: refetchCurrentSubscription } = useQuery({
    queryKey: ["currentSubscription", userInfo?.storeId],
    queryFn: () => SubscriptionManager.fetchCurrentSubscription(userInfo?.storeId),
  });

  const showConfettiAnimation = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  useEffect(() => {
    if (AuthService.getAuthUser) {
      setUserInfo(AuthService.getAuthUser);
      setSubscription({ shopId: AuthService.getAuthUser.storeId, packageId: "" });
    }
  }, [AuthService.getAuthUser]);

  const { mutate: createSubscriptionMutation, isPending: saveLoading } = useMutation({
    mutationKey: ["createSubscriptions"],
    mutationFn: (data: INewSubscription) => SubscriptionManager.createUserSubscription(data.shopId, data.packageId),
    onSuccess: () => {
      showConfettiAnimation();
      setToastMessage(t("pages.settings.subscriptions.successMessage"));
      setShowPopup(true);
      refetchSubscriptions();
      refetchCurrentSubscription();
      setSubscription({ ...subscription, packageId: "" });
    },
    onError: () => {
      setToastMessage(t("pages.settings.subscriptions.errorMessage"));
      setShowPopup(true);
    },
  });

  const handleFieldChange = (event: SelectChangeEvent) => {
    setSubscription({ ...subscription, [event.target.name]: event.target.value });
  };

  const getSubscriptionStatus = (isActive: boolean) => {
    if (isActive) {
      return <Chip label={t("generics.status.active")} color="primary" />;
    }

    return <Chip label={t("generics.status.inactive")} color="error" />;
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
      ];
    });
  };

  const tableColumnsWrapper = [
    t("pages.subscriptions.table.store"),
    t("pages.subscriptions.table.packageName"),
    t("pages.subscriptions.table.duration"),
    t("pages.subscriptions.table.createdAt"),
    t("pages.subscriptions.table.validUntil"),
  ];

  return (
    <Grid container>
      <Grid container rowSpacing={3} columnSpacing={5}>
        {AuthService.isStoreOwner && (
          <Grid item xs={7}>
            <CustomCardComponent title={t("pages.settings.subscriptions.title")}>
              <InputInfo>{t("pages.settings.subscriptions.form.label")}</InputInfo>
              <Grid container columnSpacing={4}>
                <Grid item xs={7}>
                  <SubscriptionForm fullWidth>
                    {packages && (
                      <Select
                        labelId="role-labelId"
                        id="packages-list"
                        name="packageId"
                        title={t("pages.subscriptions.package")}
                        value={subscription.packageId}
                        onChange={handleFieldChange}
                        disabled={saveLoading}
                      >
                        {packages.map((packageItem) => (
                          <MenuItem value={packageItem.id}>
                            {packageItem.name} / {packageItem.monthsDuration} Mês - {formatCurrency(packageItem.price)}
                          </MenuItem>
                        ))}
                      </Select>
                    )}

                    <LoadingButton
                      loading={saveLoading}
                      className="save-button"
                      variant="contained"
                      color="primary"
                      disabled={!subscription.packageId}
                      disableElevation
                      onClick={() => createSubscriptionMutation(subscription)}
                    >
                      {currentSubscription?.isActive ? t("pages.settings.subscriptions.form.extendSubscription") : t("pages.settings.subscriptions.form.activateSubscription")}
                    </LoadingButton>
                  </SubscriptionForm>
                </Grid>

                <Grid item xs={5}>
                  {currentSubscription && (
                    <SubscriptionInfo>
                      <span className="title">{t("pages.settings.subscriptions.subscriptionInfo.title")}</span>
                      <div className="status">
                        <p>{t("pages.settings.subscriptions.subscriptionInfo.status")}: </p>
                        {getSubscriptionStatus(currentSubscription.isActive)}
                      </div>
                      {currentSubscription.validUntil && currentSubscription.isActive && (
                        <div className="expire">
                          <p>{t("pages.settings.subscriptions.subscriptionInfo.validUntil")}: </p>
                          <span>{currentSubscription.validUntil.format(Constants.DATE_FORMATS.DATE_TIME)}</span>
                        </div>
                      )}
                    </SubscriptionInfo>
                  )}
                </Grid>
              </Grid>
            </CustomCardComponent>
          </Grid>
        )}

        <Grid item xs={5}>
          <CustomCardComponent title={t("pages.settings.profile.title")}>
            {userInfo && (
              <UserInfo>
                <Avatar className="avatar-icon" alt="Remy Sharp" src={AvatarFallback} />
                <span className="name">{userInfo.name}</span>
                <span className="email">{userInfo.email}</span>
                <span className="store">{userInfo.storeId}</span>
                <Chip label={userInfo.status ? t("generics.status.active") : t("generics.status.inactive")} color={userInfo.status ? "primary" : "error"} />
              </UserInfo>
            )}
          </CustomCardComponent>
        </Grid>

        {data && data.length > 0 && (
          <Grid item xs={12} style={{ height: "100%" }}>
            <CustomCardComponent title={t("pages.settings.subscriptions.subscriptionHistory")}>
              {data && <TableWrapper columns={tableColumnsWrapper} rows={createSubscriptionsTableRows(data)} />}
            </CustomCardComponent>
          </Grid>
        )}
      </Grid>
      <Snackbar open={showPopup} autoHideDuration={6000} message={toastMessage} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} />

      {showConfetti && <Confetti width={width} height={height} />}
    </Grid>
  );
};

export default AccountSettings;
