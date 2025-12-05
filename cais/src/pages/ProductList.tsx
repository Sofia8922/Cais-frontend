import { useState } from "react";
import CategoriesList from "../components/CategoriesList";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

export default function ProductList() {
    const [priceFilter, setPriceFilter] = useState(0);
    const [expandedCategory, setExpandedCategory] = useState(NaN);
    const { searchFilter } = useParams<{ searchFilter: string }>();


    return (
        <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            color: "white"
        }}>
            <Navbar />

            <div style={{
                height: "90vh",
                display: "flex",
                flexDirection: "column",
            }}>

                <CategoriesList expandedId={expandedCategory} setExpandedId={setExpandedCategory}/>

                <div style={{
                    height: "15%",
                    width: "300px",
                    background: "black",
                    border: "2px solid white",
                    borderRadius: "10px",
                    margin: "8px",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column"
                }}>
                    <strong style={{ alignSelf: "center", textAlign: "center", marginTop: "20px", fontSize: "25px" }}>Price range</strong>
                    <div style={{ display: "flex", flexDirection: "row", width: "90%", alignSelf: "center", marginTop: "0px", fontSize: "20px" }}>
                        {"1" /* set to lowest in selection */}
                        <input
                            style={{ flex: 1 }}
                            id="typeinp"
                            type="range"
                            min="0" max="99"
                            value={priceFilter}
                            onChange={(e) => { setPriceFilter(e.target.valueAsNumber) }}
                            step="1">
                        </input>

                        {"99" /* set to highest in selection */}
                    </div>
                    <p style={{ textAlign: "center", marginTop: "0px", fontSize: "25px" }}>{priceFilter}</p>
                </div>
            </div>



            <div style={{flex: 1, display: "flex", flexDirection: "column"}}>
                <p style={{fontSize: "30px", margin: "0px"}}>Showing {searchFilter ? "results for " + searchFilter : "products"} in {true ? expandedCategory : "all categories"}</p>
                <div style={{
                    flex: 1, display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    padding: "20px"
                }}>


                    <div //key={project.id}
                        style={{
                            height: "400px",
                            width: "300px",
                            display: "flex",
                            marginBottom: "16px",
                            border: "2px solid white",
                            borderRadius: "10px",
                            cursor: "pointer",
                            justifyContent: "center",
                            marginRight: "16px",
                            flexDirection: "column",
                            overflow: "hidden",
                            position: "relative"
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background = "rgba(0, 0, 0, 1)";
                            const image = e.currentTarget.querySelector(".image") as HTMLElement;
                            if (image) image.style.background = "rgba(247, 199, 85, 1)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(0, 0, 0, 0)";
                            const image = e.currentTarget.querySelector(".image") as HTMLElement;
                            if (image) image.style.background = "rgba(252, 225, 94, 1)";
                        }}
                        onClick={() => { /*navigate(`/projects/${project.id}`)*/ }}
                    >
                        <div
                            className="image"
                            style={{
                                flex: 1,
                                background: "rgba(252, 225, 94, 1)",
                                display: "flex",
                                justifyContent: "center",
                                margin: "10px",
                                borderRadius: "10px"

                            }}
                        />
                        <div style={{ height: "50px", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <strong style={{ fontSize: "30px", textAlign: "center", padding: "16px", }}>productName</strong>

                            <strong style={{ fontSize: "30px", textAlign: "center", padding: "16px", }}>$9</strong>

                        </div>
                    </div>

                    {/* can remove down here lol */}
                    <div //key={project.id}
                        style={{
                            height: "400px",
                            width: "300px",
                            display: "flex",
                            marginBottom: "16px",
                            border: "2px solid white",
                            borderRadius: "10px",
                            cursor: "pointer",
                            justifyContent: "center",
                            marginRight: "16px",
                            flexDirection: "column",
                            overflow: "hidden",
                            position: "relative"
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background = "rgba(0, 0, 0, 1)";
                            const image = e.currentTarget.querySelector(".image") as HTMLElement;
                            if (image) image.style.background = "rgba(247, 199, 85, 1)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(0, 0, 0, 0)";
                            const image = e.currentTarget.querySelector(".image") as HTMLElement;
                            if (image) image.style.background = "rgba(252, 225, 94, 1)";
                        }}
                        onClick={() => { /*navigate(`/projects/${project.id}`)*/ }}
                    >
                        <div
                            className="image"
                            style={{
                                flex: 1,
                                background: "rgba(252, 225, 94, 1)",
                                display: "flex",
                                justifyContent: "center",
                                margin: "10px",
                                borderRadius: "10px"

                            }}
                        />
                        <div style={{ height: "50px", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <strong style={{ fontSize: "30px", textAlign: "center", padding: "16px", }}>productName</strong>

                            <strong style={{ fontSize: "30px", textAlign: "center", padding: "16px", }}>$9</strong>

                        </div>
                    </div>





                </div>
            </div>
        </div>
    );
}