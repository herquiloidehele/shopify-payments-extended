import styled from "styled-components";

import { pixel2Rem } from "../../../Utils/functions/Ui";

export const DashboardPageWrapper = styled.div`
  display: flex;
  overflow: hidden;
`;

export const PageContainerWrapper = styled.div`
  padding-left: ${pixel2Rem(90)};
  width: 100%;
  overflow: hidden;
`;

export const PageContent = styled.div`
  padding: 10px 55px;
  height: 100%;
  overflow: hidden;
  padding-top: ${pixel2Rem(124)};
`;
