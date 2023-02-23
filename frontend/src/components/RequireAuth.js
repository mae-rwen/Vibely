import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import useAuth from "./hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    // const { user } = useContext(AuthContext)
    const location = useLocation();

    return(
        auth?.email 
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace /> 
    );
}

export default RequireAuth;