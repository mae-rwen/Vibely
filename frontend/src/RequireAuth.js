import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./components/hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.email ? (
    <Outlet />
  ) : (
    <Navigate to="/reqLogin" state={{ from: location }} replace />
  );
};

export default RequireAuth;
