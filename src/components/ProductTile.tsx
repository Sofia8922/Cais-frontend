import { ProductDTO } from "../dtos/ProductDTOs"
import PriceFormat from "./PriceFormat"

export default function ProductTile({product, setMode}) {
console.log(product)
    return (
        <div style={{
            width: "95%",
            height: "30px",
            background: "#3e2d22",
            border: "2px solid white",
            borderRadius: "10px",
            margin: "8px",
            cursor: "pointer",
            display: "flex",
            flexDirection: "row",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px",
            fontSize: "23px",
            gap: "70px"
        }}
            onMouseOver={(e) => { e.currentTarget.style.background = "#291915" }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#3e2d22" }}
            onClick={setMode}>
            <p style={{textAlign: "left", width: "25%"}}>{product.name}</p>
            <p style={{textAlign: "left", width: "25%"}}>{product.stock}</p>
            <p style={{textAlign: "left", width: "25%"}}><PriceFormat priceNumber={product.price} /></p>
            <p style={{textAlign: "left", width: "25%"}}>{product.purchases.length}</p>
        </div>
    )
}