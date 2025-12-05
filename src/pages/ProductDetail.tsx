import Navbar from "../components/Navbar";
import SimilarProducts from "../components/SimilarProducts";
import { data } from "../components/Data";
import "../stylesheets/product.css";
import { useParams } from "react-router-dom";

export default function ProductDetail() {

    const product = data[2];
    //enable this when getting data V
    // const product = useParams();

    return (
        <div>
            <Navbar />

            <div className="product-grid">
                {/* left block */}
                <div className="product-left">
                    <div className="product-header">
                        <h2>{product.name}</h2>
                        <span>{product.stock}</span>
                    </div>
                    {/* img here */}
                    <img src={product.imageLink || "/placeholder.png"} alt={product.name} />
                </div>

                {/* center block */}
                <div className="product-center">
                    <div className="product-cost">
                        <h2>{product.price}</h2>
                        {/* admin button to edit here */}
                        <button className="admin">Edit</button>
                    </div>
                    <p>{product.description || "no description :("}</p>

                    <div className="product-category">
                        <p>{product.subcategory.category.name} {"->"} {product.subcategory.name}</p>
                        <div className="product-actions">
                            {/* amount input here */}
                            <input type="number" id="quantity" min="1" required />
                            <button>Add to cart</button>
                            {/* maybe a saved button next to the add to cart button too? */}
                        </div>
                    </div>
                </div>

                {/* right block */}
                <div className="product-right">
                    <h1>Similar products:</h1>
                    <SimilarProducts products={data} currentProduct={product}/>
                </div>
            </div>
        </div>
    );
}