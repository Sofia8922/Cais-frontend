import { API_URL } from "../App";
import { useQuery } from "@tanstack/react-query";
import { ProductDTOList } from "../dtos/ProductDTOs.tsx";
import { useState } from "react";
import PriceFormat from "./PriceFormat.tsx";

export default function ProductListAdminComponent() {  
    const [search, setSearch] = useState({value: ""});

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
    if (filteredProducts && search.value && filteredProducts.length > 0) {
        filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(search.value));
    }

    return(
    <>
        <h3>{search.value}</h3>

        <input type="text" placeholder="Search..."
            onKeyDown={(evt: any) => {
            const keyCode = evt.keyCode;
            if (keyCode == 13) {
                evt.preventDefault();
                setSearch({...search, value: evt.target.value.toLowerCase()});
            };
          }}/>

        <table>
            <tr key={0}>
                <th>Name:</th>
                <th>Stock:</th>
                <th>Price:</th>
                <th>Orders:</th>
            </tr>
        {filteredProducts && filteredProducts?.length > 0 ? (      
            filteredProducts
                .map((product) => (
                    <tr key={product.id} style={product.id % 2 === 0 ? {background: "red"}: {background: "green"}}>
                        <th>{product.name}</th>
                        <th>Stock: {product.stock}</th>
                        <th><PriceFormat priceNumber={product.price} /></th>
                        <th>{(product.purchases) ? product.purchases?.length : "error"}</th>
                    </tr>
                )))
        : (<>no products found</>)}
        </table>

        <button onClick={() => {console.log("click!")}} >Add product</button>
    </>
    )
}