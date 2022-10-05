import { LoadingButton } from "@mui/lab";
import { Alert, TextField } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ReactComponent as FullLogo } from "../../assets/img/logo-large.svg";
import { LoginCard, LoginWrapper, LeftSide, RightSide, HeadingContainer, LoginForm } from "./Style";
import useLogin from "./useLogin";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const { loginErrorMsg, setUserId, submitting, handleSubmit, setPassword } = useLogin();

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
                <TextField className="email-input" id="domain" type="text" label={t("pages.login.domain")} variant="standard" onChange={(event) => setUserId(event.target.value)} />
              </div>
              <div>
                <TextField className="password-input" id="password" type="password" label={t("pages.login.password")} variant="standard" onChange={(event) => setPassword(event.target.value)} />
              </div>
              <div className="reset-password-link">
                <Link to="/">{t("pages.login.forgotPassword")} </Link>
              </div>

              {loginErrorMsg ? (
                <div className="error-section">
                  <Alert severity="error">{loginErrorMsg}</Alert>
                </div>
              ) : null}

              <div className="button-container">
                <LoadingButton className="login-button" loading={submitting} variant="contained" color="primary" disabled={submitting} disableElevation onClick={(event) => handleSubmit(event)}>
                  {t("pages.login.login")}
                </LoadingButton>
              </div>
            </LoginForm>
          </div>
        </RightSide>
      </LoginCard>
    </LoginWrapper>
  );
};

export default Login;
