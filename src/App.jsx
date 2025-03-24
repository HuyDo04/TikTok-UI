import { useState } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import routes from "./routes";
import DefaultLayout from "./component/layouts/DefaultLayout";
import AppRoutes from "./component/AppRoutes";

function App() {
  return <AppRoutes />;
}

export default App;
