import { Card } from "@mui/material";
import styled from "styled-components";

import { pixel2Rem } from "../../../../Utils/functions/Ui";

export const CustomCard = styled(Card)`
  padding: 25px 30px !important;
  border-radius: ${({ theme }) => `${theme.border_radius}px`} !important;
  box-shadow: ${({ theme }) => theme.box_shadows.card} !important;
  background-color: white !important;
  display: flex;
  flex-direction: column;
  gap: ${pixel2Rem(15)};
  height: 100%;

  .card-heading {
    color: ${({ theme }) => theme.colors.text_on_surface};
    font-size: ${pixel2Rem(20)};
    font-weight: 700;
  }
`;
