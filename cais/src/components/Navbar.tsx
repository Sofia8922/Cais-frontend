import SearchBar from "./Searchbar";



function Navbar() {
    return (
        <nav className="navbar">
            <div>
                {/* logo here */}
            </div>

            <div className="">
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