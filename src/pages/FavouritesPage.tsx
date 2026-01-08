import Navbar from "../components/Navbar";
import ProductComponent from "../components/ProductComponent";
import { useUserStore } from "../Stores/userStore";
import "../stylesheets/favorites.css";

export default function FavouritesPage() {
    const account = useUserStore((state) => state.user);
    const removeFavorite = useUserStore((state) => state.removeFavorite)
    if (!account) {
        return <p className="favorites-message">Login to see favorites.</p>
    }

    if (account.favorites.length === 0) {
        return <p className="favorites-message">No favorites yet 💀💀💀</p>
    }

    return (
        <div className="favorites-page">
            <h1 className="favorites-title">Favorites:</h1>
            <div className="favorites-grid">
                {account.favorites.map((product) => (
                    <ProductComponent
                        key={product.id}
                        product={product} />
                ))}
            </div>
        </div>
    )
}