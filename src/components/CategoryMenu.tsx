import { useState } from "react";
import CategoryPopupContent from "./CategoryPopupContent";
import PopupContent from "./PopupContent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../App";
import { CategoryDTO, SubCategoryDTO } from "../dtos/CategoryDTOs";

export default function CategoryMenu({ closeFunction }) {
    const [isAddMenuOpen, openAddMenu] = useState(false);
    const [newCategoryName, setnewCategoryName] = useState("");
    const queryClient = useQueryClient();

    type CreateSubCategoryInput = {
        newName: string;
        categoryId: number;
    };

    const AddCategory = useMutation({
        mutationFn: async (newName) => {
            const response = await fetch(`${API_URL}/categories`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
                body: JSON.stringify({ name: newName })
            })
            return response.json();
        },
        onSuccess: (createdCategory: CategoryDTO) => {
            console.log("succesfully created")
            queryClient.invalidateQueries({ queryKey: ["categoryList"] })
            AddSubCategory.mutate({
                newName: "New Subcategory",
                categoryId: createdCategory.id,
            });
        },
        onError: () => {
            console.log("creation error")
        }
    });

    const AddSubCategory = useMutation({
        mutationFn: async ({ newName, categoryId }: CreateSubCategoryInput) => {
            const response = await fetch(`${API_URL}/subcategories`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
                body: JSON.stringify({ name: newName, categoryId: categoryId })
            })
            return
        },
        onSuccess: () => {
            console.log("succesfully created")
            queryClient.invalidateQueries({ queryKey: ["categoryList"] })
        },
        onError: () => {
            console.log("creation error")
        }
    });

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
            zIndex: 1001
        }}
            onClick={closeFunction}>
            <div style={{
                width: "580px",
                height: "850px",
                background: "#AB886D",
                border: "2px solid white",
                borderRadius: "10px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }} onClick={e => e.stopPropagation()}>

                <CategoryPopupContent />
                {!isAddMenuOpen ?
                    <button
                        className="admin-button"
                        style={{ marginLeft: "20px", marginTop: "5px", height: "40px", alignSelf: "center" }}
                        onClick={() => { openAddMenu(true) }}>Add category</button>
                    :
                    <div className="category-text" style={{ display: "flex", flexDirection: "row" }}>
                        <textarea
                            id="name"
                            name="name"
                            value={newCategoryName}
                            onChange={(e) => setnewCategoryName(e.target.value)}
                            disabled={false}
                            placeholder="Name"
                            style={{
                                width: "400px",
                                height: "40px",
                                background: "rgba(30, 30, 30, 1)",
                                border: "2px solid white",
                                borderRadius: "10px",
                                cursor: "text",
                                resize: "none",
                                fontSize: "30px",
                                color: "white",
                            }}
                        />
                        <button
                            style={{ marginLeft: "10px", height: "30px", alignSelf: "center" }}
                            onClick={() => {
                                AddCategory.mutate(newCategoryName);
                                openAddMenu(false);
                                setnewCategoryName("");
                            }}
                        >save</button>
                        <button
                            style={{ marginLeft: "10px", height: "30px", alignSelf: "center" }}
                            onClick={() => {
                                openAddMenu(false);
                            }}
                        >cancel</button>
                    </div>
                }

            </div>
        </div >
    )

}