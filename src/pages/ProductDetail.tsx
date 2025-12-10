import Navbar from "../components/Navbar";
import SimilarProducts from "../components/SimilarProducts";
import { data } from "../components/Data";
import "../stylesheets/product.css";
import { useParams } from "react-router-dom";
import Price from "../components/Price";

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
                        <h2 style={{flex: 1}}>{product.name}</h2>
                        <span className="price">in stock: {product.stock}</span>
                    </div>
                    {/* img here */}
                    <img src={product.imageLink || "/placeholder.png"} alt={product.name} />
                </div>

                {/* center block */}
                <div className="product-center">
                    <div className="product-cost">
                        <h2>{<Price basePrice={product.price} />}</h2>
                        {/* admin button to edit here */}
                        <button className="admin">Edit</button>
                    </div>
                    <p>{product.description || "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}</p>

                    <div className="product-category">
                        <p>Category: {product.subcategory.category.name} {"->"} {product.subcategory.name}</p>
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