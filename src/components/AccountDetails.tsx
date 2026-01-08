import { useState } from "react";
import { AccountDTO } from "../dtos/AccountDTOs";

interface AccountProps {
    account: AccountDTO | undefined;
}

enum edit {NONE, NAME, ADRESS, EMAIL, PHONE};

export default function AccountDetails ({account}: AccountProps) {
    if(!account) {
        return (<>
            loading error
        </>)
    }
    
    const [toBeEdited, setToBeEdited] = useState(edit.NONE);
    const [adress, setAdress] = useState(account.address);
    const [email, setEmail] = useState(account.email);
    const [phoneNumber, setPhoneNumber] = useState(account.phoneNumber);

    return(
    <>
        <h1>{account.username}: {adress}, {email}, {phoneNumber}</h1>

        <p>Adress: 
            {toBeEdited === edit.ADRESS ?
            <input value={adress} onChange={(e) => {setAdress(e.target.value)}}
                onKeyDown={(e) => {if (e.key === 'Enter') {
                    e.preventDefault(); setToBeEdited(edit.NONE);
            }}}/> :
            <button onClick={() => setToBeEdited(edit.ADRESS)}>{adress}</button>
            }
        </p>

        <p>Email: 
            {toBeEdited === edit.EMAIL ?
            <input value={email} onChange={(e) => {setEmail(e.target.value)}}
                onKeyDown={(e) => {if (e.key === 'Enter') {
                    e.preventDefault(); setToBeEdited(edit.NONE);
            }}}/> :
            <button onClick={() => setToBeEdited(edit.EMAIL)}>{email}</button>
            }
        </p>

        <p>Phone number: 
            {toBeEdited === edit.PHONE ?
            <input value={phoneNumber} onChange={(e) => {setPhoneNumber(e.target.value)}}
                onKeyDown={(e) => {if (e.key === 'Enter') {
                    e.preventDefault(); setToBeEdited(edit.NONE);
            }}}/> :
            <button onClick={() => setToBeEdited(edit.PHONE)}>{phoneNumber}</button>
            }
        </p>
    </>)
}