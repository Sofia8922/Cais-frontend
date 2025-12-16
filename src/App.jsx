import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Login from "./pages/Login.tsx";
import ProductList from "./pages/ProductList.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import UserProfilePage from "./pages/UserProfilePage.tsx";
import CreateProductPage from "./pages/ProductCreatePage.tsx";
import CartPage from "./pages/CartPage.tsx";
import { PrivateRoute } from "./pages/PrivateRoute.js";
import FavouritesPage from "./pages/FavouritesPage.tsx";
import Navbar from "./components/Navbar.tsx";
import ProductCreatePage from "./pages/ProductCreatePage.tsx";

export const API_URL = `http://localhost:8080`

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />

        {/* private routes go here. if user is not logged in return to login page */}
        {/* <Route element={<PrivateRoute />}> */}
        {/* all routes go here after the login page */}
        <Route path="/products/" element={<ProductList />} />
        <Route path="/products/:searchFilter" element={<ProductList />} />
        <Route path="/a" element={<ProductDetail />} />
        <Route path="/b" element={<UserProfilePage />} />
        <Route path="/c" element={<CartPage />} />
        <Route path="/create" element={<ProductCreatePage />} />
        <Route path="/favorites/" element={<FavouritesPage />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/profile/:userId" element={<UserProfilePage />} />
        <Route path="/cart/:userId" element={<CartPage />} />
        {/* </Route> */}
      </Routes>
    </>
  );
}
export default App