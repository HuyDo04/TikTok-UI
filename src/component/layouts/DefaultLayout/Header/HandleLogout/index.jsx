import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HandleLogout() {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLogin(!!token);
  });

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("https://api01.f8team.dev/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Đăng xuất không thành công");
        return res.json();
      })
      .then((data) => {
        localStorage.removeItem("token");
        setLogin(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return <>{login && <button onClick={handleLogout}>Logout</button>}</>;
}

export default HandleLogout;
