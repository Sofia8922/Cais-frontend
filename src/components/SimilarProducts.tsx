import ProductCard from "./ProductCard";
import "../stylesheets/product.css";

function SimilarProducts({products, currentProduct }) {

    // filter out current product
    const similar = products.filter(p => p !== currentProduct);

    return (
        <div className="similar-horizontal">
            {similar.map((p) => {
                return (
                    <ProductCard key={p.id} product={p} />
                )
            })}
        </div>
    )
}

export default SimilarProducts;