
export default function ProductEditComponent({product}) {

    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row" }}>
            <div style={{ width: "50%" }}>
                {product.name}
            </div>
            <div style={{ width: "50%", display: "flex", flexDirection: "column", alignItems: "center", background: "gray" }}>

            </div>

        </div>
    )
}