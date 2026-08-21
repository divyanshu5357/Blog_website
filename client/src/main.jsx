import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PublicUserProvider } from "./context/PublicUserContext";
import App from "./App";
import "./styles/styles.css";
import "./i18n";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PublicUserProvider>
        <App />
      </PublicUserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

