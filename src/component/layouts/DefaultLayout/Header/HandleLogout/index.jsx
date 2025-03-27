import { logout } from "@/service/authService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HandleLogout() {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLogin(!!token);
  });

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logout Thành công");
      localStorage.removeItem("token");
      setLogin(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return <>{login && <button onClick={handleLogout}>Logout</button>}</>;
}

export default HandleLogout;
