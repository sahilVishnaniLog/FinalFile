import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route } from "react-router";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import BrowserRouter from "./routingP/BrowserRouter.jsx";
import "./index.css";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {" "}
      {/* Enttry point of the application here */}
      <CssBaseline />
      <App />
    </BrowserRouter>
  </StrictMode>
);
