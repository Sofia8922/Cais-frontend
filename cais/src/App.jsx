import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Login from "./pages/Login.tsx";
import { PrivateRoute } from "./pages/PrivateRoute.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />

      {/* private routes go here. if user is not logged in return to login page */}
      <Route element={<PrivateRoute />}>
      {/* all routes go here after the login page */}
      
      </Route>
    </Routes>
  );
}
export default App