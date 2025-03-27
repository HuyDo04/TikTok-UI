import config from "@/config";
import userService from "@/service/userService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function User() {
  const [users, setUser] = useState([]);
  useEffect(() => {
    const handle = async () => {
      const user = await userService.getAll();
      setUser(user);
    };
    handle();
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
