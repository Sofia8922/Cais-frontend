import { useNavigate } from "react-router-dom";
import "../stylesheets/product.css";
import Price from "./Price";
import { ProductDTO } from "../dtos/ProductDTOs";
import CustomImage from "./CustomImage.tsx";

type ProductCardProps = {
    product: ProductDTO;
    variant?: "default" | "similar";
};

export default function ProductCard({ product, variant = "default"}: ProductCardProps) {
    const navigate = useNavigate();

    return (
        <div 
            className={`product-card product-card--${variant}`}
            style={ product.stock === 0 ? {background: "#8d7564", borderBottom: "5px solid #715d4f"}: {}}
            onClick={() => { navigate(`/product/${product.id}`) }}
        >
            <div className="product-image-container">
                <CustomImage
                    imageSource={product.imageLink}
                    imageAlt={product.name}
                    imageClassName="product-image"
                    greyedOut={product.stock === 0}
                />
            </div>

            <div className="product-card-footer">                    
                <strong className="product-name">{product.name}</strong>
                <strong className="product-price">
                    <Price basePrice={product.price} />
                </strong>
            </div>
        </div>
    )
}