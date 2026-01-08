import { useNavigate } from "react-router-dom";
import ProductComponent from "../components/ProductComponent";
import "../stylesheets/cart.css";
import CustomImage from "../components/CustomImage";
import { useUserStore } from "../Stores/userStore";
import { AccountService } from "../services/accountService";
import PriceFormat from "../components/PriceFormat";
import Price from "../components/Price";


export default function CartPage() {
    const account = useUserStore((state) => state.user);
    const addToCart = useUserStore((state) => state.addToCart);
    const removeFromCart = useUserStore((state) => state.removeFromCart);
    const checkout = useUserStore((state) => state.checkout);
    const navigate = useNavigate();

    if (!account) {
        return <p>Login to see cart.</p>
    }

    if (account.cart.length === 0) {
        return <p>Cart is empty 💀💀💀</p>
    }

    const handleQuantityChange = async (productId: number, quantity: number) => {
        const currentItem = account.cart.find(item => item.product.id === productId);
        if (!currentItem) return;
        
        const diff = quantity - currentItem.quantity;
        if (diff > 0) await addToCart(productId, diff);
        else if (diff < 0) await removeFromCart(productId, -diff);
    };

    const handleRemove = async (productId: number) => {
        const currentItem = account.cart.find(item => item.product.id === productId);
        if (!currentItem) return;
        await removeFromCart(productId, currentItem.quantity);
    };

    const handlePurchase = async () => {

        try {
            await checkout();
            alert("Purchase sucessful!");
        } catch (err) {
            console.error(err);
            alert("failed to complete purchase");
        }
    }

    const total = account.cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity, 0
    );

    const outOfStock = account.cart.some(
        (item) => item.quantity > item.product.stock
    );
    
    return (
        <div className="main-cart-div">
            {account.cart.map((item) => (
                <div key={item.product.id} className="cart-product">
                    <div className="cart-product-card" onClick={() => navigate(`/product/${item.product.id}`)}>
                        <CustomImage imageSource={item.product.imageLink || "/placeholder.png"} imageAlt={item.product.name} imageClassName="cart-product-card-image" />
                        <div style={{ height: "40px", margin: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h3 className="cart-product-card-name">{item.product.name}</h3>
                            <p className="cart-product-card-price">{<Price basePrice={item.product.price} />}</p>
                        </div>
                    </div>

                    <div className="cart-actions">
                        <div className="product-quantity">
                            <input type="number" id="quantity" min="1" required value={item.quantity} onChange={(e) => {
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
                <strong>Total cost: <Price basePrice={total} /> </strong>
                <p>Amount saved: <PriceFormat priceNumber={total*0.4} /></p>
                <button onClick={handlePurchase} disabled={account.cart.length === 0 || outOfStock}> {outOfStock ? "Item is out of stock" : "Purchase"} </button>
                <div style={{fontSize: 15}}>10 years no-money-back guarantuee</div>
            </div>
        </div>
    );
}