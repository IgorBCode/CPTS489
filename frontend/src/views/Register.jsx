import React, { useState } from "react";
import { Form, redirect } from "react-router";
import logo from '../assets/logo.png'
import styles from '../styles/UserAuthForm.module.css'

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            redirect("/");
        } else {
            const error = await response.json();
            alert(error.error || "Login failed");
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="col-md-6">
                <div className={`card p-4 ${styles["login-style"]}`}>
                    <div className="d-flex flex-column align-items-center">
                        <img className={styles["login-logo"]} src={logo}></img>
                        <h3 className="mb-3">Register</h3>
                    </div>
                    <Form action="/" method="POST" replace onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={email}
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
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
                                name="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className={`btn w-100 ${styles["login-button"]}`}
                        >
                            <strong>Register</strong>
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    )
}