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
import GetExcel from "../components/GetExcel";

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

                <div className="priceDiv">
                    <strong style={{ alignSelf: "center", textAlign: "center", marginTop: "20px", fontSize: "23px" }}>Price range</strong>
                    <div style={{ display: "flex", flexDirection: "row", width: "90%", alignSelf: "center", marginTop: "0px", fontSize: "23px", justifyContent: "center", alignItems: "center" }}>
                        <p style={{ textAlign: "left", margin: "0px" }}><PriceFormat priceNumber={priceRange.minPrice}/></p>
                        
                        <input
                            style={{ flex: 1 }}
                            id="typeinp"
                            type="range"
                            min={priceRange.minPrice} max={priceRange.maxPrice}
                            value={priceFilter}
                            onChange={(e) => { setPriceFilter(e.target.valueAsNumber) }}
                            step=".05">
                        </input>

                        <p style={{ textAlign: "right", margin: "0px" }}><PriceFormat priceNumber={priceRange.maxPrice}/></p>
                    </div>
                    {
                        priceFilter > priceRange.maxPrice ?
                        <p style={{ textAlign: "center", marginTop: "0px", fontSize: "25px" }}>€ -</p>
                        :
                        <p style={{ textAlign: "center", marginTop: "0px", fontSize: "25px" }}><PriceFormat priceNumber={priceFilter}/></p>
                    }
                </div>

                {account?.roles.some(role => role === "ADMIN") ?
                <>
                    <button style={{ width: "90%", height: "50px", alignSelf: "center", margin: "5px"}}
                        onClick={() => openMenu(menuStates.PRODUCT)}>Manage products</button>
                    
                    <button style={{ width: "90%", height: "50px", alignSelf: "center", margin: "5px"}}
                        onClick={() => openMenu(menuStates.CATEGORIES)}>Manage categories</button>
                    
                    <button style={{ width: "90%", height: "50px", alignSelf: "center", margin: "5px"}}
                        onClick={() => openMenu(menuStates.ACCOUNTS)}>Manage accounts</button>
                    
                    <GetExcel/>

                    {(whichMenuIsOpened === menuStates.PRODUCT &&
                        <ProductMenu closeFunction={() => openMenu(menuStates.NONE)}/>)}
                    {(whichMenuIsOpened === menuStates.CATEGORIES &&
                        <button onClick={() => openMenu(menuStates.NONE)}>CATEGORIES</button>)}
                    {(whichMenuIsOpened === menuStates.ACCOUNTS &&
                        <button onClick={() => openMenu(menuStates.NONE)}>ACCOUNTS</button>)}
                </>
                : <></>}

            </div>

            <ProductListComponent expandedCategory={expandedCategory} expandedSubCategory={selectedSubcategory} maxPrice={priceFilter} setPriceRange={setPriceRange} priceRange={priceRange} setPriceFilter={setPriceFilter} />

        </div>
    );
}