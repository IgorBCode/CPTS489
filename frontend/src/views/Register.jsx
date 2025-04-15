import React, { useState } from "react";
import fightSvg from "../assets/fight.svg";

export default function Register() {
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
                        <h3 className="mb-3">Register</h3>
                    </div>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Enter your username"
                                required=""
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
                                placeholder="Enter your email"
                                required=""
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
                                placeholder="Enter your password"
                                required=""
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}