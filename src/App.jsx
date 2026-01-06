import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Login from "./pages/Login.tsx";
import ProductList from "./pages/ProductList.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import UserProfilePage from "./pages/UserProfilePage.tsx";
import ProductCreatePage from "./pages/ProductCreatePage.tsx";
import CartPage from "./pages/CartPage.tsx";
import { PrivateRoute } from "./pages/PrivateRoute.js";
import FavouritesPage from "./pages/FavouritesPage.tsx";
import Navbar from "./components/Navbar.tsx";
import Register from "./pages/Register.tsx";
import Footer from "./components/Footer.tsx";


export const API_URL = `http://localhost:8080`

const appStyles = {
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
  };

  const routesStyles = {
    flex: 1,
    minHeight: `calc(100vh - 120px)`, // 2 times 60 px
  };

function App() {
  return (
    <div style={appStyles}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

          {/* private routes go here. if user is not logged in return to login page */}
          {/* <Route element={<PrivateRoute />}> */}
          {/* all routes go here after the login page */}
          <Route path="/products/" element={<ProductList />} />
          <Route path="/products/:searchFilter" element={<ProductList />} />
          <Route path="/a" element={<ProductDetail />} />
          <Route path="/b" element={<UserProfilePage />} />
          <Route path="/c" element={<CartPage />} />
          <Route path="/create" element={<ProductCreatePage />} />
          <Route path="/favorites" element={<FavouritesPage />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/cart" element={<CartPage />} />
          {/* </Route> */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
export default App