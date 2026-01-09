import { useState } from "react";
import { API_URL } from "../App";
import { useQuery } from "@tanstack/react-query";
import { CategoryDTOList } from "../dtos/CategoryDTOs";
import "../stylesheets/productlist.css"

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
        <div className="categories-list" >
            {categoryList && categoryList?.length > 0 && (
                categoryList
                    .sort((a, b) => a.id - b.id)
                    .map((category) => (
                        <div key={category.id} className="category-title"
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