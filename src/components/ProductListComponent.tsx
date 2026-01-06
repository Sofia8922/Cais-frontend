import { useEffect, useRef, useState } from "react";
import { API_URL } from "../App";
import { useQuery } from "@tanstack/react-query";
import ProductComponent from "./ProductComponent";
import { data } from "./Data";
import { ProductDTOList } from "../dtos/ProductDTOs.tsx";
import { useParams } from "react-router-dom";

export default function ProductListComponent({ expandedCategory, expandedSubCategory, maxPrice, setPriceRange, setPriceFilter }) {
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


    useEffect(() => {
        isRangeSet.current = false;
    }, [expandedCategory, expandedSubCategory]);

    const isRangeSet = useRef(false);
    useEffect(() => {
        if (!filteredProducts?.length) return;
        if (isRangeSet.current) return;

        const prices = filteredProducts.map(p => p.price);

        setPriceRange({
            minPrice: Math.min(...prices),
            maxPrice: Math.max(...prices),
        });
        //setPriceFilter(Math.min(...prices))

        isRangeSet.current = true;
    }, [filteredProducts, setPriceRange]);


    const priceFilteredProducts = filteredProducts?.filter(p => p.price <= maxPrice);



    if (isProductListLoading) {
        return <>loading...</>
    }

    if (productListError) {
        return <>loading error</>
    }

    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <p style={{ fontSize: "30px", margin: "0px" }}>
                Showing {searchFilter ? "results for " + searchFilter : "products"} in {
                expandedCategory ? (expandedSubCategory ? expandedSubCategory.name : expandedCategory.name) : "all categories"}</p>
            <div style={{
                flex: 1, display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                padding: "20px"
            }}>
                {priceFilteredProducts && priceFilteredProducts?.length > 0 ? (
                    priceFilteredProducts
                        .map((product, index) => (
                            <ProductComponent key={index} product={product} />
                        )))
                    : (<>no products found</>)}
            </div>
        </div>
    )
}