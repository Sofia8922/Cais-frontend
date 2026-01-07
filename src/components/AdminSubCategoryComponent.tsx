import { useState } from "react";

export default function AdminSubCategoryComponent({subcategory}) {


    const [nameString, setNameString] = useState(subcategory.name);
    return (
        <div className="category-text" style={{display: "flex", flexDirection: "row"}}>
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
            <button style={{marginLeft: "10px", height: "30px", alignSelf: "center"}}>save</button>}
        </div>
    )
}