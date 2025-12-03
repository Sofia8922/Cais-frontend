import Navbar from "../components/Navbar";
import SimilarProducts from "../components/SimilarProducts";
import "../stylesheets/product.css";

export default function ProductDetail() {
    return (
        <div>
            <Navbar />

            <div className="product-grid">
                {/* left block */}
                <div className="product-left">
                    <div className="product-header">
                        <h2>Title here</h2>
                        <span>stock here</span>
                    </div>
                    {/* img here */}
                    <img src="/placehold.png" alt="product" />
                </div>

                {/* center block */}
                <div className="product-center">
                    <div className="product-cost">
                        <h2>cost here</h2>
                        {/* admin button to edit here */}
                    </div>
                    <p>decription</p>

                    <div className="product-category">
                        <h2>category here</h2>
                        <div className="product-">
                            {/* amount input here */}
                            <button>Add to cart</button>
                            {/* maybe a saved button next to the add to cart button too? */}
                        </div>
                    </div>
                </div>

                {/* right block */}
                <div className="product-right">
                    <h1>Similar products:</h1>
                    <SimilarProducts />
                </div>
            </div>
        </div>
    );
}