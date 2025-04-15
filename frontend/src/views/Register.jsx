import React, { useState } from "react";
import logo from '../assets/logo.png'
import styles from '../styles/UserAuthForm.module.css'

export default function Register() {
    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="col-md-6">
                <div className={`card p-4 ${styles["login-style"]}`}>
                    <div className="d-flex flex-column align-items-center">
                        <img className={styles["login-logo"]} src={logo}></img>
                        <h3 className="mb-3">Register</h3>
                    </div>
                    <form action="/api/auth/register" method="POST">
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
                                name="email"
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
                                name="password"
                                placeholder="Enter your password"
                                required=""
                            />
                        </div>
                        <button 
                            type="submit" 
                            className={`btn w-100 ${styles["login-button"]}`}
                        >
                            <strong>Register</strong>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}