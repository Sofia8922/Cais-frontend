
import { useNavigate } from "react-router-dom";
import "../stylesheets/product.css";
import Price from "./Price";
import { ProductDTO } from "../dtos/ProductDTOs";

export default function ProductComponent({ product }: {product: ProductDTO}) {
    const navigate = useNavigate();

    return (
        <div className="productDiv"
            //key={product.id}
            onMouseOver={(e) => {
                e.currentTarget.style.background = "rgba(20, 20, 20, 1)";
                const image = e.currentTarget.querySelector(".productImage") as HTMLElement;
                if (image) {
                    image.style.filter = "hue-rotate(5deg) saturate(1) brightness(0.9)";
                    image.style.background = "rgba(0, 0, 0, 1)"
                }
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(25, 25, 25, 1)";
                const image = e.currentTarget.querySelector(".productImage") as HTMLElement;
                if (image) {
                    image.style.filter = "hue-rotate(0deg) saturate(1) brightness(1)";
                    image.style.background = "rgba(15, 15, 15, 1)"
                }
            }}
            onClick={() => { /*navigate(`/projects/${project.id}`)*/ }}
        >
            <img src={product.imageLink || "/placeholder.png"} alt={product.name}
                className="productImage"
            />
            <div style={{ height: "50px", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong style={{ fontSize: "30px", textAlign: "center", padding: "16px", }}>{product.name}</strong>

                <strong style={{ fontSize: "30px", textAlign: "center", padding: "16px", }}><Price basePrice={product.price} /></strong>

            </div>
        </div>
    )
}