import { useNavigate } from "react-router-dom";
import Price from "../components/Price";
import ProductComponent from "../components/ProductComponent";
import "../stylesheets/cart.css";
import CustomImage from "../components/CustomImage";
import { useUserStore } from "../Stores/userStore";
import { AccountService } from "../services/accountService";


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

    const handlePurchase = async () => {
        if (!account || account.cart.length === 0) {
            alert("Cart is empty");
            return;
        }

        try {
            const updatedAccount = await AccountService.checkout(account.id);

            updateAccount({
                cart: updatedAccount.cart ?? [],
                recentOrders: updatedAccount.recentOrders ?? [],
            });

            alert("Purchase sucessful!");
        } catch (err) {
            console.error(err);
            alert("failed to complete purchase");
        }
    }

    const total = products.reduce(
        (sum, item) => sum + item.product.price * item.quantity, 0
    );

    const outOfStock = account.cart.some(
        (item) => item.quantity > item.product.stock
    );
    
    return (
        <div className="main-cart-div">
            {products.map((item) => (
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
                <strong>Total cost: ${total.toFixed(2)}</strong>
                <p>Amount saved: €{(total * 0.2).toFixed(2)}</p>
                {/* add onclick here */}
                <button onClick={handlePurchase} disabled={account.cart.length === 0 || outOfStock}> {outOfStock ? "Item is out of stock" : "Purchase"} </button>
            </div>
        </div>
    );
}