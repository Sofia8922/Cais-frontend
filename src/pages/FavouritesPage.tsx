import { data } from "../components/Data";
import Navbar from "../components/Navbar";
import ProductComponent from "../components/ProductComponent";
import { useUserStore } from "../Stores/userStore";

export default function FavouritesPage() {
    const account = useUserStore((state) => state.user);
    const favorites = account?.favorites ?? [];
    const product = data[2];
    console.log("favorites:", favorites);
    if (!account) {
        return <p>Login to see favorites.</p>
    }

    if (favorites.length === 0) {
        return <p>No favorites yet 💀💀💀</p>
    }

    return (
        <div className="mainDiv">
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {account.favorites.map((order) => (
                    <div key={order.id}>
                        <div style={{
                        flex: 1, display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        padding: "20px"
                        }}>
                            {order.products.map((product) => (
                                <ProductComponent
                                key={product.id}
                                product={product} />
                            ))}
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