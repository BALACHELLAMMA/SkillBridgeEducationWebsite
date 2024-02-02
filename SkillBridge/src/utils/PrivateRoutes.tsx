import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoutes=()=>{
    const {user}:any = useAuth();
    return user ? <Outlet/> : <Navigate to='/'/>
}

export default PrivateRoutes;
