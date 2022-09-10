import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import AuthService from "../Api/Services/AuthService";
import FullPageLoader from "../UI/components/FullPageLoader/FullPageLoader";
import { APP_ROUTES } from "../Utils/constants/Routes";

const PublicRoute: React.FC = function () {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthService.validateSession().finally(() => {
      setLoading(false);
    });
  }, []);

  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || APP_ROUTES.PRIVATE.DASHBOARD;

  return loading ? <FullPageLoader /> : !AuthService.isUserAuthenticated() ? <Outlet /> : <Navigate to={from} replace />;
};

export default PublicRoute;
