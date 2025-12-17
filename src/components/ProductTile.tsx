import { ProductDTO } from "../dtos/ProductDTOs"

export default function ProductTile(product) {
console.log(product)
    return (
        <div style={{
            width: "900px",
            height: "30px",
            background: "black",
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
            onMouseOver={(e) => { e.currentTarget.style.background = "rgba(19, 19, 19, 1)" }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0, 0, 0, 1)" }}
            onClick={() => { }}>
            <p style={{textAlign: "left", width: "25%"}}>{product.product.name}</p>
            <p style={{textAlign: "left", width: "25%"}}>{product.product.stock}</p>
            <p style={{textAlign: "left", width: "25%"}}>€{product.product.price}</p>
            <p style={{textAlign: "left", width: "25%"}}>??</p>
        </div>
    )
}