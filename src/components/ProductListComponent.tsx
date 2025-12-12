import { useState } from "react";
import { API_URL } from "../App";
import { useQuery } from "@tanstack/react-query";
import ProductComponent from "./ProductComponent";
import { data } from "./Data";
import { ProductDTOList } from "../dtos/ProductDTOs.tsx";
import { useParams } from "react-router-dom";

export default function ProductListComponent() {
    const { searchFilter } = useParams<{ searchFilter: string }>();
    const [expandedCategory, setExpandedCategory] = useState(NaN);
    const [selectedSubcategory, setSubcategory] = useState(NaN);

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

    if(isProductListLoading) {
        return <>loading...</>
    }

    if(productListError) {
        return <>loading error</>
    }

    console.log(productList);

     return <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: "30px", margin: "0px" }}>
                    Showing {searchFilter ? "results for " + searchFilter : "products"} in {expandedCategory ? (selectedSubcategory ? "subcat " + selectedSubcategory : "cat " + expandedCategory) : "all categories"}</p>
                <div style={{
                    flex: 1, display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    padding: "20px"
                }}>
                    {productList && productList?.length > 0 ? (
                        productList.map((product, index) => (
                        <ProductComponent key={index} product={product} />
                    )))
                    : (<>no products found</>)}
                </div>
    </div>
}