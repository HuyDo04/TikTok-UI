import { NavLink } from "react-router-dom";
import Navigation from "./Navigation";
import HandleLogout from "./HandleLogout";

function Header() {
  return (
    <>
      <Navigation />
      <HandleLogout />
    </>
  );
}

export default Header;
