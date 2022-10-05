import { HomeOutlined, ManageAccountsOutlined, PaymentOutlined, PeopleOutlineOutlined, SettingsOutlined } from "@mui/icons-material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { USER_ROLES } from "../../../models";
import { APP_ROUTES } from "../../../Utils/constants/Routes";

export const useMenuItems = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: APP_ROUTES.PRIVATE.DASHBOARD,
      title: t("pages.home.menu.home"),
      permissions: [USER_ROLES.ADMIN, USER_ROLES.STORE_OWNER],
      icon: <HomeOutlined />,
      onClick: () => {
        navigate(APP_ROUTES.PRIVATE.DASHBOARD);
      },
    },
    {
      key: APP_ROUTES.PRIVATE.PAYMENTS,
      title: t("pages.home.menu.payments"),
      permissions: [USER_ROLES.ADMIN, USER_ROLES.STORE_OWNER],
      icon: <PaymentOutlined />,
      onClick: () => {
        navigate(APP_ROUTES.PRIVATE.PAYMENTS);
      },
    },
    {
      key: APP_ROUTES.PRIVATE.USERS,
      title: t("pages.home.menu.users"),
      permissions: [USER_ROLES.ADMIN],
      icon: <PeopleOutlineOutlined />,
      onClick: () => {
        navigate(APP_ROUTES.PRIVATE.USERS);
      },
    },
    {
      key: APP_ROUTES.PRIVATE.MPESA,
      title: t("pages.home.menu.mpesa-config"),
      permissions: [USER_ROLES.STORE_OWNER],
      icon: <SettingsOutlined />,
      onClick: () => {
        navigate(APP_ROUTES.PRIVATE.MPESA);
      },
    },
    {
      key: APP_ROUTES.PRIVATE.SETTINGS,
      title: t("pages.home.menu.settings"),
      permissions: [USER_ROLES.STORE_OWNER, USER_ROLES.ADMIN],
      icon: <ManageAccountsOutlined />,
      onClick: () => {
        navigate(APP_ROUTES.PRIVATE.SETTINGS);
      },
    },
  ];

  const getMenuItemsByRole = (userRole: USER_ROLES) => {
    return menuItems.filter((menuItem) => menuItem.permissions.includes(userRole));
  };

  return { getMenuItemsByRole };
};
