import { useState } from "react";
import CategoriesList from "../components/CategoriesList";
import Navbar from "../components/Navbar";

export default function ProductList() {
    const [priceFilter, setPriceFilter] = useState(0);


    return (
        <div style={{
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            background: "black",
            border: "2px solid white",
            borderRadius: "10px",
            color: "white"
        }}>
            <Navbar />
            <CategoriesList/>
            
            <div style={{
                height: "90vh",
                display: "flex",
                flexDirection: "column",
                background: "black",
                border: "2px solid white",
                borderRadius: "10px",
            }}>

                <CategoriesList />

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
                    <div style={{ display: "flex", flexDirection: "row", width: "90%", alignSelf: "center", marginTop: "20px" }}>
                        {"1"}
                        <input
                            style={{ flex: 1 }}
                            id="typeinp"
                            type="range"
                            min="0" max="999"
                            value={priceFilter}
                            onChange={(e) => { setPriceFilter(e.target.valueAsNumber) }}
                            step="1">
                        </input>

                        {"999"}
                    </div>
                    <p style={{ textAlign: "center" }}>{priceFilter}</p>
                </div>
            </div>




            <div style={{ background: "rgba(20,20,20,1)", flex: 1, display: "flex", flexDirection: "row", flexWrap: "wrap", padding: "20px" }}>


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
                    <div style={{height: "50px", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
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
                    <div style={{height: "50px", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <strong style={{ fontSize: "30px", textAlign: "center", padding: "16px", }}>productName</strong>
                        
                        <strong style={{ fontSize: "30px", textAlign: "center", padding: "16px", }}>$9</strong>

                    </div>
                </div>



                

            </div>
        </div>
    );
}