import { useState } from "react";
import AdminSubCategoryComponent from "./AdminSubCategoryComponent";
import { CategoryDTO } from "../dtos/CategoryDTOs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../App";

interface Props {
    category: CategoryDTO
}

export default function AdminCategoryComponent({ category }: Props) {
    const queryClient = useQueryClient();
    const [isAddMenuOpen, openAddMenu] = useState(false);
    const [nameString, setNameString] = useState(category.name);
    const [newSubcategoryName, setnewSubcategoryName] = useState("");
    let idToMutate = -1;

    const deleteCategory = useMutation({
        mutationFn: async () => {
            const response = await fetch(`${API_URL}/categories/${idToMutate}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include"
            })
            return
        },
        onSuccess: () => {
            console.log("succesfully deleted")
        },
        onError: () => {
            console.log("deletion error")
        }
    });

    const editCategory = useMutation({
        mutationFn: async (newName: string) => {
            const response = await fetch(`${API_URL}/categories/${category.id}`, {
                method: 'PUT',
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName })
            })
            return;
        },
        onSuccess: () => {
            console.log("succesfully edited")
            queryClient.invalidateQueries({ queryKey: ["categoryList"] })
        },
        onError: () => {
            console.log("edit error")
        }
    });

    return (
        <div style={{ fontSize: "25px", marginTop: "0px", marginBottom: "0px" }}>

            <div style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}>
                <div style={{
                    background: "black",
                    height: "40px",
                    width: "40px",
                    borderRadius: "10px",
                    textAlign: "center",
                    alignSelf: "center"
                }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = "rgba(179, 37, 49, 1)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(0, 0, 0, 0)";
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        idToMutate = category.id;
                        deleteCategory.mutate();
                    }}>
                    x
                </div>
                <textarea
                    id="name"
                    name="name"
                    value={nameString}
                    onChange={(e) => setNameString(e.target.value)}
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
                {nameString != category.name &&
                    <button style={{ marginLeft: "10px", height: "30px", alignSelf: "center" }}
                        onClick={() => { editCategory.mutate(nameString) }}>save</button>}
                {nameString != category.name &&
                    <button
                        style={{ marginLeft: "10px", height: "30px", alignSelf: "center" }}
                        onClick={() => {
                            setNameString(category.name);
                        }}
                    >cancel</button>
                }
            </div>

            {category.subcategories?.length > 0 && (
                category.subcategories
                    .sort((a, b) => a.id - b.id)
                    .map(sc =>
                        <div key={sc.id}
                            style={{ display: "flex", flexDirection: "row" }}>
                            <AdminSubCategoryComponent subcategory={sc} />
                        </div>
                    )
            )}
            {!isAddMenuOpen ?
                <button style={{ marginLeft: "20px", marginTop: "5px", height: "40px", alignSelf: "center" }}
                    onClick={() => { openAddMenu(true) }}>Add subcategory</button>
                :
                <div className="category-text" style={{ display: "flex", flexDirection: "row" }}>
                    <textarea
                        id="name"
                        name="name"
                        value={newSubcategoryName}
                        onChange={(e) => setnewSubcategoryName(e.target.value)}
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
                            //addCategory.mutate(newSubcategoryName);
                            openAddMenu(false);
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
    )
}