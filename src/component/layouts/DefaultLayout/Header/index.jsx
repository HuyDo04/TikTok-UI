import { NavLink } from "react-router-dom";
import Navigation from "./Navigation";
import HandleLogout from "./HandleLogout";
import Navbar from "@/component/NavBar";

function Header() {
  return (
    <>
      <Navbar />
      <HandleLogout />
    </>
  );
}

export default Header;
