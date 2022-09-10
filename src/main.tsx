import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DetailPage from "./DetailPage";
import HomePage from "./HomePage";
import GraphQLProvider from "./providers/GraphQLProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <GraphQLProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pokemon" element={<HomePage />} />
            <Route path="/pokemon/:name" element={<DetailPage />} />
          </Routes>
        </BrowserRouter>
      </GraphQLProvider>
    </ChakraProvider>
  </React.StrictMode>
);
