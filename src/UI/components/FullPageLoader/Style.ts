import styled from "styled-components";

import { pixel2Rem } from "../../../Utils/functions/Ui";

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  gap: ${pixel2Rem(10)};

  p {
    display: none;
  }
`;
