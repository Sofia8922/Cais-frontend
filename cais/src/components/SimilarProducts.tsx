import ProductCard from "./ProductCard";


function SimilarProducts({products, currentProduct }) {

    // filter out current product
    const similar = products.filter(p => p !== currentProduct);

    return (
        <div className="similar-list">
            {similar.map((p) => {
                return (
                    <ProductCard key={p.id} product={p} />
                )
            })}
        </div>
    )
}

export default SimilarProducts;