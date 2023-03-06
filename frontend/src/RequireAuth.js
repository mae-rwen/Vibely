import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./components/hooks/useAuth";
import { useContext } from "react";
import AuthContext from "./context/AuthProvider";

const RequireAuth = () => {
  // const { auth } = useAuth();
  const { user, auth } = useContext(AuthContext);
  console.log(auth)
  
  const location = useLocation();

  return user? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
