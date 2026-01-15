import { useEffect, useState } from "react";
import ProductCreateComponent from "./ProductCreateComponent";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../App";
import { ProductDTO, ProductDTOList } from "../dtos/ProductDTOs";
import ProductTile from "./ProductTile";
import ProductEditComponent from "./ProductEditComponent";

export default function PopupContent() {
    enum state { OVERVIEW, CREATE_PRODUCT, EDIT_PRODUCT }
    const [mode, setMode] = useState(state.OVERVIEW)

    const [searchString, setSearchString] = useState("")
    const [viewedProduct, setViewedProduct] = useState<ProductDTO>()


    const viewProduct = (product: ProductDTO) => {
        setViewedProduct(product);
        setMode(state.EDIT_PRODUCT);
    }

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
    useEffect(() => {
        console.log("productList updated", productList);
    }, [productList]);

    if (mode === state.CREATE_PRODUCT) return (<ProductCreateComponent closeFunction={() => { setMode(state.OVERVIEW) }} />);
    if (mode === state.EDIT_PRODUCT) return (<ProductEditComponent closeFunction={() => { setMode(state.OVERVIEW) }} product={viewedProduct} />);
    return (
        <div style={{ width: "100%", height: "100%", position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>

            <textarea
                id="description"
                name="description"
                value={searchString}
                onChange={(e) => {setSearchString(e.target.value)}}
                disabled={false}
                placeholder="Search"
                style={{
                    width: "90%",
                    height: "60px",
                    background: "#3e2d22",
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
                        <p style={{ textAlign: "left", width: "25%" }}>Name</p>
                        <p style={{ textAlign: "left", width: "25%" }}>Stock</p>
                        <p style={{ textAlign: "left", width: "25%" }}>Price</p>
                        <p style={{ textAlign: "left", width: "25%" }}>Orders</p>
                    </div >
                    <div style={{ width: "85%", overflowY: "scroll", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        {productList?.map((product) => (
                            <ProductTile product={product} setMode={() => viewProduct(product)} key={product.id} />
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

            <button
                className="admin-button"
                style={{ height: "50px", width: "250px", position: "absolute", bottom: "0" }}
                onClick={() => { setMode(state.CREATE_PRODUCT) }}
            >add product
            </button>
        </div>
    )

}