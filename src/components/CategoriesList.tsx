import { useState } from "react";
import { API_URL } from "../App";
import { useQuery } from "@tanstack/react-query";
import { CategoryDTOList } from "../dtos/CategoryDTOs";

export default function CategoriesList({ expandedId, setExpandedId, expandedSubCategory, setSubCategoryId }) {


    const {
        data: categoryList,
        isLoading: isCategoryListLoading,
        error: categoryListError
    } = useQuery<CategoryDTOList>({
        queryKey: ["categoryList"],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/categories`);
            if (!response.ok) {
                throw new Error("error")
            }
            return response.json();
        },
    })


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
            color: "white",
            overflowY: "scroll"
        }}>
            {categoryList && categoryList?.length > 0 && (
                categoryList
                    .map((category) => (
                        <div style={{ fontSize: "25px", marginLeft: "15px", marginTop: "0px", marginBottom: "0px" }}
                            onClick={() => { expandedId == category.id ? setExpandedId(NaN) : setExpandedId(category.id); setSubCategoryId(NaN) }}>
                            {expandedId == category.id ? <strong style={{ cursor: "pointer", margin: "0px" }}>{category.name}</strong> : <p style={{ cursor: "pointer", margin: "0px" }}>{category.name}</p>}
                            {expandedId == category.id && category.subcategories?.length > 0 && (
                                category.subcategories.map(sc =>
                                    <>
                                        {expandedSubCategory == sc.id ?

                                            <div className="category-text"
                                                onClick={(e) => { e.stopPropagation(); setSubCategoryId(NaN) }}>
                                                <strong >{"> " + sc.name}</strong>
                                            </div>
                                            :
                                            <div className="category-text"
                                                onClick={(e) => { e.stopPropagation(); setSubCategoryId(sc.id) }}>
                                                {"> " + sc.name}
                                            </div>
                                        }
                                    </>
                                )
                            )}
                        </div>
                    )))}









        </div>
    )
}