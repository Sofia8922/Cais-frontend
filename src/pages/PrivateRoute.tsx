import { Navigate, Outlet } from "react-router-dom";
import { currentUser } from "../Stores/userStore";


export const PrivateRoute = () => {
    // add user store here
    const user = currentUser();
    const isLoggedIn = !!user;

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}