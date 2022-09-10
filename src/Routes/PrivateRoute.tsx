import { Outlet } from "react-router-dom";

import AuthService from "../Api/Services/AuthService";
import AutoLogin from "./AutoLogin";

const ProtectedRoute: React.FC = function () {
  return AuthService.isUserAuthenticated() ? <Outlet /> : <AutoLogin />;
};

export default ProtectedRoute;
