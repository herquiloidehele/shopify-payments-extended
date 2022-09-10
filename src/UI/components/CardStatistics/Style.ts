import styled from "styled-components";

import { pixel2Rem } from "../../../Utils/functions/Ui";
import { CustomCard } from "../Generic/CustomCard/Style";

export const StatisticCardWrapper = styled(CustomCard)`
  display: flex;
  padding-left: 0 !important;
  padding-right: 0 !important;
  padding-bottom: 0 !important;
  flex-direction: column;
  height: 100%;

  h1 {
    color: ${({ theme }) => theme.colors.text_on_surface};
    font-weight: bold;
    font-size: ${pixel2Rem(30)};
  }

  p {
    color: ${({ theme }) => theme.colors.light_text};
    font-size: 1.1rem;
    opacity: 0.7;
  }

  .heading {
    padding: 0 ${pixel2Rem(30)};
    display: flex;
    flex-direction: column;
    gap: ${pixel2Rem(10)};
  }
`;
