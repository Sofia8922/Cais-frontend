import SearchBar from "./Searchbar";
import "../stylesheets/navbar.css";


function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src="../src/assets/SiteLogo.svg" width="50" height="50" />
            </div>

            <div className="navbar-center">
                <SearchBar />
            </div>

            <div className="navbar-right">
                <button className="nav-btn favorite">saved</button>
                <button className="nav-btn cart">cart</button>
                <button className="nav-btn profile">profile</button>
            </div>
        </nav>
    )
}

export default Navbar;