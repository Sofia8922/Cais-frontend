import { cloneElement, useState } from "react";
import CategoriesList from "../components/CategoriesList";
import Navbar from "../components/Navbar";
import Price from "../components/Price"
import "../stylesheets/productlist.css"
import ProductComponent from "../components/ProductComponent";
import ProductListComponent from "../components/ProductListComponent";
import { CategoryDTO, SubCategoryDTO } from "../dtos/CategoryDTOs";
import ProductMenu from "../components/ProductMenu";

export default function ProductList() {
    const [priceFilter, setPriceFilter] = useState(0);
    const [expandedCategory, setExpandedCategory] = useState<CategoryDTO>();
    const [selectedSubcategory, setSubcategory] = useState<SubCategoryDTO>();
    const [priceRange, setPriceRange] = useState({ minPrice: 0, maxPrice: 99 })

    const [isProductMenuOpened, openProductMenu] = useState(false)

    return (
        <div className="mainDiv">
            <Navbar />

            <div className="settingsDiv">

                <CategoriesList expandedId={expandedCategory} setExpandedId={setExpandedCategory} expandedSubCategory={selectedSubcategory} setSubCategoryId={setSubcategory} />

                <div className="priceDiv">
                    <strong style={{ alignSelf: "center", textAlign: "center", marginTop: "20px", fontSize: "23px" }}>Price range</strong>
                    <div style={{ display: "flex", flexDirection: "row", width: "90%", alignSelf: "center", marginTop: "0px", fontSize: "23px", justifyContent: "center", alignItems: "center" }}>
                        <p style={{ textAlign: "left", margin: "0px" }}>{"€" + priceRange.minPrice.toFixed(2)}</p>
                        <input
                            style={{ flex: 1 }}
                            id="typeinp"
                            type="range"
                            min={priceRange.minPrice} max={priceRange.maxPrice}
                            value={priceFilter}
                            onChange={(e) => { setPriceFilter(e.target.valueAsNumber) }}
                            step=".05">
                        </input>

                        <p style={{ textAlign: "right", margin: "0px" }}>{"€" + priceRange.maxPrice.toFixed(2)}</p>
                    </div>
                    <p style={{ textAlign: "center", marginTop: "0px", fontSize: "25px" }}>€{priceFilter.toFixed(2)}</p>
                </div>

                <button style={{ width: "90%", height: "50px", alignSelf: "center", margin: "5px"}}
                onClick={() => openProductMenu(true)}>Manage products</button>
                {(isProductMenuOpened && <ProductMenu closeFunction={() => openProductMenu(false)}/>)}

                <button style={{ width: "90%", height: "50px", alignSelf: "center", margin: "5px"}}>Manage categories</button>
            </div>

            <ProductListComponent expandedCategory={expandedCategory} expandedSubCategory={selectedSubcategory} maxPrice={priceFilter} setPriceRange={setPriceRange} priceRange={priceRange} setPriceFilter={setPriceFilter} />

        </div>
    );
}