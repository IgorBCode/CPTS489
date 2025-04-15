import React, { useState } from "react";
import fightSvg from "../assets/fight.svg";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="col-md-6">
                <div className="card p-4 shadow">
                    <div className="d-flex flex-column align-items-center">
                        <h2>Board Battles</h2>
                        <img
                            src={fightSvg}
                            className="img-fluid mb-2"
                            style={{ maxWidth: 100, height: "auto" }}
                        />
                        <h3 className="mb-3">Login</h3>
                    </div>
                    <form action="/api/auth/login" method="POST">
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
                            className="btn btn-primary w-100"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}