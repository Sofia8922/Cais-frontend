import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PurchaseDTO } from "../dtos/PurchaseDTOs"
import { API_URL } from "../App";

interface PurchaseProps {
    purchase: PurchaseDTO;
}

export default function EditStatusBox({ purchase }: PurchaseProps) {

    const queryClient = useQueryClient();

    const changeRole = useMutation({
        mutationFn: async (role: String) => {
            const res = await fetch(`${API_URL}/purchases/${99}/role/${role}`, {
                method: "PATCH",
            });
            if (!res.ok) throw new Error("Update failed");
            return res.json();
        },
        onSuccess: () => {
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
        }}>
            <p style={{ display: "block", fontSize: "20px", textAlign: "center", margin: "0px" }}>Set to..</p>

            <button style={{
                width: "200px",
                height: "40px",
                lineHeight: "12px",
                padding: "0px",
                margin: "4px"
            }}
                disabled={purchase?.status == "PROCESSING"}
                onClick={() => { changeRole.mutate("PROCESSING") }}>
                Processing
            </button>

            <button style={{
                width: "200px",
                height: "40px",
                lineHeight: "12px",
                padding: "0px",
                margin: "4px"
            }}
                disabled={purchase?.status == "UNDERWAY"}
                onClick={() => { changeRole.mutate("UNDERWAY") }}>
                Underway
            </button>

            <button style={{
                width: "200px",
                height: "40px",
                lineHeight: "12px",
                padding: "0px",
                margin: "4px"
            }}
                disabled={purchase?.status == "DELIVERED"}
                onClick={() => { changeRole.mutate("DELIVERED") }}>
                Delivered
            </button>

            {/* {user && (
                <button style={{
                    width: "80px",
                    height: "50px",
                    lineHeight: "20px",
                    padding: "0px",
                    margin: "4px",
                    position: "absolute",
                    bottom: "0px"
                }}
                    onClick={() => { removeUser.mutate(user.id) }}>
                    Remove user
                </button>)} */}

        </div>
    )
}