

function SimilarProducts({products, currentProduct }) {

    // filter out current product
    const similar = products.filter(p => p !== currentProduct);

    return (
        <div className="similar-list">
            {similar.map((p, index) => {
                <div key={index} className="similar-item">
                    <img src={p.imageLink || "/placeholder.png"} alt={p.name} />
                    <p>{p.name}</p>
                </div>
            })}
        </div>
    )
}

export default SimilarProducts;