import { useNavigate } from "react-router-dom";
import "../stylesheets/product.css";
import Price from "./Price"
import CustomImage from "./CustomImage";

function ProductCard({ product }) {
    const navigate = useNavigate();

    return (
        <div className="product-card" onClick={() => navigate(`/products/${product.id}`)}>
            <CustomImage imageSource={product.imageLink} imageAlt={product.name} imageClassName="product-card-image"/>
            <div style={{ height: "40px", margin: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 className="product-card-name">{product.name}</h3>
                <p className="product-card-price">{<Price basePrice={product.price} />}</p>
            </div>
        </div>
    );
};

export default ProductCard;