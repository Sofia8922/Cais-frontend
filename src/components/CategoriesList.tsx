import { useState } from "react";

export default function CategoriesList({ expandedId, setExpandedId, subCategoryId, setSubCategoryId }) {

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
            flexDirection: "column",
            color: "white"
        }}>
            <div style={{ fontSize: "25px", marginLeft: "15px", marginTop: "0px", marginBottom: "0px" }}
                onClick={() => {expandedId == 1 ? setExpandedId(NaN) : setExpandedId(1); setSubCategoryId(NaN)}}>
                {expandedId == 1 ? <strong style={{ cursor: "pointer", margin: "0px" }}>catName</strong> : <p style={{ cursor: "pointer", margin: "0px" }}>catName</p>}
                {expandedId == 1 && (
                    <>
                        {subCategoryId == 1 ?
                        
                            <div style={{ fontSize: "25px", marginLeft: "20px", marginTop: "0px", marginBottom: "0px", cursor: "pointer" }}
                                onClick={(e) => {e.stopPropagation(); setSubCategoryId(NaN)}}>
                                <strong >{"> " + "subCatName"}</strong>
                            </div>
                            :
                            <div style={{ fontSize: "25px", marginLeft: "20px", marginTop: "0px", marginBottom: "0px", cursor: "pointer" }}
                                onClick={(e) => {e.stopPropagation(); setSubCategoryId(1)}}>
                                {"> " + "subCatName"}
                            </div>
                        }

                        {subCategoryId == 2 ?
                            <div style={{ fontSize: "25px", marginLeft: "20px", marginTop: "0px", marginBottom: "0px", cursor: "pointer" }}
                                onClick={(e) => {e.stopPropagation(); setSubCategoryId(NaN)}}>
                                <strong>{"> " + "subCatName"}</strong>
                            </div>
                            :
                            <div style={{ fontSize: "25px", marginLeft: "20px", marginTop: "0px", marginBottom: "0px", cursor: "pointer" }}
                                onClick={(e) => {e.stopPropagation(); setSubCategoryId(2)}}>
                                {"> " + "subCatName"}
                            </div>
                        }
                    </>
                )}
            </div>





            <div style={{ fontSize: "25px", marginLeft: "15px", marginTop: "0px", marginBottom: "0px" }}
                onClick={() => {expandedId == 2 ? setExpandedId(NaN) : setExpandedId(2); setSubCategoryId(NaN)}}>
                {expandedId == 2 ? <strong style={{ cursor: "pointer", margin: "0px" }}>catName</strong> : <p style={{ cursor: "pointer", margin: "0px" }}>catName</p>}
                {expandedId == 2 && (
                    <>
                        {subCategoryId == 1 ?
                        
                            <div style={{ fontSize: "25px", marginLeft: "20px", marginTop: "0px", marginBottom: "0px", cursor: "pointer" }}
                                onClick={(e) => {e.stopPropagation(); setSubCategoryId(NaN)}}>
                                <strong >{"> " + "subCatName"}</strong>
                            </div>
                            :
                            <div style={{ fontSize: "25px", marginLeft: "20px", marginTop: "0px", marginBottom: "0px", cursor: "pointer" }}
                                onClick={(e) => {e.stopPropagation(); setSubCategoryId(1)}}>
                                {"> " + "subCatName"}
                            </div>
                        }

                        {subCategoryId == 2 ?
                            <div style={{ fontSize: "25px", marginLeft: "20px", marginTop: "0px", marginBottom: "0px", cursor: "pointer" }}
                                onClick={(e) => {e.stopPropagation(); setSubCategoryId(NaN)}}>
                                <strong>{"> " + "subCatName"}</strong>
                            </div>
                            :
                            <div style={{ fontSize: "25px", marginLeft: "20px", marginTop: "0px", marginBottom: "0px", cursor: "pointer" }}
                                onClick={(e) => {e.stopPropagation(); setSubCategoryId(2)}}>
                                {"> " + "subCatName"}
                            </div>
                        }

                        {subCategoryId == 3 ?
                            <div style={{ fontSize: "25px", marginLeft: "20px", marginTop: "0px", marginBottom: "0px", cursor: "pointer" }}
                                onClick={(e) => {e.stopPropagation(); setSubCategoryId(NaN)}}>
                                <strong>{"> " + "subCatName"}</strong>
                            </div>
                            :
                            <div style={{ fontSize: "25px", marginLeft: "20px", marginTop: "0px", marginBottom: "0px", cursor: "pointer" }}
                                onClick={(e) => {e.stopPropagation(); setSubCategoryId(3)}}>
                                {"> " + "subCatName"}
                            </div>
                        }
                    </>
                )}
            </div>







        </div>
    )
}