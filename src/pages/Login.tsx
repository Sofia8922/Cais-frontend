// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { API_URL } from "../api/config.ts";
// import RegisterComponent from "../components/Register.tsx";
// import { useUserStore } from "../Stores/userStore.ts";


// const Login = () => {

//     const [login, setLogin] = useState({
//         email: "",
//         password: ""
//     });
//     const [isRegistering, setIsRegistering] = useState(false);
//     const [error, setError] = useState("");
//     const navigate = useNavigate();
//     const loginUser = useUserStore((state) => state.login);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setLogin(prev => ({ ...prev, [e.target.name]: e.target.value}));
//     };

//     const handleLogin = useMutation({
//         mutationFn: async (dto) => {
//             const res = await fetch(`${API_URL}/users/login`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(dto),
//             });
//             if (!res.ok) throw new Error("Login failed");
//             return res.json();
//         },
//         onSuccess: (user) => {
//             loginUser({
//                 id: user.id,
//                 email: user.email,
//                 name: user.name,
//             });
//             navigate("/products");
//         },
//         onError: () => setError("Login failed: invalid credentials"),
//     });

//     const isLoginDisabled = !login.email || !login.password || !handleLogin.isPending;

//      if (isRegistering) {
//         return (
//             <div className="login-container">
//                 <RegisterComponent onBack={() => setIsRegistering(false)} />
//             </div>
//         );
//     }

//     return (
//         <div className="login-container">
//             <h1>Project Manager PRO</h1>

//             {error && <p style={{ color: "red" }}>{error}</p>}

//             <form
//                 onSubmit={(e) => {
//                     e.preventDefault();
//                     handleLogin.mutate(login);
//                 }}
//                 style={{ display: "flex", flexDirection: "column", gap: 12 }}
//             >
//                 <label>Email:</label>
//                 <input
//                     name="email"
//                     type="email"
//                     placeholder="Enter email"
//                     value={login.email}
//                     onChange={handleChange}
//                 />

//                 <label>Password:</label>
//                 <input
//                     name="password"
//                     type="password"
//                     placeholder="Enter password"
//                     value={login.password}
//                     onChange={handleChange}
//                 />

//                 <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
//                     <button type="submit" disabled={isLoginDisabled}>
//                         {handleLogin.isPending ? "Logging in..." : "Login"}
//                     </button>
//                     <button type="button" onClick={() => setIsRegistering(true)}>
//                         Register
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "../api/config.ts";
import { useUserStore } from "../Stores/userStore";

export default function login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const loginUser = useUserStore((state) => state.login);
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: async (dto: { email: string; password: string }) => {
            const res = await fetch(`${API_URL}/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dto),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Login failed");
            }
            return res.json();
        },
        onSuccess: (user) => {
            loginUser({ id: user.id, email: user.email, name: user.name });
            navigate("/products");
        },
        onError: (error: any) => {
            alert(error.message || "Login failed: check credentials");
        },
    });

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "100px", gap: "10px" }}>
            <h1>Login</h1>
            <input
                type="email"
                placeholder="Email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <button
                onClick={() => loginMutation.mutate(credentials)}
                disabled={loginMutation.isPending}
            >
                {loginMutation.isPending ? "Logging in..." : "Login"}
            </button>
        </div>
    );
}

