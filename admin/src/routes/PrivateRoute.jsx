import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { hasPermission } from "../helpers/hasPermission";

const PrivateRoute = ({ children, roles, module, action = "view" }) => {
  const { isLoggedIn, isAuthResolved, user } = useAuth();

  if (!isAuthResolved) {
    return <div className="text-center mt-5">Loading...</div>;
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  };

  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  };

  if (module && !hasPermission(user, module, action)) {
    return <Navigate to="/unauthorized" replace />;
  };

  return children;
};

export default PrivateRoute;

