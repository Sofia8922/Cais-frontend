import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "../Stores/userStore.ts";
import { AccountService } from "../services/accountService.js";

export default function Login() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const loginUser = useUserStore((state) => state.login);
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: async () => {
            await loginUser(credentials);
        },
        onSuccess: () => {
            alert(`Welcome ${credentials.username}`);
            navigate("/products");
        },
        onError: () => {
            alert("Invalid username or password");
        },
    });

    return (
        <div className="login-container">
            <h1 className="login-title">Login</h1>
            <input
                type="username"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="login-input"
            />
            <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="login-input"
            />
            <button
                onClick={() => loginMutation.mutate()}
                disabled={loginMutation.isPending}
                className="login-button"
            >
                {loginMutation.isPending ? "Logging in..." : "Login"}
            </button>

            <button onClick={() => navigate("/register")} className="login-button">Register</button>
        </div>
    );
}

