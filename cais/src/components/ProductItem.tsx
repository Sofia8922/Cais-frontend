

function ProductItem({product}) {
    return (
        <div className="product-item">
            <img src={product.imageLink || "/placeholder.png"} alt={product.name}
            style={{ width: "100px", height: "100px", objectFit: "cover"}} />
            <div>
                <h2>{product.name}</h2>
                <span>{product.price}</span>
            </div>
        </div>
    )
}

export default ProductItem;