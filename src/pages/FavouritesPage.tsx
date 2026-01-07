import Navbar from "../components/Navbar";
import ProductComponent from "../components/ProductComponent";
import { useUserStore } from "../Stores/userStore";

export default function FavouritesPage() {
    const account = useUserStore((state) => state.user);
    const removeFavorite = useUserStore((state) => state.removeFavorite)
    if (!account) {
        return <p>Login to see favorites.</p>
    }

    if (account.favorites.length === 0) {
        return <p>No favorites yet 💀💀💀</p>
    }

    return (
        <div className="mainDiv">
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {account.favorites.map((product) => (
                    <div key={product.id}>
                        <div style={{
                        flex: 1, display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        padding: "20px"
                        }}>
                        <ProductComponent
                            key={product.id}
                            product={product} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

    // return (
    //     <div className="mainDiv">
    //         <Navbar />
    //         <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
    //             <div style={{
    //                 flex: 1, display: "flex",
    //                 flexDirection: "row",
    //                 flexWrap: "wrap",
    //                 padding: "20px"
    //             }}>
    //                 <ProductComponent product={product} />
    //                 <ProductComponent product={product} />
    //                 <ProductComponent product={product} />
    //                 <ProductComponent product={product} />
    //             </div>
    //         </div>
    //     </div>
    // );
}