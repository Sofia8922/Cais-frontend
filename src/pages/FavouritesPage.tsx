import { data } from "../components/Data";
import Navbar from "../components/Navbar";
import ProductComponent from "../components/ProductComponent";

export default function FavouritesPage() {

    const product = data[2];


    return (
        <div className="mainDiv">
            <Navbar />
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{
                    flex: 1, display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    padding: "20px"
                }}>
                    <ProductComponent product={product} />
                    <ProductComponent product={product} />
                    <ProductComponent product={product} />
                    <ProductComponent product={product} />
                </div>
            </div>
        </div>
    );
}