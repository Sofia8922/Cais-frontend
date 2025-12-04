import { useState } from "react";

export default function CategoriesList() {
    
    const [expandedId, setExpandedId] = useState(NaN);

    return (
        <div style={{
                height: "60%",
                width: "300px",
                background: "black",
                border: "2px solid white",
                borderRadius: "10px",
                margin: "8px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column"
            }}>
                <div style={{ fontSize: "25px", marginLeft: "15px", marginTop: "0px", marginBottom: "0px" }}
                onClick={() => setExpandedId(1)}>
                    <p style={{cursor: "pointer", margin: "0px"}}>catName</p>
                    {expandedId == 1 && (
                        <>
                            <div style={{ fontSize: "25px", marginLeft: "20px", marginTop: "0px", marginBottom: "0px", cursor: "pointer" }}
                                onClick={() => {/* change page here? */ }}>
                                {"> " + "subCatName"}
                            </div>
                            <div style={{ fontSize: "25px", marginLeft: "20px", marginTop: "0px", marginBottom: "0px", cursor: "pointer" }}
                                onClick={() => {/* change page here? */ }}>
                                {"> " + "subCatName"}
                            </div>
                        </>
                    )}
                </div>

                <div style={{ fontSize: "25px", marginLeft: "15px", marginTop: "0px", marginBottom: "0px" }}
                onClick={() => setExpandedId(2)}>
                    <p style={{cursor: "pointer", margin: "0px"}}>catName</p>
                    {expandedId == 2 && (
                        <>
                            <div style={{ fontSize: "25px", marginLeft: "20px", marginTop: "0px", marginBottom: "0px", cursor: "pointer" }}
                                onClick={() => {/* change page here? */ }}>
                                {"> " + "subCatName"}
                            </div>
                            <div style={{ fontSize: "25px", marginLeft: "20px", marginTop: "0px", marginBottom: "0px", cursor: "pointer" }}
                                onClick={() => {/* change page here? */ }}>
                                {"> " + "subCatName"}
                            </div>
                        </>
                    )}
                </div>




            </div>
    )
}