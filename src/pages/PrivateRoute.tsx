import { Navigate, Outlet } from "react-router-dom";
import { currentAccount } from "../Stores/userStore";


export const PrivateRoute = () => {
    // add user store here
    const user = currentAccount();
    const isLoggedIn = !!user.id;

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}