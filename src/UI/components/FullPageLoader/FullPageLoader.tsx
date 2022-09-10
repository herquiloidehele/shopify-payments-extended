import { CircularProgress } from "@mui/material";
import React from "react";

import { PageWrapper } from "./Style";

interface IFullPageLoaderProps {
  loadingMessage?: string;
}
const FullPageLoader: React.FC<IFullPageLoaderProps> = ({ loadingMessage }) => {
  return (
    <PageWrapper>
      <CircularProgress />
      {loadingMessage && <p>{loadingMessage}</p>}
    </PageWrapper>
  );
};

FullPageLoader.defaultProps = {
  loadingMessage: undefined,
};

export default FullPageLoader;
