import config from "@/config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function User() {
  const [users, setUser] = useState([]);
  console.log(users);
  useEffect(() => {
    fetch("https://api01.f8team.dev/api/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw res;
        return res.json();
      })
      .then((users) => {
        setUser(users);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu users:", error);
      });
  }, []);

  return (
    <>
      <h1>User Page</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`${config.routes.user}/${user.slug}`}>
              {`${user.firstName} ${user.lastName}`}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default User;
