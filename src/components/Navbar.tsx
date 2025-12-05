import SearchBar from "./Searchbar";
import "../stylesheets/navbar.css";


function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1>a</h1>
                {/* logo here */}
            </div>

            <div className="navbar-center">
                <SearchBar />
            </div>

            <div className="navbar-right">
                <button className="nav-btn favorite">a</button>
                <button className="nav-btn cart">2</button>
                <button className="nav-btn profile">5</button>
            </div>
        </nav>
    )
}

export default Navbar;