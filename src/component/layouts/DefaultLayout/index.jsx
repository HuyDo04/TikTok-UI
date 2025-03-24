import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function DefaultLayout() {
  return (
    <>
      <Header />
      <h1>DefaultLayout</h1>
      <Outlet />
      <Footer />
    </>
  );
}

export default DefaultLayout;
