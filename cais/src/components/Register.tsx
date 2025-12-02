import { Form, useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "../api/config.ts";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../Stores/userStore.ts";


const RegisterComponent = ({ onBack }: { onBack: () => void }) => {

    const [register, setRegister] = useState({
        email: "",
        tempPassword: "",
        verifiedPassword: "",
        role: "" as Role
    });

    const passwordsMatch =
        register.tempPassword.length > 0 &&
        register.verifiedPassword.length > 0 &&
        register.tempPassword === register.verifiedPassword;

    const passwordLengthCheck = register.tempPassword.length >= 8

    const isEmail = 
    register.email.includes("@");

    const navigate = useNavigate();

    const handleRegistration = useMutation({
        mutationFn: async (dto: AppUserCreateDTO) => {
            const res = await fetch(`${API_URL}/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dto),
            });
            if (!res.ok) throw new Error("Registration failed");
            return res.json();
        },

        onSuccess: (user) => {
            updateUser(user)
            navigate("/projects")
        },
        onError: () => {
            console.log("Registration failed: try again");
        }

    })

    return (

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>

            <div style={{ textAlign: "center" }}>Email:</div>
            <input
                type="text"
                value={register.email}
                onChange={(e) => setRegister({ ...register, email: e.target.value })}
                placeholder="Enter email"
                style={{
                    width: "300px",
                    height: "40px",
                    padding: "8px",
                    borderRadius: "8px",
                    color: "white",
                    border: "2px solid white",
                    margin: "0px"

                }}
            />

            {!isEmail && register.email.length > 0 && (
                <p style={{ color: "red", textAlign: "center" }}> Not a valid email adress </p>
            )}

            <div style={{ textAlign: "center" }}>Enter your password:</div>
            <input
                type="password"
                value={register.tempPassword}
                onChange={(e) => setRegister({ ...register, tempPassword: e.target.value })}
                placeholder="Enter password"
                style={{
                    width: "300px",
                    height: "40px",
                    padding: "8px",
                    borderRadius: "8px",
                    color: "white",
                    border: "2px solid white",
                    margin: "0px"

                }}
            />

            {!passwordLengthCheck && register.tempPassword.length > 0 && (
                <p style={{ color: "red", textAlign: "center" }}> Passwords must be longer than 8 characters </p>
            ) }

            {register.tempPassword.length === 0 && register.verifiedPassword.length > 0 && (
                <p style={{ color: "red", textAlign: "center" }}> Enter a password </p>
            )}

            <div style={{ textAlign: "center" }}>Verify your password:</div>
            <input
                type="password"
                value={register.verifiedPassword}
                onChange={(e) => setRegister({ ...register, verifiedPassword: e.target.value })}
                placeholder="Verify password"
                style={{
                    width: "300px",
                    height: "40px",
                    padding: "8px",
                    borderRadius: "8px",
                    color: "white",
                    border: "2px solid white",
                    margin: "0px"

                }}
            />

            {!passwordsMatch && register.tempPassword.length > 0 && register.verifiedPassword.length > 0 && (
                <p style={{ color: "red", textAlign: "center" }}> Passwords do not match </p>
            )}

            <div style={{ textAlign: "center" }}>Select your role:</div>
            <Form.Select aria-label="Select your role "
                value={register.role}
                onChange={(e) => setRegister({ ...register, role: e.target.value as Role })}
                style={{
                    width: "300px",
                    height: "45px",
                    padding: "6px",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    border: "2px solid white",
                    margin: "0px"

                }}
            >

                <option value="">Choose your role</option>
                <option value="CLIENT">Client</option>
                <option value="DEVELOPER">Developer</option>
                <option value="PROJECTMANAGER">Project Manager</option>



            </Form.Select>

            <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>

                <button onClick={onBack}
                    style={{
                        width: "140px",
                        height: "40px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>Go back</button>
                    
                <button
                    disabled={handleRegistration.isPending || !passwordsMatch || !register.role || register.email === ""}
                    onClick={() => {
                        const registerDto: AppUserCreateDTO = {
                            email: register.email,
                            password: register.verifiedPassword,
                            role: register.role
                        };

                        handleRegistration.mutate(registerDto);
                    }}

                    style={{
                        width: "140px",
                        height: "40px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}

                >
                    {handleRegistration.isPending ? "Registering..." : "Register"}
                </button>

            </div>
        </div>
    );
};

export default RegisterComponent