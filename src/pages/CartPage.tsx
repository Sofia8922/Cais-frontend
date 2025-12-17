import { useNavigate } from "react-router-dom";
import { data } from "../components/Data";
import Navbar from "../components/Navbar";
import Price from "../components/Price";
import ProductComponent from "../components/ProductComponent";
import "../stylesheets/cart.css";
import CustomImage from "../components/CustomImage";
import { useUserStore } from "../Stores/userStore";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function CartPage() {
    const account = useUserStore((state) => state.user);
    const products = account?.cart ?? [];
    const updateAccount = useUserStore((state) => state.updateUser);
    const navigate = useNavigate();

    if (!account) {
        return <p>Login to see cart.</p>
    }

    if (products.length === 0) {
        return <p>Cart is empty 💀💀💀</p>
    }

    const handleQuantityChange = (productId: number, quantity: number) => {
        updateAccount({
            cart: products.map((item) => item.product.id === productId ? {...item, quantity} : item),
        });
    };

    const handleRemove = (productId: number) => {
        updateAccount({
            cart: products.filter(
                (item) => item.product.id !== productId),
        });
    };

    const total = products.reduce(
        (sum, item) => sum + item.product.price * item.quantity, 0
    );
    
    return (
        <div className="main-cart-div">
            {products.map((item) => (
                <div key={item.product.id} className="cart-product">
                    <div className="cart-product-card" onClick={() => navigate(`/products/${item.product.id}`)}>
                        <CustomImage imageSource={item.product.imageLink || "/placeholder.png"} imageAlt={item.product.name} imageClassName="cart-product-card-image" />
                        <div style={{ height: "40px", margin: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h3 className="cart-product-card-name">{item.product.name}</h3>
                            <p className="cart-product-card-price">{<Price basePrice={item.product.price} />}</p>
                        </div>
                    </div>

                    <div className="cart-actions">
                        <div className="product-quantity">
                            <input type="number" id="quantity" min="1" required  onChange={(e) => {
                                handleQuantityChange(
                                    item.product.id,
                                    Number(e.target.value)
                                )
                            }}/>

                            <button onClick={() => handleRemove(item.product.id)}>Remove</button>
                        </div>
                    </div>
                </div>
            ))}

            <div className="total-price-div">
                            <strong>Total cost: ${total.toFixed(2)}</strong>
                            <p>Amount saved: €{(total * 0.2).toFixed(2)}</p>
                            {/* add onclick here */}
                            <button >Purchase</button>
                    </div>

            {/* <div className="cart-content-div">
                <div className="cart-products-div">
                    <div className="cart-product">
                        <div className="cart-product-card" onClick={() => navigate(`/products/${product.id}`)}>
                            <CustomImage imageSource={product.imageLink || "/placeholder.png"} imageAlt={product.name} imageClassName="cart-product-card-image" />
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

                <div className="total-price-div">
                    <strong>Total cost: €{28}</strong>
                    <p>Amount saved: €{(28 * 0.2).toFixed(2)}</p>
                    <button>Purchase</button>
                </div>
            </div> */}



        </div>
    );
}