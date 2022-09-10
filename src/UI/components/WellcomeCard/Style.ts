import styled from "styled-components";

import { pixel2Rem } from "../../../Utils/functions/Ui";
import { CustomCard } from "../Generic/CustomCard/Style";

export const WellcomeCardWrapper = styled(CustomCard)`
  background-color: ${({ theme }) => theme.colors.primary} !important;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 50px !important;
  padding-bottom: 50px !important;
  position: relative;
  height: 100%;

  h1,
  p {
    color: white;
    text-align: center;
  }

  h1 {
    margin-top: ${pixel2Rem(20)};
    font-weight: bolder;
  }

  p {
    margin-top: ${pixel2Rem(10)};
    font-size: ${pixel2Rem(18)};
  }

  .left-image {
    position: absolute;
    top: 0;
    left: 0;
  }

  .right-image {
    position: absolute;
    top: 0;
    right: 0;
  }
`;
