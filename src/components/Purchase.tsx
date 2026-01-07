import { useState } from "react";
import { PurchaseDTO } from "../dtos/PurchaseDTOs";
import EditStatusBox from "./EditStatusBox";

interface PurchaseProps {
    purchase: PurchaseDTO;
}

export default function Purchase({ purchase }: PurchaseProps) {


    const [isOpened, openMenu] = useState(false);

    console.log(purchase.amount)
    return (
        <div style={{ width: "90%", height: "110px", border: "2px solid white", borderRadius: "10px", margin: "5px", background: "black", position: "relative" }}
        onMouseLeave={() => openMenu(false)}>
            <p style={{ margin: "5px" }}>User: x</p>
            <p style={{ margin: "5px" }}>Quantity: {purchase.amount}</p>
            <p style={{ margin: "5px" }} >
                Status: <span style={{ textDecoration: "underline" }}
                    onClick={() => openMenu(!isOpened)}
                >{purchase.status}</span>
            </p>
            {isOpened && <EditStatusBox purchase={purchase}/>}
        </div>
    )
}