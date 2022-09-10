import styled from "styled-components";

import { pixel2Rem } from "../../../Utils/functions/Ui";

export const LoginWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginCard = styled.div`
  max-width: ${pixel2Rem(900)};
  width: 80%;
  background-color: white;
  min-height: ${pixel2Rem(500)};
  border-radius: ${({ theme }) => `${theme.border_radius}px`};
  display: flex;
  box-shadow: ${({ theme }) => theme.box_shadows.cardx};

  @media (${({ theme }) => theme.breakpoints.medium}) {
    width: 90%;
  }
`;

export const LeftSide = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  width: 47%;
  padding: ${pixel2Rem(20)} ${pixel2Rem(40)};
  border-radius: ${({ theme }) => `${theme.border_radius}px`};
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    display: block;
    height: ${pixel2Rem(50)};
    margin-left: auto;
    margin-right: auto;
  }

  p {
    margin-top: ${pixel2Rem(20)};
    max-width: ${pixel2Rem(340)};
    text-align: center;
    color: white;
    line-height: 1.3;
    margin-left: auto;
    margin-right: auto;
    word-break: keep-all;
  }

  @media (${({ theme }) => theme.breakpoints.medium}) {
    display: none;
  }
`;

export const RightSide = styled.div`
  background-color: white;
  width: 53%;
  padding: ${pixel2Rem(20)} ${pixel2Rem(50)};
  border-radius: ${({ theme }) => `${theme.border_radius}px`};
  display: flex;
  align-items: center;

  @media (${({ theme }) => theme.breakpoints.medium}) {
    width: 100%;
    padding: ${pixel2Rem(30)};
    justify-content: center;
  }
`;

export const HeadingContainer = styled.div`
  h1 {
    font-size: ${pixel2Rem(25)};
    font-weight: bold;
  }
`;

export const LoginForm = styled.div`
  margin-top: ${pixel2Rem(20)};

  .email-input,
  .password-input {
    width: 100%;
    margin-top: ${pixel2Rem(10)};
  }

  .reset-password-link {
    margin-top: ${pixel2Rem(10)};
    a {
      color: ${({ theme }) => theme.colors.text_on_surface};
    }
  }

  .error-section {
    margin-top: ${pixel2Rem(15)};
  }

  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: ${pixel2Rem(40)};

    .login-button {
      padding: ${pixel2Rem(8)} ${pixel2Rem(50)};
      color: white;
    }
  }
`;
