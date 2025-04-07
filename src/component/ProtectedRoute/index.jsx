import PropTypes from "prop-types";
import config from "@/config";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import authService from "@/service/authService";

function ProtectedRoute({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const data = await authService.getCurrentUser();
        setCurrentUser(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <div>Loading.............</div>;
  }

  if (!currentUser) {
    const path = encodeURIComponent(location.pathname);
    return (
      <Navigate
        to={`${config.routes.login}${path ? `?continue=${path}` : ""}`}
      />
    );
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.element,
};

export default ProtectedRoute;
