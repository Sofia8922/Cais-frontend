import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../Stores/userStore";


export const PrivateRoute = () => {
    // add user store here
    const user = useUserStore((state) => state.user);
    const isLoggedIn = !!user.id;

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}