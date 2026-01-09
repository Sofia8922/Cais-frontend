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
            height: "70%",
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
                    .sort((a, b) => a.id - b.id)
                    .map((category) => (
                        <div key={category.id}
                            style={{ fontSize: "25px", marginLeft: "15px", marginTop: "0px", marginBottom: "0px" }}
                            onClick={() => { expandedId?.id == category.id ? setExpandedId() : setExpandedId(category); setSubCategoryId() }}>
                                {category.subcategories.length == 0 ? <></> : <>
                            {expandedId?.id == category.id ? <strong style={{ cursor: "pointer", margin: "0px" }}>{category.name}</strong> : <p style={{ cursor: "pointer", margin: "0px" }}>{category.name}</p>}
                            {expandedId?.id == category.id && category.subcategories?.length > 0 && (
                                category.subcategories
                                    .sort((a, b) => a.id - b.id)
                                    .map(sc =>
                                        <>
                                            {expandedSubCategory?.id == sc.id ?

                                                <div className="category-text"
                                                    onClick={(e) => { e.stopPropagation(); setSubCategoryId() }}>
                                                    <strong >{"> " + sc.name}</strong>
                                                </div>
                                                :
                                                <div className="category-text"
                                                    onClick={(e) => { e.stopPropagation(); setSubCategoryId(sc) }}>
                                                    {"> " + sc.name}
                                                </div>
                                            }
                                        </>
                                    )
                            )}</>}
                        </div>
                    )))}









        </div>
    )
}