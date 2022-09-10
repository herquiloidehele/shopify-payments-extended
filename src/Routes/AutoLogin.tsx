import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import AuthService from "../Api/Services/AuthService";
import FullPageLoader from "../UI/components/FullPageLoader/FullPageLoader";
import { APP_ROUTES } from "../Utils/constants/Routes";

const AutoLogin: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.validateSession().then(
      () => {
        setLoading(false);
      },
      () => {
        navigate(APP_ROUTES.PUBLIC.LOGIN);
      }
    );
  }, []);

  return loading ? (
    <div className="upg-login__auto-login-container">
      <FullPageLoader loadingMessage={t("generics.loadingMessage", { entity: "Utilizador" })} />
    </div>
  ) : AuthService.isUserAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to={APP_ROUTES.PUBLIC.LOGIN} replace />
  );
};

export default AutoLogin;
