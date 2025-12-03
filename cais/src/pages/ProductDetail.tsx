import Navbar from "../components/Navbar";
import SimilarProducts from "../components/SimilarProducts";


export default function ProductDetail() {
    return (
        <div>
            <Navbar />

            <div className="product-grid">
                {/* left block */}
                <div>
                    <div>
                        <h2>Title here</h2>
                        <span>stock here</span>
                    </div>
                    {/* img here */}
                </div>

                {/* center block */}
                <div>
                    <div>
                        <h2>cost here</h2>
                        {/* admin button to edit here */}
                    </div>
                    <p>decription</p>

                    <div>
                        <h2>category here</h2>
                        <div>
                            {/* amount input here */}
                            <button>Add to cart</button>
                            {/* maybe a saved button next to the add to cart button too? */}
                        </div>
                    </div>
                </div>

                {/* right block */}
                <div>
                    <h1>Similar products:</h1>
                    <SimilarProducts />
                </div>
            </div>
        </div>
    );
}