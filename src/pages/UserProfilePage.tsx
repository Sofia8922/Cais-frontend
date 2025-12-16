import { useUserStore } from "../Stores/userStore";
import { useEffect, useState } from "react";
import { AccountService } from "../services/accountService";
import RecentOrders from "../components/RecentOrders";

export default function UserProfilePage() {
    const account = useUserStore((state) => state.user);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const res = await AccountService.getAccountById(account.id);
                setProfile(res);
            } catch (err) {
                console.error(err);
            }
        };

        fetchAccount();
    }, [account?.id]);

    if (!profile) return <p>Loading profile...</p>

    return (
        <div className="profile-page">
            <div className="profile-informaton">
                <h1>{profile.username}'s profile! </h1>
                <h2>Email: {profile.email}</h2>
                <h2>Address: {profile.address || "No address set"}</h2>
                <h2>Phone number: {profile.phoneNumber || "No phone number set"}</h2>
            </div>
            <div className="profile-admin">
                <div>
                    <button className="admin">view user</button>
                    <button className="admin">add product</button>
                </div>
            </div>
            <div className="profile-orders">
                <RecentOrders orders={profile.RecentOrders} />
            </div>
        </div>
    );
}