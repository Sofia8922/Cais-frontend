import { useQuery } from "@tanstack/react-query";
import { useState } from "react"
import { ProductDTOList } from "../dtos/ProductDTOs";
import { API_URL } from "../App";
import ProductTile from "./ProductTile";

export default function ProductMenu({ closeFunction }) {


    const [searchString, setSearchString] = useState("")


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

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99
        }}
            onClick={closeFunction}>
            <div style={{
                width: "1200px",
                height: "700px",
                background: "black",
                border: "2px solid white",
                borderRadius: "10px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }} onClick={e => e.stopPropagation()}>
                <textarea
                    id="description"
                    name="description"
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                    disabled={false}
                    placeholder="Search"
                    style={{
                        width: "90%",
                        height: "60px",
                        background: "rgba(30, 30, 30, 1)",
                        border: "2px solid white",
                        borderRadius: "10px",
                        margin: "8px",
                        cursor: "text",
                        resize: "none",
                        fontSize: "30px",
                        marginTop: "18px",
                        color: "white",
                    }}
                />




                {productList && productList.length > 0 ? (
                    <>
                        <div style={{
                            width: "80%",
                            height: "20px",
                            background: "black",
                            margin: "8px",
                            display: "flex",
                            flexDirection: "row",
                            textAlign: "center",
                            alignItems: "center",
                            justifyContent: "space-between",
                            fontSize: "23px",
                            gap: "70px",
                            marginBottom: "0px"
                        }}>
                            <p style={{textAlign: "left", width: "25%"}}>Name</p>
                            <p style={{textAlign: "left", width: "25%"}}>Stock</p>
                            <p style={{textAlign: "left", width: "25%"}}>Price</p>
                            <p style={{textAlign: "left", width: "25%"}}>Orders</p>
                        </div >
                        <div style={{overflowY: "scroll", display: "flex", flexDirection: "column", alignItems: "center"}}>
                        {productList?.map((product) => (
                            <ProductTile product={product} key={product.id} />
                        ))}
                        {productList?.map((product) => (
                            <ProductTile product={product} key={product.id} />
                        ))}
                        </div>
                    </>
                ) : (
                    <div
                        style={{
                            width: "90%",
                            height: "60px",
                            margin: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: 0.8
                        }}
                    >
                        No products found.
                    </div>
                )}



            </div>
        </div >
    )

}