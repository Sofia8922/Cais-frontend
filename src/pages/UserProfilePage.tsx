import { useUserStore } from "../Stores/userStore";
import { useEffect, useState } from "react";
import { AccountService } from "../services/accountService";
import RecentOrders from "../components/RecentOrders";
import { useNavigate } from "react-router-dom";

export default function UserProfilePage() {
    const account = useUserStore((state) => state.user);
    const navigate = useNavigate();

    if (!account) {
        navigate("/login");
        return null;
    }

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
                    <button className="admin">view user</button>
                    <button className="admin">add product</button>
                </div>
            </div>
            <div className="profile-orders">
                <RecentOrders orders={account.recentOrders} />
            </div>
        </div>
    );
}