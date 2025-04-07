import authService from "@/service/authService";
import PropTypes from "prop-types";
import { Children, createContext, useEffect, useState } from "react";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      try {
        const data = await authService.getCurrentUser();
        setUser(data.user);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const values = {
    user,
    loading,
    setUser,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

UserContext.propTypes = {
  children: PropTypes.element,
};

export default UserContext;
