import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PurchaseShortDTO } from "../dtos/PurchaseDTOs"
import { API_URL } from "../App";

interface PurchaseProps {
    purchaseStatus: String;
    purchase: PurchaseShortDTO;
    changeStatus: Function;
}

export default function EditStatusBox({ purchaseStatus, purchase, changeStatus }: PurchaseProps) {

    const queryClient = useQueryClient();

    const changeRole = useMutation({
        mutationFn: async (role: string) => {
            console.log(purchase);
            const res = await fetch(`${API_URL}/purchases/${purchase.id}`, {
                method: 'PUT',
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: role })
            });

            console.log("STEP 3 RESPONSE:", res);
            if (!res.ok) throw new Error("Update failed");
            return res.json();
        },
        onSuccess: () => {
            console.log("successfully changed role")
            queryClient.invalidateQueries({ queryKey: ["productList"] })
        }
    });


    return (
        <div style={{
            position: "absolute",
            width: "250px",
            height: "180px",
            background: "black",
            border: "2px solid white",
            borderRadius: "10px",
            left: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: "10"
        }}>
            <p style={{ display: "block", fontSize: "20px", textAlign: "center", margin: "0px" }}>Set to..</p>

            <button style={{
                width: "200px",
                height: "40px",
                lineHeight: "12px",
                padding: "0px",
                margin: "4px"
            }}
                disabled={purchaseStatus == "PROCESSING"}
                onClick={() => { changeStatus("PROCESSING"); changeRole.mutate("PROCESSING") }}>
                Processing
            </button>

            <button style={{
                width: "200px",
                height: "40px",
                lineHeight: "12px",
                padding: "0px",
                margin: "4px"
            }}
                disabled={purchaseStatus == "UNDERWAY"}
                onClick={() => { changeStatus("UNDERWAY"); changeRole.mutate("UNDERWAY") }}>
                Underway
            </button>

            <button style={{
                width: "200px",
                height: "40px",
                lineHeight: "12px",
                padding: "0px",
                margin: "4px"
            }}
                disabled={purchaseStatus == "DELIVERED"}
                onClick={() => { changeStatus("DELIVERED"); changeRole.mutate("DELIVERED") }}>
                Delivered
            </button>
        </div>
    )
}