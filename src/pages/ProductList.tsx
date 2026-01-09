import { cloneElement, useState } from "react";
import CategoriesList from "../components/CategoriesList";
import Navbar from "../components/Navbar";
import Price from "../components/Price"
import "../stylesheets/productlist.css"
import ProductComponent from "../components/ProductComponent";
import ProductListComponent from "../components/ProductListComponent";
import { CategoryDTO, SubCategoryDTO } from "../dtos/CategoryDTOs";
import ProductMenu from "../components/ProductMenu";
import { useUserStore } from "../Stores/userStore";
import PriceFormat from "../components/PriceFormat";
import CategoryMenu from "../components/CategoryMenu";
import GetExcel from "../components/GetExcel";
import AccountOverview from "../components/AccountOverview";

export default function ProductList() {
    const account = useUserStore((state) => state.user);
    const [expandedCategory, setExpandedCategory] = useState<CategoryDTO>();
    const [selectedSubcategory, setSubcategory] = useState<SubCategoryDTO>();
    const [priceRange, setPriceRange] = useState({ minPrice: 0, maxPrice: 99 })
    const [priceFilter, setPriceFilter] = useState(priceRange.maxPrice + 1);

    enum menuStates {NONE, PRODUCT, CATEGORIES, ACCOUNTS};
    const [whichMenuIsOpened, openMenu] = useState(menuStates.NONE)

    return (
        <div className="mainDiv">
            <div className="settingsDiv">

                <CategoriesList expandedId={expandedCategory} setExpandedId={setExpandedCategory} expandedSubCategory={selectedSubcategory} setSubCategoryId={setSubcategory} />

                <div className="price-container">
                    <strong className="price-title">Price range</strong>
                    <div className="price-values">
                        <p style={{ textAlign: "left", margin: "0px", color: "wheat" }}><PriceFormat priceNumber={priceRange.minPrice} /></p>

                        <input
                            id="typeinp"
                            type="range"
                            min={priceRange.minPrice} max={priceRange.maxPrice}
                            value={priceFilter}
                            onChange={(e) => { setPriceFilter(e.target.valueAsNumber) }}
                            step=".05">
                        </input>

                        <p style={{ textAlign: "right", margin: "0px", color: "wheat" }}><PriceFormat priceNumber={priceRange.maxPrice} /></p>
                    </div>
                    {
                        priceFilter > priceRange.maxPrice ?
                            <p style={{ textAlign: "center", marginTop: "0px", fontSize: "25px" }}>€ -</p>
                            :
                            <p style={{ textAlign: "center", marginTop: "0px", fontSize: "25px" }}><PriceFormat priceNumber={priceFilter} /></p>
                    }
                </div>

                {account?.roles.some(role => role === "ADMIN") &&
                <>
                    <button className="admin-button" 
                        onClick={() => openMenu(menuStates.PRODUCT)}>Manage products</button>
                    
                    <button className="admin-button"
                        onClick={() => openMenu(menuStates.CATEGORIES)}>Manage categories</button>
                    
                    <button className="admin-button"
                        onClick={() => openMenu(menuStates.ACCOUNTS)}>Manage accounts</button>
                    
                    <GetExcel/>

                    {(whichMenuIsOpened === menuStates.PRODUCT &&
                        <ProductMenu closeFunction={() => openMenu(menuStates.NONE)}/>)}
                    {(whichMenuIsOpened === menuStates.CATEGORIES &&
                        <CategoryMenu closeFunction={() => openMenu(menuStates.NONE)} />)}
                    {(whichMenuIsOpened === menuStates.ACCOUNTS &&
                        <AccountOverview closeFunction={() => openMenu(menuStates.NONE)} />)}
                </>
                }

            </div>

            <ProductListComponent expandedCategory={expandedCategory} expandedSubCategory={selectedSubcategory} maxPrice={priceFilter} setPriceRange={setPriceRange} priceRange={priceRange} setPriceFilter={setPriceFilter} />

        </div>
    );
}