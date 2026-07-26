import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./styles/styles.css";
import "./i18n";

import { PublicUserProvider } from "./context/PublicUserContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <PublicUserProvider>
      <Toaster position="top-right" />

      <App />
    </PublicUserProvider>
  </BrowserRouter>
);