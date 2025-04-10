import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContext, { UserProvider } from "./context/UserContext";
import { LoadingProvider } from "./context/LoadingContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LoadingProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </LoadingProvider>
  </BrowserRouter>
);
