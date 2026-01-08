import { useEffect, useRef, useState } from "react";
import { API_URL } from "../App";
import { useQuery } from "@tanstack/react-query";
import ProductComponent from "./ProductComponent";
import { ProductDTOList } from "../dtos/ProductDTOs.tsx";
import { useParams } from "react-router-dom";
import "../stylesheets/productList.css";

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
        <div className="product-list-container">
            <p className="product-list-title">
                Showing {searchFilter ? "results for " + searchFilter : "products"} in {
                expandedCategory ? (expandedSubCategory ? expandedSubCategory.name : expandedCategory.name) : "all categories"}</p>
            <div className="product-list-grid">
                {priceFilteredProducts && priceFilteredProducts?.length > 0 ? (
                    priceFilteredProducts
                        .map((product, index) => (
                            <ProductComponent key={index} product={product} />
                        )))
                    : (<p className="no-products">No products found</p>)}
            </div>
        </div>
    );
}