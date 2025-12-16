import { useState } from "react";
import { API_URL } from "../App";
import { useQuery } from "@tanstack/react-query";
import ProductComponent from "./ProductComponent";
import { data } from "./Data";
import { ProductDTOList } from "../dtos/ProductDTOs.tsx";
import { useParams } from "react-router-dom";

export default function ProductListComponent({ expandedCategory, expandedSubCategory, maxPrice, setPriceRange }) {
    const { searchFilter } = useParams<{ searchFilter: string }>();


    const {
        data: productList,
        isLoading: isProductListLoading,
        error: productListError
    } = useQuery<ProductDTOList>({
        queryKey: ["productList"],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/products`);
            if (!response.ok) {
                throw new Error("error")
            }
            return response.json();
        },
    })

    if (isProductListLoading) {
        return <>loading...</>
    }

    if (productListError) {
        return <>loading error</>
    }


    let filteredProducts = productList;
    if (filteredProducts) {

        if (expandedSubCategory) {
            filteredProducts = filteredProducts?.filter(p => p?.subcategory.id == expandedSubCategory.id);
        }
        else if (expandedCategory) {
            filteredProducts = filteredProducts?.filter(p => p?.subcategory.category.id == expandedCategory.id);
        }
        if (searchFilter && filteredProducts && filteredProducts.length > 0) {
            filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchFilter.toLowerCase()));
        }


        // const range={
        //     minPrice: Math.min(...filteredProducts?.map(p => p.price)),
        //     maxPrice: Math.max(...filteredProducts?.map(p => p.price))
        // }
        // setPriceRange();
    }



    filteredProducts = filteredProducts?.filter(p => p.price <= maxPrice);




    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <p style={{ fontSize: "30px", margin: "0px" }}>
                Showing {searchFilter ? "results for " + searchFilter : "products"} in 
                {expandedCategory ? (expandedSubCategory ? expandedSubCategory.name : expandedCategory.name) : "all categories"}</p>
            <div style={{
                flex: 1, display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                padding: "20px"
            }}>
                {filteredProducts && filteredProducts?.length > 0 ? (
                    filteredProducts
                        .map((product, index) => (
                            <ProductComponent key={index} product={product} />
                        )))
                    : (<>no products found</>)}
            </div>
        </div>
    )
}