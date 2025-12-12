import { useState } from "react";
import CategoriesList from "../components/CategoriesList";
import Navbar from "../components/Navbar";
import Price from "../components/Price"
import "../stylesheets/productlist.css"
import ProductComponent from "../components/ProductComponent";
import ProductListComponent from "../components/ProductListComponent";

export default function ProductList() {
    const [priceFilter, setPriceFilter] = useState(0);
    const [expandedCategory, setExpandedCategory] = useState(NaN);
    const [selectedSubcategory, setSubcategory] = useState(NaN);

    return (
        <div className="mainDiv">
            <Navbar />

            <div className="settingsDiv">

                <CategoriesList expandedId={expandedCategory} setExpandedId={setExpandedCategory} expandedSubCategory={selectedSubcategory} setSubCategoryId={setSubcategory} />

                <div className="priceDiv">
                    <strong style={{ alignSelf: "center", textAlign: "center", marginTop: "20px", fontSize: "25px" }}>Price range</strong>
                    <div style={{ display: "flex", flexDirection: "row", width: "90%", alignSelf: "center", marginTop: "0px", fontSize: "25px" }}>
                        {"€0" /* set to lowest in selection */}
                        <input
                            style={{ flex: 1 }}
                            id="typeinp"
                            type="range"
                            min="0" max="99"
                            value={priceFilter}
                            onChange={(e) => { setPriceFilter(e.target.valueAsNumber) }}
                            step="1">
                        </input>

                        {"€99" /* set to highest in selection */}
                    </div>
                    <p style={{ textAlign: "center", marginTop: "0px", fontSize: "25px" }}>€{priceFilter}</p>
                </div>
            </div>

            <ProductListComponent/>
        </div>
    );
}