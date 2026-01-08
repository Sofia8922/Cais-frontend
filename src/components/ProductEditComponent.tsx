import { useState } from "react"
import { SubCategoryDTOList } from "../dtos/CategoryDTOs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../App";
import { ProductDTO, ProductEditDTO } from "../dtos/ProductDTOs";
import Purchase from "./Purchase";

export default function ProductEditComponent({ product }: { product: ProductDTO }) {
    const [nameString, setNameString] = useState(product.name);
    const [descString, setDescString] = useState(product.description);
    const queryClient = useQueryClient();

    const {
        data: subcategoryList,
        isLoading: isSubcategoryListLoading,
        error: subcategoryListError
    } = useQuery<SubCategoryDTOList>({
        queryKey: ["subCategoryList"],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/subcategories`);
            if (!response.ok) {
                throw new Error("error")
            }
            return response.json();
        },
    })


    const editProduct = useMutation({
        mutationFn: async (editData: ProductEditDTO) => {
            const response = await fetch(`${API_URL}/products/${product.id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(editData),
                    credentials: "include"
                });
            if (!response.ok) throw new Error("error saving product.")
            return response.json();
        },
        onSuccess: (response) => {
            console.log(response.message);
            queryClient.invalidateQueries({ queryKey: ["productList"]
    });
        }
    })


    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row" }}>
            <div style={{ width: "50%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <p style={{ width: "90%", textAlign: "left", margin: "5px", fontSize: "25px" }}>Name:</p>
                <textarea
                    id="name"
                    name="name"
                    value={nameString}
                    onChange={(e) => setNameString(e.target.value)}
                    disabled={false}
                    placeholder="Name"
                    style={{
                        width: "90%",
                        height: "60px",
                        background: "rgba(30, 30, 30, 1)",
                        border: "2px solid white",
                        borderRadius: "10px",
                        cursor: "text",
                        resize: "none",
                        fontSize: "30px",
                        color: "white",
                    }}
                />

                <p style={{ width: "90%", textAlign: "left", margin: "5px", fontSize: "25px" }}>Description:</p>
                <textarea
                    id="description"
                    name="description"
                    value={descString}
                    onChange={(e) => setDescString(e.target.value)}
                    disabled={false}
                    placeholder="Description"
                    style={{
                        width: "90%",
                        height: "300px",
                        background: "rgba(30, 30, 30, 1)",
                        border: "2px solid white",
                        borderRadius: "10px",
                        cursor: "text",
                        resize: "none",
                        fontSize: "30px",
                        color: "white",
                    }}
                />

                <label style={{ width: "90%", textAlign: "left", margin: "5px", fontSize: "25px" }}>
                    Subcategory:
                    <select name="subcategory" defaultValue={product.subcategory.id} style={{ height: "30px" }}>
                        {subcategoryList?.map(c => <option value={c.id}>{c.name}</option>)}
                    </select>
                </label>


                <button style={{ height: "50px", width: "250px", marginTop: "350px" }}
                    onClick={() => editProduct.mutate({
                        name: nameString,
                        description: descString,
                        price: product.price,
                        stock: product.stock,
                        imageLink: product.imageLink,
                        subcategoryId: product.subcategory.id
                    })}>Save</button>

            </div>



            <div style={{ width: "50%", display: "flex", flexDirection: "column", alignItems: "center", background: "rgba(21, 21, 21, 1)", fontSize: "25px" }}>
                <strong style={{ width: "90%", textAlign: "center", margin: "5px", fontSize: "25px" }}>Orders:</strong>
                {product.purchases.map(p => <Purchase purchase={p}/>)}
            </div>

        </div>
    )
}