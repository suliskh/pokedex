import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DetailPage from "./DetailPage";
import HomePage from "./HomePage";
import GraphQLProvider from "./providers/GraphQLProvider";
import StyleProvider from "./providers/StyleProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StyleProvider>
      <GraphQLProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pokemon" element={<HomePage />} />
            <Route path="/pokemon/:name" element={<DetailPage />} />
          </Routes>
        </BrowserRouter>
      </GraphQLProvider>
    </StyleProvider>
  </React.StrictMode>
);
