import { useState } from "react";

export default function AdminSubCategoryComponent({subcategory}: any) {


    const [nameString, setNameString] = useState(subcategory.name);
    return (
        <div className="category-text" style={{ display: "flex", flexDirection: "row" }}>
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
                    //deleteSubcategory.mutate(subcategory.id);
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
            {nameString != subcategory.name &&
                <button style={{ marginLeft: "10px", height: "30px", alignSelf: "center" }}
                    onClick={() => {/* editSubcategory.mutate(subcategory.id, subcategory.name) */ }}>save</button>
            }
            {nameString != subcategory.name &&
                <button
                    style={{ marginLeft: "10px", height: "30px", alignSelf: "center" }}
                    onClick={() => {
                        setNameString(subcategory.name);
                    }}
                >cancel</button>
            }

        </div>
    )
}