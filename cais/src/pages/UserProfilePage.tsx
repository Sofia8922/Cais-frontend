export default function UserProfilePage() {
    return (
        <div className="profile-page">
            <div className="profile-informaton">
                <h1>{"[user]"}'s profile! </h1>
                <h2>Email: </h2>
                <h2>Address: </h2>
                <h2>Phone number: </h2>
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