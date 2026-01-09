import SearchBar from "./Searchbar";
import "../stylesheets/navbar.css";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../Stores/userStore";


function Navbar() {
    const navigate = useNavigate();

    const user =  useUserStore((state) => state.user);
    // console.log("Navbar user:", user);
    // const userId = 1;
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src="../src/assets/SiteLogo.svg" width="50" height="50" onClick={() => navigate("/products")} />
            </div>

            <div className="navbar-center">
                <SearchBar />
            </div>

            <div className="navbar-right">
                <button className="nav-btn favorite" onClick={() => navigate(`/favorites`)}>
                    <i className="fa fa-heart"></i>
                </button>
                <button className="nav-btn cart" onClick={() => navigate(`/cart`)}>
                    <i className="fa-solid fa-cart-shopping"></i>
                </button>
                <button className="nav-btn profile" onClick={() => { 
                    if (!user) {
                        navigate("/login")
                    } else {
                        navigate(`/profile`)
                    }}}>
                        <i className={user ? "fa-solid fa-user" : "fa-regular fa-user"}></i>
                    </button>
            </div>
        </nav>
    )
}

export default Navbar;