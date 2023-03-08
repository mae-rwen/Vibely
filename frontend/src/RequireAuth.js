import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthProvider";

const RequireAuth = () => {

  const { user } = useContext(AuthContext);  
  
  const location = useLocation();

  return user? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
