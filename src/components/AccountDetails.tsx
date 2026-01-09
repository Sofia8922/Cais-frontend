import { useEffect, useRef, useState } from "react";
import { AccountDTO, AccountUpdateDTO } from "../dtos/AccountDTOs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../App";

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
    
    const queryClient = useQueryClient();
    const [toBeEdited, setToBeEdited] = useState(edit.NONE);
    const [userData, setUserData] = useState(
        {name: account.username, adress: account.address, email: account.email, phoneNumber: account.phonenumber});

    const editCategory = useMutation({
        mutationFn: async (userData: AccountUpdateDTO) => {
            const response = await fetch(`${API_URL}/accounts/${account.id}`, {
                method: 'PUT',
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userData })
            })
            return;
        },
        onSuccess: () => {
            console.log("succesfully edited")
            queryClient.invalidateQueries({ queryKey: ["accountList"] })
        },
        onError: () => {
            console.log("edit error")
        }
    });

    return(
    <>
        <button style={{ marginLeft: "10px", height: "30px", alignSelf: "center" }}
            onClick={() => { editCategory.mutate(userData); }}>save</button>

        <label style={{ width: "90%", textAlign: "left", margin: "5px", fontSize: "25px" }}>
            Name:<br/>
            {toBeEdited === edit.NAME ?
            <input value={userData.name} onChange={(e) => {setUserData({...userData, name: e.target.value})}}
                    style={{
                        width: "90%",
                        height: "60px",
                        background: "rgba(30, 30, 30, 1)",
                        border: "2px solid white",
                        borderRadius: "10px",
                        cursor: "text",
                        resize: "none",
                        fontSize: "30px",
                        color: "white",
                    }}
                onKeyDown={(e) => {if (e.key === 'Enter'){
                    e.preventDefault(); setToBeEdited(edit.NONE);
            }}}
            autoFocus/> :
            <button onClick={() => {setToBeEdited(edit.NAME); }} style={{width: "90%", height: "60px", fontSize: "30px", textAlign: "left"}}>{userData.name}</button>
            }
        </label>

        <label style={{ width: "90%", textAlign: "left", margin: "5px", fontSize: "25px" }}>
            Email:<br/>
            {toBeEdited === edit.EMAIL ?
            <input value={userData.email} onChange={(e) => {setUserData({...userData, email: e.target.value})}}
                    style={{
                        width: "90%",
                        height: "60px",
                        background: "rgba(30, 30, 30, 1)",
                        border: "2px solid white",
                        borderRadius: "10px",
                        cursor: "text",
                        resize: "none",
                        fontSize: "30px",
                        color: "white",
                    }}
                onKeyDown={(e) => {if (e.key === 'Enter') {
                    e.preventDefault(); setToBeEdited(edit.NONE);
            }}}
            autoFocus/> :
            <button onClick={() => setToBeEdited(edit.EMAIL)} style={{width: "90%", height: "60px", fontSize: "30px", textAlign: "left"}} >{userData.email}</button>
            }
        </label>

        <label style={{ width: "90%", textAlign: "left", margin: "5px", fontSize: "25px" }}>
            Phone number:<br/>
            {toBeEdited === edit.PHONE ?
            <input value={userData.phoneNumber} onChange={(e) => {setUserData({...userData, phoneNumber: e.target.value})}}
                    style={{
                        width: "90%",
                        height: "60px",
                        background: "rgba(30, 30, 30, 1)",
                        border: "2px solid white",
                        borderRadius: "10px",
                        cursor: "text",
                        resize: "none",
                        fontSize: "30px",
                        color: "white",
                    }}
                onKeyDown={(e) => {if (e.key === 'Enter') {
                    e.preventDefault(); setToBeEdited(edit.NONE);
            }
                else if(!(/^[0-9()#_+ -]$/.test(e.key) || e.key === 'Backspace' || e.key === 'Delete' ||
                    e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown' ||
                    (e.ctrlKey && /^[a-zA-Z]$/.test(e.key)))){
                    e.preventDefault();
            }}}
            autoFocus/> :
            <button onClick={() => setToBeEdited(edit.PHONE)} style={{width: "90%", height: "60px", fontSize: "30px", textAlign: "left"}} >{userData.phoneNumber}</button>
            }
        </label>

        <label style={{ width: "90%", textAlign: "left", margin: "5px", fontSize: "25px" }}>
            Adress:<br/>
            {toBeEdited === edit.ADRESS ?
            <input value={userData.adress} onChange={(e) => {setUserData({...userData, adress: e.target.value})}}
                    style={{
                        width: "90%",
                        height: "60px",
                        background: "rgba(30, 30, 30, 1)",
                        border: "2px solid white",
                        borderRadius: "10px",
                        cursor: "text",
                        resize: "none",
                        fontSize: "30px",
                        color: "white",
                    }}
                onKeyDown={(e) => {if (e.key === 'Enter'){
                    e.preventDefault(); setToBeEdited(edit.NONE);
            }}}
            autoFocus/> :
            <button onClick={() => {setToBeEdited(edit.ADRESS); }} style={{width: "90%", height: "60px", fontSize: "30px", textAlign: "left"}}>{userData.adress}</button>
            }
        </label>
    </>)
}