import { useNavigate } from "react-router-dom";
import { data } from "../components/Data";
import Navbar from "../components/Navbar";
import Price from "../components/Price";
import ProductComponent from "../components/ProductComponent";
import "../stylesheets/cart.css";

export default function CartPage() {

    const product = data[2];
    const navigate = useNavigate();


    return (
        <div className="main-cart-div">

            <Navbar />
            <div className="cart-products-div">
                <div className="cart-product">
                    <div className="cart-product-card" onClick={() => navigate(`/products/${product.id}`)}>
                        <img src={product.imageLink || "/placeholder.png"} alt={product.name} className="cart-product-card-image" />
                        <div style={{ height: "40px", margin: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h3 className="cart-product-card-name">{product.name}</h3>
                            <p className="cart-product-card-price">{<Price basePrice={product.price} />}</p>
                        </div>
                    </div>

                    <div className="cart-actions">
                        <div className="product-quantity">
                            <input type="number" id="quantity" min="1" required />
                            <button>Save</button>
                        </div>
                        <button>Remove</button>
                    </div>
                </div>

                
                <div className="cart-product">
                    <div className="cart-product-card" onClick={() => navigate(`/products/${product.id}`)}>
                        <img src={product.imageLink || "/placeholder.png"} alt={product.name} className="cart-product-card-image" />
                        <div style={{ height: "40px", margin: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h3 className="cart-product-card-name">{product.name}</h3>
                            <p className="cart-product-card-price">{<Price basePrice={product.price} />}</p>
                        </div>
                    </div>

                    <div className="cart-actions">
                        <div className="product-quantity">
                            <input type="number" id="quantity" min="1" required />
                            <button>Save</button>
                        </div>
                        <button>Remove</button>
                    </div>
                </div>

                
                <div className="cart-product">
                    <div className="cart-product-card" onClick={() => navigate(`/products/${product.id}`)}>
                        <img src={product.imageLink || "/placeholder.png"} alt={product.name} className="cart-product-card-image" />
                        <div style={{ height: "40px", margin: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h3 className="cart-product-card-name">{product.name}</h3>
                            <p className="cart-product-card-price">{<Price basePrice={product.price} />}</p>
                        </div>
                    </div>

                    <div className="cart-actions">
                        <div className="product-quantity">
                            <input type="number" id="quantity" min="1" required />
                            <button>Save</button>
                        </div>
                        <button>Remove</button>
                    </div>
                </div>

                




            </div>

        </div>
    );
}