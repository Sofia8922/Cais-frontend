import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { currentUser, logout } from "./Stores/userStore";

export default function MainLayout() {

  const user = currentUser();
  const navigate = useNavigate();

  const [isOpened, setOpened] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <nav style={{ background: "rgba(12, 11, 17, 1)", height: "80px", padding: "10px 20px", display: "flex" }}>
        <div style={{ width: "100%" }}>

          <button
            onClick={() => navigate("/projects")}
            style={{
              float: 'left',
              height: "100%"
            }}
          >
            Home
          </button>

          <button onClick={() => { setOpened(!isOpened) }} style={{ float: 'right', height: "100%" }}>{user.email}</button>


          {isOpened && (
            <div style={{
              position: "absolute",
              top: "60px",
              right: "30px",
              width: "150px",
              background: "black",
              padding: "8px",
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              borderRadius: "10px",
            }}>
              <button onClick={() => { logout() }} style={{ float: 'right', height: "100%" }}>Log out</button>
            </div>)}
        </div>

      </nav >
      <main style={{ flex: 1, display: "flex" }}>
        <Outlet />
      </main>
    </div>
  );
}