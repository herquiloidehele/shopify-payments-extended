import { LoadingButton } from "@mui/lab";
import { Avatar, Chip, Grid, MenuItem, Select, SelectChangeEvent, Snackbar } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import AuthService from "../../../Api/Services/AuthService";
import SubscriptionService from "../../../Api/Services/SubscriptionService";
import PackageManager from "../../../Managers/PackageManager";
import SubscriptionManager from "../../../Managers/SubscriptionManager";
import { INewSubscription, IUser } from "../../../models";
import { Constants } from "../../../Utils/constants/Constants";
import { formatCurrency } from "../../../Utils/functions/Ui";
import AvatarFallback from "../../assets/img/avatar-fallback.png";
import CustomCardComponent from "../../components/Generic/CustomCard/CustomCard";
import { InputInfo, SubscriptionForm, SubscriptionInfo, UserInfo } from "./styles";

const AccountSettings: React.FC = () => {
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState<IUser>();
  const [subscription, setSubscription] = React.useState<INewSubscription>({} as INewSubscription);
  const [showPopup, setShowPopup] = React.useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { data } = useQuery({ queryKey: ["subscriptions"], queryFn: () => SubscriptionService.fetchAllSubscription() });
  const { data: packages } = useQuery({ queryKey: ["packages"], queryFn: () => PackageManager.getPackages() });

  const { data: currentSubscription } = useQuery({ queryKey: ["currentSubscription", userInfo?.storeId], queryFn: () => SubscriptionManager.fetchCurrentSubscription(userInfo?.storeId) });

  useEffect(() => {
    if (AuthService.getAuthUser) {
      setUserInfo(AuthService.getAuthUser);
      setSubscription({ shopId: AuthService.getAuthUser.storeId, packageId: "" });
    }
  }, [AuthService.getAuthUser]);

  const { mutate: createSubscriptionMutation, isPending: saveLoading } = useMutation({
    mutationKey: ["createSubscriptions"],
    mutationFn: (data: INewSubscription) => {
      // SubscriptionManager.createSubscription(data)

      return Promise.resolve();
    },
    onSuccess: () => {
      setToastMessage(t("pages.settings.subscriptions.successMessage"));
      setShowPopup(true);
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

  return (
    <Grid container>
      <Grid container columnSpacing={5}>
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

                  <LoadingButton loading={saveLoading} className="save-button" variant="contained" color="primary" disableElevation onClick={() => createSubscriptionMutation(subscription)}>
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

        <Snackbar open={showPopup} autoHideDuration={6000} message={toastMessage} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} />
      </Grid>
    </Grid>
  );
};

export default AccountSettings;
