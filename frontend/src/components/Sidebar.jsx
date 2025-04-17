import { useState, useContext } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import * as Icons from './sidebar-icons';
import styles from '../styles/Sidebar.module.css';
import logo from '../assets/logo.png';
import { UserContext } from '../context/UserContext';

export function Logo() {
    return <img className={styles['logo']} src={logo}></img>;
}

export default function Sidebar() {
    const { user } = useContext(UserContext);
    const location = useLocation();
    const path = location.pathname.split('/')[1];

    return (
        <>
            <div className={styles['sidebar']}>
                <div>
                    <Logo />
                </div>
                <ul className={styles['nav-menu']}>
                    <li>
                        <NavLink className={styles['nav-link']} to="">
                            <NavButton
                                title="Home"
                                icon={<Icons.HomeIcon fillColor="white" />}
                                isActive={location.pathname === '/' || path === ''}
                            />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={styles['nav-link']} to="boards">
                            <NavButton
                                title="Boards"
                                icon={<Icons.BoardsIcon fillColor="white" />}
                                isActive={location.pathname === '/boards' || path === 'boards'}
                            />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={styles['nav-link']} to="battles">
                            <NavButton
                                title="Battles"
                                icon={<Icons.BattlesIcon fillColor="white" />}
                                isActive={location.pathname === '/battles' || path === 'battles'}
                            />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={styles['nav-link']} to="awards">
                            <NavButton
                                title="Awards"
                                icon={<Icons.AwardsIcon fillColor="white" />}
                                isActive={location.pathname === '/awards' || path === 'awards'}
                            />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={styles['nav-link']}
                            to={user ? `profile/${user._id}` : 'login'}
                        >
                            <NavButton
                                title="Profile"
                                icon={<Icons.ProfileIcon fillColor="white" />}
                                isActive={location.pathname === '/profile' || path === 'profile'}
                            />
                        </NavLink>
                    </li>
                </ul>
                <div>
                    <JoinedBoards />
                </div>
                <div>
                    <Login icon={<Icons.LoginIcon fillColor="white" />} />
                </div>
            </div>

            <Outlet />
        </>
    );
}

function JoinedBoards() {
    const { user, boards } = useContext(UserContext);

    const subscribedBoards =
        user && boards
            ? boards.filter(board => user.subscriptions && user.subscriptions.includes(board._id))
            : [];

    return (
        <div className={styles['my-boards']}>
            <h1>Your Boards</h1>
            {!user ? (
                <p>Sign in to see your Boards</p>
            ) : subscribedBoards.length === 0 ? (
                <p>You haven't subscribed to any boards yet</p>
            ) : (
                <ul>
                    {subscribedBoards.map(board => (
                        <NavLink key={board._id} to={`/boards/${board._id}`}>
                            <li>{board.name}</li>
                        </NavLink>
                    ))}
                </ul>
            )}
        </div>
    );
}

function Login({ icon }) {
    const { user } = useContext(UserContext);

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                alert('You have been logged out successfully!');
                window.location.reload();
            } else {
                alert('Failed to log out. Please try again.');
            }
        } catch (err) {
            console.error('Error during logout:', err);
            alert('An error occurred while logging out.');
        }
    };

    return (
        <div className={`dropup ${styles['login']}`}>
            <div className={styles['login-icon']}>{icon}</div>
            <div className={styles['dropdown-toggle']} data-bs-toggle="dropdown">
                {!user ? <>Sign In/Sign Up</> : <>{user.username}</>}
            </div>
            <ul className={`dropdown-menu ${styles['login-menu']}`}>
                {!user ? (
                    <>
                        <li>
                            <NavLink to="login" className={styles['dropdown-item']}>
                                Sign In
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="register" className={styles['dropdown-item']}>
                                Sign Up
                            </NavLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink
                                to="/"
                                onClick={handleLogout}
                                className={styles['dropdown-item']}
                            >
                                Sign Out
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}

function NavButton({ title, isActive, toggleActive, icon }) {
    return (
        <button
            className={`${styles['nav-button']} ${isActive ? styles['nav-button-active'] : ''}`}
            onClick={toggleActive}
        >
            <div className={styles['nav-icon']}>{icon}</div>
            <p className={styles['nav-title']}>{title}</p>
        </button>
    );
}