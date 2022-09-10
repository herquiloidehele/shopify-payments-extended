import styled from "styled-components";

import { pixel2Rem } from "../../../Utils/functions/Ui";

export const ButtonsControl = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: ${pixel2Rem(20)};

  .save-button {
    color: white;
  }
`;
