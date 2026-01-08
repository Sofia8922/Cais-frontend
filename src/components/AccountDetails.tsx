import { useState } from "react";
import { AccountDTO } from "../dtos/AccountDTOs";

interface AccountProps {
    account: AccountDTO | undefined;
}

export default function AccountDetails ({account}: AccountProps) {
    const [adress, setAdress] = useState(account?.address);

    if(!account) {
        return (<>
            loading error
        </>)
    }

    return(
    <>
        <h1>{account.username}</h1>
        <p>Adress: {adress}</p>
        <p>Email: {account.email}</p>
        <p>Phone: {account.phoneNumber}</p>
        <p>Role: {account.roles}</p>
    </>)
}