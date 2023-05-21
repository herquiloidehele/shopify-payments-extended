import { Navigate, Route, Routes } from "react-router-dom";

import App from "../App";
import AccountSettings from "../UI/pages/AccountSettings/AccountSettings";
import Dashboard from "../UI/pages/Dashboard/Dashboard";
import Home from "../UI/pages/Home/Home";
import Login from "../UI/pages/Login/Login";
import MpesaConfigPage from "../UI/pages/MpesaConfig/MpesaConfigPage";
import PaymentsPage from "../UI/pages/Payments/PaymentsPage";
import Stores from "../UI/pages/Stores/Stores";
import Users from "../UI/pages/Users/Users";
import { APP_ROUTES } from "../Utils/constants/Routes";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoutes";

export default function RoutesWrapper() {
  return (
    <Routes>
      <Route path={APP_ROUTES.PUBLIC.ROOT} element={<App />}>
        <Route index element={<Navigate to={APP_ROUTES.PUBLIC.LOGIN} />} />
        <Route element={<PublicRoute />}>
          <Route path={APP_ROUTES.PUBLIC.LOGIN} element={<Login />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path={APP_ROUTES.PRIVATE.DASHBOARD} element={<Dashboard />}>
            <Route index element={<Navigate to={APP_ROUTES.PRIVATE.HOME} />} />
            <Route path={APP_ROUTES.PRIVATE.HOME} element={<Home />} />
            <Route path={APP_ROUTES.PRIVATE.PAYMENTS} element={<PaymentsPage />} />
            <Route path={APP_ROUTES.PRIVATE.SETTINGS} element={<AccountSettings />} />
            <Route path={APP_ROUTES.PRIVATE.USERS} element={<Users />} />
            <Route path={APP_ROUTES.PRIVATE.STORES} element={<Stores />} />
            <Route path={APP_ROUTES.PRIVATE.MPESA} element={<MpesaConfigPage />} />
            <Route path={APP_ROUTES.PRIVATE.BIM} element={<h1>Configurações BIM</h1>} />
            <Route path={APP_ROUTES.PRIVATE.PONTO24} element={<h1>Configurações Ponto 24</h1>} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={APP_ROUTES.PUBLIC.LOGIN} />} />
    </Routes>
  );
}
