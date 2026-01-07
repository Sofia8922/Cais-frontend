import { useState } from "react";
import ProductCreateComponent from "./ProductCreateComponent";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../App";
import { ProductDTO, ProductDTOList } from "../dtos/ProductDTOs";
import ProductTile from "./ProductTile";
import ProductEditComponent from "./ProductEditComponent";
import { CategoryDTOList } from "../dtos/CategoryDTOs";
import AdminCategoryComponent from "./AdminSubCategoryComponent";
import AdminSubCategoryComponent from "./AdminSubCategoryComponent";

export default function CategoryPopupContent() {


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
        <div style={{ alignSelf: "flex-start", overflowY: "scroll" }}>
            {categoryList && categoryList?.length > 0 && (
                categoryList
                    .map((category: any) => (
                        <div style={{ fontSize: "25px", marginLeft: "15px", marginTop: "0px", marginBottom: "0px" }}>
                            <strong style={{ cursor: "pointer", margin: "0px" }}>{category.name}</strong>
                            {category.subcategories?.length > 0 && (
                                category.subcategories.map(sc =>
                                    <>
                                        <AdminSubCategoryComponent subcategory={sc} />
                                    </>
                                )
                            )}
                            <button style={{ marginLeft: "20px", marginTop: "5px", height: "40px", alignSelf: "center" }}
                                onClick={() => {/* mutate */ }}>Add subcategory</button>
                        </div>
                    )))}
        </div>
    )

}