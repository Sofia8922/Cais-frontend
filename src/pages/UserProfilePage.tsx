import { useUserStore } from "../Stores/userStore";
import { AccountService } from "../services/accountService";
import RecentOrders from "../components/RecentOrders";
import { useNavigate } from "react-router-dom";
import GetExcel from "../components/GetExcel";
import "../stylesheets/profile.css";

export default function UserProfilePage() {
    const account = useUserStore((state) => state.user);
    const logout = useUserStore((state) => state.logout);
    const updateUser = useUserStore((state) => state.updateUser);
    const navigate = useNavigate();

    if (!account) {
        navigate("/login");
        return null;
    }
    
    const handleLogout = async () => {
        alert("Logging out!");
        logout();
        navigate("/login");
    };

    return (
        <div className="profile-page">
            <div className="profile-information">
                <h1 className="title">{account.username}'s profile! </h1>
                <h2 className="info">Email: {account.email}</h2>
                <h2 className="info">Address: {account.address || "No address set"}</h2>
                <h2 className="info">Phone number: {account.phoneNumber || "No phone number set"}</h2>
                <button className="logout" onClick={handleLogout}>Logout</button>
            </div>
            
            <div className="profile-orders">
                <h2 className="order-title">Recent Orders</h2>
                <RecentOrders orders={account.recentOrders} />
            </div>
        </div>
    );
}