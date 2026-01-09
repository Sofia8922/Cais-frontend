import { useEffect, useRef, useState } from "react";
import { AccountDTO, AccountUpdateDTO } from "../dtos/AccountDTOs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../App";
import { useUserStore } from "../Stores/userStore";

interface AccountProps {
    account: AccountDTO | undefined;
}



enum edit {NONE, NAME, ADDRESS, EMAIL, PHONE};

export default function AccountDetails ({account}: AccountProps) {
    const updateUser = useUserStore((state) => state.updateUser);

    if(!account) {
        return (<>
            loading error
        </>)
    }
    
    const queryClient = useQueryClient();
    const [toBeEdited, setToBeEdited] = useState(edit.NONE);
    const [userData, setUserData] = useState<AccountUpdateDTO>(
        {username: account.username ?? "", address: account.address ?? "", email: account.email ?? "", phoneNumber: account.phoneNumber ?? ""});

    const editAccount = useMutation({
        mutationFn: async (userData: AccountUpdateDTO) => {
            await updateUser(userData);
        },
        onSuccess: () => {
            console.log("succesfully edited")
            queryClient.invalidateQueries({ queryKey: ["accountList"] });
            queryClient.invalidateQueries({ queryKey: ["account"] });
        },
        onError: (err) => {
            console.log("edit error", err)
        },
    });

    return(
    <>
        <button style={{ marginLeft: "10px", height: "30px", alignSelf: "center" }}
            onClick={() => editAccount.mutate(userData)}>save</button>

        <label style={{ width: "90%", textAlign: "left", margin: "5px", fontSize: "25px" }}>
            username:<br/>
            {toBeEdited === edit.NAME ?
            <input value={userData.username} onChange={(e) => {setUserData({...userData, username: e.target.value})}}
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
            <button onClick={() => {setToBeEdited(edit.NAME); }} style={{width: "90%", height: "60px", fontSize: "30px", textAlign: "left"}}>{userData.username}</button>
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
            {toBeEdited === edit.ADDRESS ?
            <input value={userData.address} onChange={(e) => {setUserData({...userData, address: e.target.value})}}
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
            <button onClick={() => {setToBeEdited(edit.ADDRESS); }} style={{width: "90%", height: "60px", fontSize: "30px", textAlign: "left"}}>{userData.address}</button>
            }
        </label>
    </>)
}