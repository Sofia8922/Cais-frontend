import { useNavigate } from "react-router-dom";
import "../stylesheets/navbar.css";

function SearchBar() {
    const navigate = useNavigate();
    return (
        <>
            <input type="text" placeholder="Search..." className="search-input" 
            onChange={(evt: any) => {               
          }}
            onKeyDown={(evt: any) => {
            const keyCode = evt.keyCode;
            if (keyCode == 13) {
                evt.preventDefault();
                navigate(`/products/${evt.target.value}`);
            };
          }}/>
        </>
    );
}

export default SearchBar;