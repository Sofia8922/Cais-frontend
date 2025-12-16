import Navbar from "./Navbar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductCreateDTO } from "../dtos/ProductDTOs";
import { SubCategoryDTOList } from "../dtos/CategoryDTOs";
import { API_URL } from "../App";
import { useState } from "react";
import CustomImage from "./CustomImage";
import React from 'react';

export default function ProductCreateComponent() {
    const [formData, setFormData] =
        useState({
            name: "",
            description: "",
            price: 0,
            stock: 0,
            imageLink: "",
            subcategoryId: 0
        });

    const createProduct = useMutation({
        mutationFn: async (editData: ProductCreateDTO) => {
            const response = await fetch(`${API_URL}/products`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(editData)
                });
            if (!response) throw new Error("No response.")
            else console.log("Request sent")
            return response.json();
        },
        onSuccess: (response) => {
            if (response.message !== undefined) {
                console.log("message undefined");
            } else {
                console.log(response.message);
            }
        },
        onError: () => {
            console.log("Something went wrong.")
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
        <div>
            <p>
                name: 
                <input name="name" type="text" placeholder="name" defaultValue={formData.name} onChange={handleChangeBootstrap} />
            </p>  
            <p>
                description:
                <input name="description" type="text" placeholder="description" defaultValue={formData.description} onChange={handleChangeBootstrap} />
            </p>
            <p>
                stock:
                <input name="stock" type="number" defaultValue={formData.stock} min={0} onChange={handleChangeBootstrap} />
            </p>
            <p>
                price:
                €<input name="price" type="number" value={Number(formData.price).toFixed(2)} defaultValue={formData.price} min={0.01} step={0.01} onChange={handleChangeBootstrap} />
            </p>
            <p onDrop={handleDrop} onDragOver={handleDragOver}>
                image: 
                <div style={{ maxHeight: '200px', overflow: 'scroll' }}>
                <CustomImage imageSource={formData.imageLink} imageAlt="image preview" imageClassName="preview"/>
                </div>
                <input name="imageLink" type="text" defaultValue={formData.imageLink} onChange={(e) => {handleChangeBootstrap(e);}} />
            </p>
            <p>
                subcategory:
                <form>
                    {subList && subList.length > 0 ? (
                        subList.map((sub, index) => (
                        <React.Fragment key={index}>
                        <input type="radio" id={sub.name} name="subcategory"
                                checked={formData.subcategoryId === sub.id}
                                onChange={() => setFormData({ ...formData, subcategoryId: sub.id })}/>
                        <label> {sub.name} <b>({sub.category.name})</b></label>
                        <br/>
                        </React.Fragment>
                    ))) : (
                        <>please wait...</>
                    )
                    }
                </form>
            </p>

            <hr/>
            
            <div>
                {!(formData.name === "" || formData.price === 0 || formData.subcategoryId === 0 ) ?
                (
                    <button onClick={() => createProduct.mutate(formData)}>Add Product</button>
                ) : (
                    <></>
                )
                }
            </div>
        </div>
    );
}