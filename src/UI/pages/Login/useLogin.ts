import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import AuthService from "../../../Api/Services/AuthService";
import { Constants } from "../../../Utils/constants/Constants";
import { APP_ROUTES } from "../../../Utils/constants/Routes";

const useLogin = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [shopName, setShopName] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState("");

  const handleSubmit = useCallback(
    (event: any) => {
      event.preventDefault();

      setLoginErrorMsg("");

      if (submitting) {
        return;
      }

      if (!String(shopName).trim() || !password) {
        setLoginErrorMsg(t("pages.login.errors.mandatoryFields"));
        return;
      }

      setSubmitting(true);

      AuthService.login(shopName, password).then(
        () => {
          setSubmitting(false);
          navigate(APP_ROUTES.PRIVATE.DASHBOARD);
        },

        (errorCode) => {
          setSubmitting(false);

          switch (errorCode) {
            case Constants.errors.auth.INVALID_CREDENTIALS:
              setLoginErrorMsg(t("pages.login.errors.authenticationFailed"));
              break;
            default:
              setLoginErrorMsg(t("pages.login.errors.unexpectedError"));
              break;
          }
        }
      );
    },
    [navigate, shopName, password]
  );

  return {
    setShopName,
    setPassword,
    loginErrorMsg,
    handleSubmit,
    submitting,
  };
};

export default useLogin;
