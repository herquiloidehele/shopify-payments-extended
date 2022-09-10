import { Button, TextField } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { APP_ROUTES } from "../../../Utils/constants/Routes";
import { ReactComponent as FullLogo } from "../../assets/img/logo-large.svg";
import { LoginCard, LoginWrapper, LeftSide, RightSide, HeadingContainer, LoginForm } from "./Style";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <LoginWrapper>
      <LoginCard>
        <LeftSide>
          <div className="heading-side">
            <FullLogo />
            <p>{t("pages.login.wellcomeMessage")}</p>
          </div>
        </LeftSide>

        <RightSide>
          <div>
            <HeadingContainer>
              <h1>{t("pages.login.title")}</h1>
              <p>{t("pages.login.subtitle")}</p>
            </HeadingContainer>

            <LoginForm>
              <div>
                <TextField className="email-input" id="domain" type="text" label={t("pages.login.domain")} variant="standard" />
              </div>
              <div>
                <TextField className="password-input" id="password" type="password" label={t("pages.login.password")} variant="standard" />
              </div>
              <div className="reset-password-link">
                <Link to="/">{t("pages.login.forgotPassword")} </Link>
              </div>
              <div className="button-container">
                <Button className="login-button" variant="contained" color="primary" disableElevation onClick={() => navigate(APP_ROUTES.PRIVATE.DASHBOARD)}>
                  {t("pages.login.login")}
                </Button>
              </div>
            </LoginForm>
          </div>
        </RightSide>
      </LoginCard>
    </LoginWrapper>
  );
};

export default Login;
