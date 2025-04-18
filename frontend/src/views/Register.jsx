import React, { useContext, useState } from 'react';
import { Form, useNavigate } from 'react-router';
import logo from '../assets/logo.png';
import styles from '../styles/UserAuthForm.module.css';
import { UserContext } from '../context/UserContext';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleRegister = async e => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
                credentials: 'include',
            });
            const data = await response.json();

            if (response.ok) {
                console.log('Registration successful:', data);
                
                const loginResponse = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                    credentials: 'include',
                });
                
                if (loginResponse.ok) {
                    const userData = await updateUser();
                    if (userData) {
                        navigate('/');
                    } else {
                        alert('Failed to retrieve user data after registration');
                    }
                } else {
                    alert('Registration successful but login failed. Please log in manually.');
                    navigate('/login');
                }
            } else {
                alert(data.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Error registering:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="col-md-6">
                <div className={`card p-4 ${styles['login-style']}`}>
                    <div className="d-flex flex-column align-items-center">
                        <img className={styles['login-logo']} src={logo} alt="Logo" />
                        <h3 className="mb-3">Register</h3>
                    </div>
                    <Form onSubmit={handleRegister}>
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
                                onChange={e => setUsername(e.target.value)}
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
                                onChange={e => setEmail(e.target.value)}
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
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className={`btn w-100 ${styles['login-button']}`}>
                            <strong>Register</strong>
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    );
}
