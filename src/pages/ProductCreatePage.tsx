import Navbar from "../components/Navbar";
import ProductCreateComponent from "../components/ProductCreateComponent";
import ProductListAdminComponent from "../components/ProductListAdminComponent";

export default function ProductCreatePage() {
    return (
        <div>
            <Navbar />

            <ProductListAdminComponent/>
            <hr/>
            {/* <ProductCreateComponent/> */}
        </div>
    );
}