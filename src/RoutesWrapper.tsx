import { Navigate, Route, Routes } from "react-router-dom";

import App from "./App";
import Dashboard from "./UI/pages/Dashboard/Dashboard";
import Home from "./UI/pages/Home/Home";
import Login from "./UI/pages/Login/Login";
import { APP_ROUTES } from "./Utils/constants/Routes";

export default function RoutesWrapper() {
  return (
    <Routes>
      <Route path={APP_ROUTES.PUBLIC.ROOT} element={<App />}>
        <Route path={APP_ROUTES.PUBLIC.LOGIN} element={<Login />} />

        <Route path={APP_ROUTES.PRIVATE.DASHBOARD} element={<Dashboard />}>
          <Route index element={<Navigate to={APP_ROUTES.PRIVATE.HOME} />} />
          <Route path={APP_ROUTES.PRIVATE.HOME} element={<Home />} />
          <Route path={APP_ROUTES.PRIVATE.PAYMENTS} element={<h1>Pagamentos</h1>} />
          <Route path={APP_ROUTES.PRIVATE.MPESA} element={<h1>Mpesa </h1>} />
          <Route path={APP_ROUTES.PRIVATE.BIM} element={<h1>Configurações BIM</h1>} />
          <Route path={APP_ROUTES.PRIVATE.PONTO24} element={<h1>Configurações Ponto 24</h1>} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={APP_ROUTES.PUBLIC.LOGIN} />} />
    </Routes>
  );
}
