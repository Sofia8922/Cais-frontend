import { useNavigate } from "react-router-dom";
import "../stylesheets/product.css";
import Price from "./Price"

function ProductCard({ product }) {
    const navigate = useNavigate();

    return (
        <div className="product-card" onClick={() => navigate(`/products/${product.id}`)}>
            <img src={product.imageLink || "/placeholder.png"} alt={product.name} className="product-card-image" />
            <div style={{ height: "40px", margin: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 className="product-card-name">{product.name}</h3>
                <p className="product-card-price">{<Price basePrice={product.price} />}</p>
            </div>
        </div>
    );
};

export default ProductCard;