import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "../Stores/userStore.ts";
import { RoleService } from "../services/roleService.js";

export default function Register() {
    const [credentials, setCredentials] = useState({
        username: "", password: "", email: "", roles: [] as string[]
    });
    const [availableRoles, setAvailableRoles] = useState<string[]>([]);
    const registerUser = useUserStore((state) => state.register);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
            const res = await RoleService.getAllRoles();
            setAvailableRoles(res);
        } catch (err) {
            console.error("Failed to fetch roles", err);
        }
    };
    fetchRoles();
    }, []);

    const registerMutation = useMutation({
        mutationFn: async () => {
            await registerUser(credentials);
        },
        onSuccess: () => {
            alert(`Registration successful! Welcome ${credentials.username}`);
            navigate("/products");
        },
        onError: (err: any) => {
            alert(err.message ||"Something went wrong D:");
        },
    });

    const isValidEmail = (email:string) =>{
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleRoleChange = (role: string, checked: boolean) => {
        setCredentials(prev => {
            let newRoles = [...prev.roles];
            if (checked) {
                if (!newRoles.includes(role)) newRoles.push(role);
            } else {
                newRoles = newRoles.filter(r => r !== role);
            }
            return { ...prev, roles: newRoles };
        });
    };

    const handleRegister = () => {
        if (!isValidEmail(credentials.email)) {
            alert("enter valid email");
            return;
        }
        if (!credentials.username || !credentials.password) {
            alert("username and password cannot be empty");
            return;
        }
        registerMutation.mutate();
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "100px", gap: "10px" }}>
            <h1>register</h1>
            <input
                type="username"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
            
            <div style={{ display: "flex", gap: "10px", flexDirection: "column"}}>
                <span>choose roles</span>
                {availableRoles.map((role) => (
                    <label key={role}>
                        <input type="checkbox"
                        checked={credentials.roles.includes(role)}
                        onChange={(e) => handleRoleChange(role, e.target.checked)} />
                        {role}
                    </label>
                ))}
            </div>
            <button onClick={handleRegister}>Register</button>
        </div>
    )
}