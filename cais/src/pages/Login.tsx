import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "../api/config.ts";
import RegisterComponent from "../components/Register.tsx";
import { updateUser } from "../Stores/userStore.ts";


const Login = () => {

    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    const [isRegistering, setIsRegistering] = useState(false);

    const navigate = useNavigate();


    const handleLogin = useMutation({
        mutationFn: async (dto) => {
            const res = await fetch(`${API_URL}/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dto),
            });
            if (!res.ok) throw new Error("Login failed");
            return res.json();
        },
        onSuccess: (user) => {
            updateUser({
                email: user.email,
                password: "",
                id: user.id,
                //role: user.role
            });
            navigate("/projects");
        },
        onError: () => {
            console.log("Login failed: user not found");
        },
    });


    return (


        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100vh" }}>

            <h1>Project Manager PRO</h1>
            {!isRegistering && (
                <>
                    <div style={{ alignItems: "center" }}>
                        Enter your email:
                    </div>
                    <input
                        type="text"
                        value={login.email}
                        onChange={(e) => setLogin({ ...login, email: e.target.value })}
                        placeholder="Enter email"
                        style={{
                            width: "300px",
                            height: "40px",
                            padding: "8px",
                            margin: "8px",
                            borderRadius: "8px",
                            border: "2px solid white",
                            color: "white"
                        }}
                    />

                    <div style={{ alignItems: "center" }}>
                        Enter your password:
                    </div>
                    <input
                        type="password"
                        value={login.password}
                        onChange={(e) => setLogin({ ...login, password: e.target.value })}
                        placeholder="Enter password"
                        style={{
                            width: "300px",
                            height: "40px",
                            padding: "8px",
                            margin: "8px",
                            borderRadius: "8px",
                            border: "2px solid white",
                            color: "white"
                        }}
                    />

                    <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                        <button onClick={() => handleLogin.mutate(login)}
                            disabled={handleLogin.isPending}
                            style={{
                                width: "140px",
                                height: "40px",
                                cursor: "pointer",
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex",
                            }}
                        >
                            {handleLogin.isPending ? "Logging in..." : "Login"}
                        </button>



                        <button onClick={() => setIsRegistering(true)}
                            style={{
                                width: "140px",
                                height: "40px",
                                cursor: "pointer",
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex",
                            }}>
                            Register
                        </button>
                    </div>
                </>
            )}

            {isRegistering && (

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", marginTop: "10px" }}>

                    <RegisterComponent onBack={() => setIsRegistering(false)} />

                </div>

            )}

        </div>
    )
}


export default Login
