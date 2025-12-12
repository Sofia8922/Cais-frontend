import { useParams } from "react-router-dom";
import { useUserStore } from "../Stores/userStore";
import { useEffect, useState } from "react";
import { AccountService } from "../services/accountService";

export default function UserProfilePage() {
    const { userId } = useParams();
    const account = useUserStore((state) => state.user);
    const accountId = account?.id;
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const res = await AccountService.getAccountById(Number(userId));
                setProfile(res);
            } catch (err) {
                console.error(err);
            }
        };

        if (userId) {
            fetchAccount();
        }
    }, [userId]);

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
                {/* what am i to do here??? */}
            </div>
        </div>
    );
}