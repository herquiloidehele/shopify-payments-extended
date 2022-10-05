import styled from "styled-components";

import { pixel2Rem } from "../../../Utils/functions/Ui";

export const DashboardPageWrapper = styled.div`
  display: flex;
`;

export const PageContainerWrapper = styled.div`
  padding-left: ${pixel2Rem(90)};
  width: 100%;
  overflow: scroll;
`;

export const PageContent = styled.div`
  padding: 10px 55px;
  height: 100%;
`;
