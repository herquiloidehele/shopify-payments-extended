import { HomeOutlined, PaymentOutlined, SettingsOutlined } from "@mui/icons-material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { APP_ROUTES } from "../../../Utils/constants/Routes";

export const MenuItems = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return [
    {
      key: APP_ROUTES.PRIVATE.DASHBOARD,
      title: t("pages.home.menu.home"),
      icon: <HomeOutlined />,
      onClick: () => {
        navigate(APP_ROUTES.PRIVATE.DASHBOARD);
      },
    },
    {
      key: APP_ROUTES.PRIVATE.PAYMENTS,
      title: t("pages.home.menu.payments"),
      icon: <PaymentOutlined />,
      onClick: () => {
        navigate(APP_ROUTES.PRIVATE.PAYMENTS);
      },
    },
    {
      key: APP_ROUTES.PRIVATE.MPESA,
      title: t("pages.home.menu.mpesa-config"),
      icon: <SettingsOutlined />,
      onClick: () => {
        navigate(APP_ROUTES.PRIVATE.MPESA);
      },
    },
    {
      key: APP_ROUTES.PRIVATE.BIM,
      title: t("pages.home.menu.bim-config"),
      icon: <SettingsOutlined />,
      onClick: () => {
        navigate(APP_ROUTES.PRIVATE.BIM);
      },
    },
    {
      key: APP_ROUTES.PRIVATE.PONTO24,
      title: t("pages.home.menu.ponto-24-config"),
      icon: <SettingsOutlined />,
      onClick: () => {
        navigate(APP_ROUTES.PRIVATE.PONTO24);
      },
    },
  ];
};
