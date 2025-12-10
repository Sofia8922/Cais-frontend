import { useState } from "react";
import CategoriesList from "../components/CategoriesList";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import "../stylesheets/productlist.css"
import { data } from "../components/Data";

export default function ProductList() {
    const product = data[2];

    const [priceFilter, setPriceFilter] = useState(0);
    const [expandedCategory, setExpandedCategory] = useState(NaN);
    const [selectedSubcategory, setSubcategory] = useState(NaN);
    const { searchFilter } = useParams<{ searchFilter: string }>();


    return (
        <div className="mainDiv">
            <Navbar />

            <div className="settingsDiv">

                <CategoriesList expandedId={expandedCategory} setExpandedId={setExpandedCategory} subCategoryId={selectedSubcategory} setSubCategoryId={setSubcategory} />

                <div className="priceDiv">
                    <strong style={{ alignSelf: "center", textAlign: "center", marginTop: "20px", fontSize: "25px" }}>Price range</strong>
                    <div style={{ display: "flex", flexDirection: "row", width: "90%", alignSelf: "center", marginTop: "0px", fontSize: "25px" }}>
                        {"€1" /* set to lowest in selection */}
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



            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: "30px", margin: "0px" }}>
                    Showing {searchFilter ? "results for " + searchFilter : "products"} in {expandedCategory ? (selectedSubcategory ? "subcat " + selectedSubcategory : "cat " + expandedCategory) : "all categories"}</p>
                <div style={{
                    flex: 1, display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    padding: "20px"
                }}>
                    <div className="productDiv"
                        //key={product.id}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background = "rgba(20, 20, 20, 1)";
                            const image = e.currentTarget.querySelector(".productImage") as HTMLElement;
                            if (image) {
                                image.style.filter = "hue-rotate(5deg) saturate(1) brightness(0.9)";
                                image.style.background = "rgba(0, 0, 0, 1)"
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(25, 25, 25, 1)";
                            const image = e.currentTarget.querySelector(".productImage") as HTMLElement;
                            if (image) {
                                image.style.filter = "hue-rotate(0deg) saturate(1) brightness(1)";
                                image.style.background = "rgba(15, 15, 15, 1)"
                            }
                        }}
                        onClick={() => { /*navigate(`/projects/${project.id}`)*/ }}
                    >
                        <img src={product.imageLink || "/placeholder.png"} alt={product.name}
                            className="productImage"
                        />
                        <div style={{ height: "50px", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <strong style={{ fontSize: "30px", textAlign: "center", padding: "16px", }}>productName</strong>

                            <strong style={{ fontSize: "30px", textAlign: "center", padding: "16px", }}>€9</strong>

                        </div>
                    </div>

                    {/* can remove down here lol */}
                     <div className="productDiv"
                        //key={product.id}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background = "rgba(20, 20, 20, 1)";
                            const image = e.currentTarget.querySelector(".productImage") as HTMLElement;
                            if (image) {
                                image.style.filter = "hue-rotate(5deg) saturate(1) brightness(0.9)";
                                image.style.background = "rgba(0, 0, 0, 1)"
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(25, 25, 25, 1)";
                            const image = e.currentTarget.querySelector(".productImage") as HTMLElement;
                            if (image) {
                                image.style.filter = "hue-rotate(0deg) saturate(1) brightness(1)";
                                image.style.background = "rgba(15, 15, 15, 1)"
                            }
                        }}
                        onClick={() => { /*navigate(`/projects/${project.id}`)*/ }}
                    >
                        <img src={product.imageLink || "/placeholder.png"} alt={product.name}
                            className="productImage"
                        />
                        <div style={{ height: "50px", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <strong style={{ fontSize: "30px", textAlign: "center", padding: "16px", }}>productName</strong>

                            <strong style={{ fontSize: "30px", textAlign: "center", padding: "16px", }}>€9</strong>

                        </div>
                    </div>





                </div>
            </div>
        </div>
    );
}