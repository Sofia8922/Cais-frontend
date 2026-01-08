import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AccountDTO, AccountDTOList } from "../dtos/AccountDTOs";
import { API_URL } from "../App";
import AccountTile from "./AccountTile";

export default function AccountOverviewComponent () {
    const [search, setSearch] = useState("");

    const {
            data: accountList,
            isLoading: isAccountListLoading,
            error: AccountListError
        } = useQuery<AccountDTOList>({
            queryKey: ["accountList"],
            queryFn: async () => {
                const response = await fetch(`${API_URL}/accounts`, {credentials: "include"});
                if (!response.ok) {
                    throw new Error("error")
                }
                return response.json();
            },
        })

    if(isAccountListLoading) return (
        <>loading...</>
    )
    
    if(AccountListError) return (
        <>error</>
    )

    let filteredAccounts = accountList;
    if (filteredAccounts && search && filteredAccounts.length > 0) {
        filteredAccounts = filteredAccounts.filter(a =>
            a.username.toLowerCase().includes(search.toLowerCase()) ||
            a.email.includes(search.toLowerCase())
        );
    }

    return (
        <>
            <textarea
                id="description"
                name="description"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                disabled={false}
                placeholder="Search..."
                style={{
                    width: "90%",
                    height: "60px",
                    background: "rgba(30, 30, 30, 1)",
                    border: "2px solid white",
                    borderRadius: "10px",
                    margin: "8px",
                    cursor: "text",
                    resize: "none",
                    fontSize: "30px",
                    marginTop: "18px",
                    color: "white",
                }}
                />
                {filteredAccounts && filteredAccounts.length > 0 ? (
                    <>
                        <div style={{
                            width: "80%",
                            height: "20px",
                            background: "black",
                            margin: "8px",
                            display: "flex",
                            flexDirection: "row",
                            textAlign: "center",
                            alignItems: "center",
                            justifyContent: "space-between",
                            fontSize: "23px",
                            gap: "70px",
                            marginBottom: "0px"
                        }}>
                        <p style={{ textAlign: "left", width: "34%" }}>Name</p>
                        <p style={{ textAlign: "left", width: "33%" }}>Email</p>
                        <p style={{ textAlign: "left", width: "33%" }}>Phone</p>
                        </div >

                        <div style={{ width: "85%", overflowY: "scroll", display: "flex", flexDirection: "column", alignItems: "center" }}>
                            {filteredAccounts?.map((account) => (
                              <AccountTile account={account} key={account.id} />
                            ))}
                        </div>
                    </>
                ) : (
                <div
                    style={{
                    width: "90%",
                    height: "60px",
                    margin: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0.8
                    }}
                >
                    No accounts found.
                </div>
            )}
        </>
    )
}