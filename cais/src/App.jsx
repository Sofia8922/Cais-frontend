import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
// import Login from "./pages/Login.tsx";
import ProductList from "./pages/ProductList.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import UserProfilePage from "./pages/UserProfilePage.tsx";
import CartPage from "./pages/CartPage.tsx";
import { PrivateRoute } from "./pages/PrivateRoute.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      {/* <Route path="/login" element={<Login />} /> */}

      {/* private routes go here. if user is not logged in return to login page */}
      {/* <Route element={<PrivateRoute />}> */}
      {/* all routes go here after the login page */}
      <Route path="/products/" element={<ProductList />} />
      <Route path="/products/:searchFilter" element={<ProductList />} />
      <Route path="/a" element={<ProductDetail />} />
      <Route path="/b" element={<UserProfilePage />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path="/profile/:userId" element={<UserProfilePage />} />
      <Route path="/:userId/cart" element={<CartPage />} />
      {/* </Route> */}
    </Routes>
  );
}
export default App