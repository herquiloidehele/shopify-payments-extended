import { Avatar } from "@mui/material";
import React from "react";
import styled from "styled-components";

import { pixel2Rem } from "../../../Utils/functions/Ui";

const AvatarWithNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${pixel2Rem(10)};

  .MuiAvatar-root.MuiAvatar-circular {
    width: ${pixel2Rem(30)} !important;
    height: ${pixel2Rem(30)} !important;
  }

  span {
    font-size: ${pixel2Rem(14)};
    ${({ theme }) => theme.colors.light_text};
  }
`;

const AvatarWithName: React.FC<{ name: string; image: string }> = ({ name, image }) => {
  return (
    <AvatarWithNameWrapper>
      <Avatar alt={name} src={image} /> <span>{name}</span>
    </AvatarWithNameWrapper>
  );
};

export default AvatarWithName;
