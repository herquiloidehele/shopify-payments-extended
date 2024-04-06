import { Input } from "@mui/material";
import styled from "styled-components";

import { pixel2Rem } from "../../../Utils/functions/Ui";

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: ${pixel2Rem(20)} ${pixel2Rem(40)};
  margin-bottom: ${pixel2Rem(30)};
  width: 96%;
  box-shadow: ${(props) => props.theme.box_shadows.header};
  position: fixed;
  z-index: 100;

  .menu-icon,
  .notification-icon {
    cursor: pointer;
    width: ${pixel2Rem(35)};
    height: auto;
    color: ${(props) => props.theme.colors.secundary};
  }
`;

export const AvatarNotificationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .badge-icon .MuiBadge-badge {
    color: white;
    width: ${pixel2Rem(25)};
    height: ${pixel2Rem(25)};
    border-radius: 100%;
    border: 2px solid white;
  }
`;

export const InputSearch = styled(Input)`
  border-radius: ${(props) => props.theme.border_radius} !important;
  text-align: center;
  width: 50%;
  border: none;

  &::before,
  &::after {
    border-bottom: none !important;
  }

  input {
    background-color: ${(props) => props.theme.colors.input_background};
    height: ${pixel2Rem(40)};
    border-radius: ${(props) => `${props.theme.border_radius}px`} !important;
    text-align: center;
    font-size: ${pixel2Rem(20)};
    font-weight: normal;
    padding: ${pixel2Rem(7)} ${pixel2Rem(20)};
  }
`;
