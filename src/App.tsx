import { ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider as TyledThemeProvider } from "styled-components";

import queryClient from "./Api/Services/ReactQueryClient";
import GlobalStyles from "./UI/styles/global";
import MuiTheme from "./UI/styles/themes/custom-ui-lib";
import LightTheme from "./UI/styles/themes/light";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={MuiTheme}>
        <TyledThemeProvider theme={LightTheme}>
          <GlobalStyles />
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </TyledThemeProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
