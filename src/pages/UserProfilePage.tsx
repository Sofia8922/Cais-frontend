import { useUserStore } from "../Stores/userStore";
import { AccountService } from "../services/accountService";
import RecentOrders from "../components/RecentOrders";
import { useNavigate } from "react-router-dom";
import GetExcel from "../components/GetExcel";

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
            <div className="profile-informaton">
                <h1>{account.username}'s profile! </h1>
                <h2>Email: {account.email}</h2>
                <h2>Address: {account.address || "No address set"}</h2>
                <h2>Phone number: {account.phoneNumber || "No phone number set"}</h2>
            </div>
            <div className="profile-admin">
                <div>
                    <button className="admin" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className="profile-orders">
                <RecentOrders orders={account.recentOrders} />
            </div>
        </div>
    );
}