import { useNavigate } from "react-router-dom";
import "../stylesheets/product.css";
import Price from "./Price"
import CustomImage from "./CustomImage";

function ProductCard({ product }) {
    const navigate = useNavigate();

    return (
        <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
            <div className="product-card-image-wrapper">
                <CustomImage imageSource={product.imageLink} imageAlt={product.name} imageClassName="product-card-image"/>
            </div>
            <div className="product-card-footer">
                <h3 className="product-card-name">{product.name}</h3>
                <p className="product-card-price">{<Price basePrice={product.price} />}</p>
            </div>
        </div>
    );
};

export default ProductCard;