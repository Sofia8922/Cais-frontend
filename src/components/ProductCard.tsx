import { useNavigate } from "react-router-dom";
import Price from "./Price"

function ProductCard({ product }) {
    const navigate = useNavigate();

    return (
        <div className="product-card" onClick={() => navigate(`/products/${product.id}`)}>
            <img src={product.imageLink || "/placeholder.png"} alt={product.name} className="product-card-image" />
            <h3 className="product-card-name">{product.name}</h3>
            <p className="product-card-price">{<Price basePrice={product.price} />}</p>
        </div>
    );
};

export default ProductCard;