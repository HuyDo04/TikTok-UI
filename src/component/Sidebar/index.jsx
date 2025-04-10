import { FaHome, FaCompass, FaMusic, FaUserFriends } from "react-icons/fa";
import "./Sidebar.module.scss";
import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import Button from "../Button";
import { NavLink } from "react-router-dom";
import HandleLogout from "../layouts/DefaultLayout/Header/HandleLogout";
import { useContext } from "react";
import UserContext from "@/context/UserContext";
const cx = classNames.bind(styles);

function Sidebar() {
  const { user, loading } = useContext(UserContext);
  console.log(user);
  if (loading) return;
  return (
    <div className={cx("sidebar")}>
      <div className={cx("sidebar-item")}>
        <FaHome />
        <span>Đề xuất</span>
      </div>
      <div className={cx("sidebar-item")}>
        <FaCompass />
        <span>Khám phá</span>
      </div>
      <div className={cx("sidebar-item")}>
        <FaMusic />
        <span>Nhạc</span>
      </div>
      <div className={cx("sidebar-item")}>
        <FaUserFriends />
        <span>Đang follow</span>
      </div>
      {!user ? (
        <div className={cx("sidebar-item")}>
          <NavLink to="/login">
            <Button primary size="medium">
              Login
            </Button>
          </NavLink>
        </div>
      ) : (
        <div className={cx("sidebar-item")}>
          <HandleLogout />
        </div>
      )}
    </div>
  );
}

export default Sidebar;
