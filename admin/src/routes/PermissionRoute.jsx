import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { hasPermission } from "../helpers/hasPermission";

const PermissionRoute = ({ module, action, children }) => {
  const { user } = useAuth();

  if (!hasPermission(user, module, action)) {
    return <Navigate to="/unauthorized" replace />;
  };

  return children;
};

export default PermissionRoute;
