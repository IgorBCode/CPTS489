import React, { useState } from "react";
import { Form, useNavigate } from "react-router";
import logo from '../assets/logo.png'
import styles from '../styles/UserAuthForm.module.css'

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data); // Handle login success (e.g., store token, redirect)
            } else {
                const error = await response.json();
                alert(error.error || "Login failed");
            }
        } catch (err) {
            console.error("Error logging in:", err);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className={`col-md-6`}>
                <div className={`card p-4 ${styles["login-style"]}`}>
                    <div className="d-flex flex-column align-items-center">
                        <img className={styles["login-logo"]} src={logo}></img>
                        <h3 className="mb-3">Login</h3>
                    </div>
                    <Form onSubmit={(e) => {handleSubmit(e); navigate("/")}} >
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className={`btn w-100 ${styles["login-button"]}`}
                        >
                            <strong>Login</strong>
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    );
}