import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductCreateDTO } from "../dtos/ProductDTOs";
import { SubCategoryDTOList } from "../dtos/CategoryDTOs";
import { API_URL } from "../App";
import { cloneElement, useState } from "react";
import CustomImage from "./CustomImage";
import React from 'react';

export default function ProductCreateComponent({ closeFunction }) {
    const initialFormData = {
        name: "",
        description: "",
        price: 0,
        stock: 0,
        imageLink: "",
        subcategoryId: 0
    };

    const queryClient = useQueryClient();
    const [formData, setFormData] = useState(initialFormData);

    const [error, setError] = useState({ errorfound: false, errorMessage: "" });

    const createProduct = useMutation({
        mutationFn: async (editData: ProductCreateDTO) => {
            const response = await fetch(`${API_URL}/products`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(editData)
                });
            if (!response) throw new Error("No response.")

            if (response.ok) {
                console.log("Ok");
                setError({ errorfound: false, errorMessage: "" });
            }
            else {
                console.log("Not ok");
                setError({ errorfound: true, errorMessage: "" });
            }

            return response.json();
        },
        onSuccess: (response) => {
            console.log(response.message);
            queryClient.invalidateQueries({ queryKey: ["productList"] });
            if (error.errorfound) {
                setError({ errorfound: true, errorMessage: response.message });
            }
            else {
                setFormData(initialFormData);
            }
        },
        onError: (response) => {
            console.log("ERROR: " + response.message);
            setError({ errorfound: true, errorMessage: "Unknown error" });
        }
    })

    const handleChangeBootstrap = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleChangeBootstrapLink = (value: string) => {
        setFormData({ ...formData, imageLink: value })
    }

    const {
        data: subList
    } = useQuery<SubCategoryDTOList>({
        queryKey: ["subList"],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/subcategories`);
            if (!response.ok) {
                throw new Error("error")
            }
            return response.json();
        },
    })

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const items = e.dataTransfer.items;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            if (item.kind === 'string') {
                if (item.type === 'text/uri-list') {
                    item.getAsString((src: string) => {
                        console.log("dropped " + src);
                        handleChangeBootstrapLink(src);
                    });
                } else if (item.type === 'text/html') {
                    item.getAsString((html: string) => {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                        const img = doc.querySelector('img');
                        if (img && img.src) {
                            const src = img.src;
                            console.log("Extracted image src from HTML: " + src);
                            handleChangeBootstrapLink(src);
                        }
                    });
                }
            }
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", background: "#AB886D" }}>

            <p style={{ width: "95%", textAlign: "left", margin: "5px", fontSize: "25px" }}>Name:</p>
            <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChangeBootstrap}
                disabled={false}
                placeholder="Name"
                style={{
                    width: "95%",
                    height: "60px",
                    background: "#3e2d22",
                    border: "2px solid white",
                    borderRadius: "10px",
                    cursor: "text",
                    resize: "none",
                    fontSize: "30px",
                    color: "white",
                }}
            />

            <p style={{ width: "95%", textAlign: "left", margin: "5px", fontSize: "25px" }}>Description:</p>
            <input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChangeBootstrap}
                disabled={false}
                placeholder="Description"
                style={{
                    width: "95%",
                    height: "150px",
                    background: "#3e2d22",
                    border: "2px solid white",
                    borderRadius: "10px",
                    cursor: "text",
                    resize: "none",
                    fontSize: "30px",
                    color: "white",
                    marginBottom: "10px"
                }}
            />


            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row", fontSize: "25px", padding: "20px", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "45%", display: "flex", flexDirection: "column", alignItems: "start" }}>

                    <p style={{fontSize: "25px"}}>
                        subcategory:
                        <form>
                            {(subList && subList.length > 0) ? (
                                subList.map((sub, index) => (
                                    <React.Fragment key={index}>
                                        <input type="radio" id={sub.name} name="subcategory"
                                            checked={formData.subcategoryId === sub.id}
                                            onChange={() => setFormData({ ...formData, subcategoryId: sub.id })} />
                                        <label> {sub.name} <b>({sub.category.name})</b></label>
                                        <br />
                                    </React.Fragment>
                                ))) : (
                                <>please wait...</>
                            )
                            }
                        </form>
                    </p>
                    <p>
                        stock:
                        <input name="stock" type="number" value={formData.stock} defaultValue={formData.stock} min={0} onChange={handleChangeBootstrap} />
                    </p>
                    <p>
                        price:
                        €<input name="price" type="number" value={Number(formData.price).toFixed(2)} defaultValue={formData.price} min={0.01} step={0.01} onChange={handleChangeBootstrap} />
                    </p>


                    <div>
                {(formData.name === "" || formData.price === 0 || formData.subcategoryId === 0) ?
                    (
                        <></>
                    ) : (
                        <>
                            <button onClick={() => createProduct.mutate(formData)}>Add Product</button>
                        </>
                    )}

                {(error.errorfound) ?
                    (
                        <p>{error.errorMessage}</p>
                    ) : (
                        <></>
                    )}

                <button onClick={closeFunction}>return to overview</button>
            </div>


                </div>

                <div style={{ width: "50%", display: "flex", flexDirection: "column", alignItems: "center", background: "#3e2d22", fontSize: "25px", borderRadius: "14px" }}>
                    <p onDrop={handleDrop} onDragOver={handleDragOver}>
                        image:
                        <div style={{maxHeight: "500px"}}>
                            <CustomImage imageSource={formData.imageLink} imageAlt="image preview" imageClassName="preview" />
                        </div>
                        <input name="imageLink" type="text" placeholder="imageLink" defaultValue={formData.imageLink} onChange={handleChangeBootstrap} />
                    </p>

                </div>
            </div>


            {/* <p>
                name:
                <input name="name" type="text" value={formData.name} placeholder="name" defaultValue={formData.name} onChange={handleChangeBootstrap} />
            </p>
            <p>
                description:
                <input name="description" type="text" value={formData.description} placeholder="description" defaultValue={formData.description} onChange={handleChangeBootstrap} />
            </p> */}
            {/* <p>
                stock:
                <input name="stock" type="number" value={formData.stock} defaultValue={formData.stock} min={0} onChange={handleChangeBootstrap} />
            </p>
            <p>
                price:
                €<input name="price" type="number" value={Number(formData.price).toFixed(2)} defaultValue={formData.price} min={0.01} step={0.01} onChange={handleChangeBootstrap} />
            </p> */}



            
        </div >
    );
}