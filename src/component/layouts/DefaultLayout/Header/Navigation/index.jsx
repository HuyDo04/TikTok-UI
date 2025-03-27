import routes from "@/routes";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.scss";
function Navigation() {
  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
