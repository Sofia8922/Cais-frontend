import { useState } from "react";
import CategoriesList from "../components/CategoriesList";

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
        }}>

            <CategoriesList/>
            
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
    );
}