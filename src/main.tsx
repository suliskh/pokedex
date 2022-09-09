import React from "react";
import ReactDOM from "react-dom/client";

import MUIThemeProvider from "./providers/MUIThemeProvider";
import MainPage from "./MainPage";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MUIThemeProvider>
      <MainPage />
    </MUIThemeProvider>
  </React.StrictMode>
);
