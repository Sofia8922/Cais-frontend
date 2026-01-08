import { useState } from "react";
import AdminSubCategoryComponent from "./AdminSubCategoryComponent";

export default function AdminCategoryComponent({ category }) {


    const [isAddMenuOpen, openAddMenu] = useState(false);
    const [nameString, setNameString] = useState(category.name);
    const [newSubcategoryName, setnewSubcategoryName] = useState("");


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
                        //deleteCategory.mutate(category.id);
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
                        onClick={() => {/* editCategory.mutate(Category.id, Category.name) */ }}>save</button>}
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
                category.subcategories.map(sc =>
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