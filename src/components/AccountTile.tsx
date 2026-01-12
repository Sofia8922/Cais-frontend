import { AccountDTO } from "../dtos/AccountDTOs"

interface TileProps {
    account: AccountDTO
    showAccount: any
}

export default function AccountTile({account, showAccount}: TileProps) {
    //console.log(account)
    const roleString = account.roles.at(0)?.includes("ADMIN") ? " (Admin)" : "";
    const phoneString = account.phoneNumber ? account.phoneNumber : "-";

    return (
        <div style={{
            width: "95%",
            height: "30px",
            background: "black",
            border: "2px solid white",
            borderRadius: "10px",
            margin: "8px",
            cursor: "pointer",
            display: "flex",
            flexDirection: "row",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px",
            fontSize: "23px",
            gap: "70px"
        }}
            onMouseOver={(e) => { e.currentTarget.style.background = "rgba(19, 19, 19, 1)" }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0, 0, 0, 1)" }}
            onClick={showAccount}>
            <p style={{textAlign: "left", width: "34%"}}>{account.username}{roleString}</p>
            <p style={{textAlign: "left", width: "33%"}}>{account.email}</p>
            <p style={{textAlign: "left", width: "33%"}}>{phoneString}</p>
        </div>
    )
}