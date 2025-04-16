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

// keeping old code just in case

// export default function Sidebar({ updateView }) {
//     return (
//         <>
//             <aside
//                 className="d-flex flex-column flex-shrink-0 p-3 text-bg-light border-end"
//                 style={{
//                     width: 280,
//                     height: "100vh",
//                     position: "fixed",
//                     overflowY: "auto"
//                 }}
//             >
//                 <a
//                     href="/"
//                     className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
//                 >
//                     <svg className="bi pe-none me-2" width={40} height={32}>
//                         <use xlinkHref="#bootstrap" />
//                     </svg>
//                     <span className="fs-4">Board Battle</span>
//                 </a>
//                 <hr />
//                 <ul className="nav nav-pills flex-column mb-auto">
//                     <li className="nav-item">
//                         <a href="index.html" className="nav-link active" aria-current="page">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width={16}
//                                 height={16}
//                                 fill="currentColor"
//                                 className="bi bi-house me-2"
//                                 viewBox="0 0 16 16"
//                             >
//                                 <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
//                             </svg>
//                             Home
//                         </a>
//                     </li>
//                     <li>
//                         <a href="boardlist.html" className="nav-link text-dark">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width={16}
//                                 height={16}
//                                 fill="currentColor"
//                                 className="bi bi-list-columns me-2"
//                                 viewBox="0 0 16 16"
//                             >
//                                 <path
//                                     fillRule="evenodd"
//                                     d="M0 .5A.5.5 0 0 1 .5 0h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 0 .5m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-13 2A.5.5 0 0 1 .5 2h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-13 2A.5.5 0 0 1 .5 4h10a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-13 2A.5.5 0 0 1 .5 6h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-13 2A.5.5 0 0 1 .5 8h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-13 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-13 2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-13 2a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"
//                                 />
//                             </svg>
//                             Board List
//                         </a>
//                     </li>
//                     <li>
//                         <a href="#" className="nav-link text-dark">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width={16}
//                                 height={16}
//                                 fill="currentColor"
//                                 className="bi bi-graph-up-arrow me-2"
//                                 viewBox="0 0 16 16"
//                             >
//                                 <path
//                                     fillRule="evenodd"
//                                     d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5"
//                                 />
//                             </svg>
//                             View Board Battles
//                         </a>
//                     </li>
//                     <li>
//                         <a href="#" className="nav-link text-dark">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width={16}
//                                 height={16}
//                                 fill="currentColor"
//                                 className="bi bi-award me-2"
//                                 viewBox="0 0 16 16"
//                             >
//                                 <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z" />
//                                 <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z" />
//                             </svg>
//                             Awards
//                         </a>
//                     </li>
//                     <li>
//                         <a href="#" className="nav-link text-dark">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width={16}
//                                 height={16}
//                                 fill="currentColor"
//                                 className="bi bi-lightning me-2"
//                                 viewBox="0 0 16 16"
//                             >
//                                 <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641zM6.374 1 4.168 8.5H7.5a.5.5 0 0 1 .478.647L6.78 13.04 11.478 7H8a.5.5 0 0 1-.474-.658L9.306 1z" />
//                             </svg>
//                             Start Board Battle
//                         </a>
//                     </li>
//                     <li>
//                         <a href="#" className="nav-link text-dark">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width={16}
//                                 height={16}
//                                 fill="currentColor"
//                                 className="bi bi-person-lines-fill me-2"
//                                 viewBox="0 0 16 16"
//                             >
//                                 <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
//                             </svg>
//                             Profile Settings
//                         </a>
//                     </li>
//                 </ul>
//                 <hr />
//                 <div className="dropdown">
//                     <a
//                         href="#"
//                         className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle"
//                         data-bs-toggle="dropdown"
//                         aria-expanded="false"
//                     >
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width={32}
//                             height={32}
//                             fill="currentColor"
//                             className="bi bi-door-open me-2"
//                             viewBox="0 0 16 16"
//                         >
//                             <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
//                             <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z" />
//                         </svg>
//                         <strong>Sign in/Register</strong>
//                     </a>
//                     <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
//                         <li>
//                             <a className="dropdown-item" /*href="login.html"*/ onClick={() => updateView("login")}>
//                                 Sign In
//                             </a>
//                         </li>
//                         <li>
//                             <a className="dropdown-item" /*href="register.html"*/ onClick={updateView}>
//                                 Register
//                             </a>
//                         </li>
//                         <li>
//                             <hr className="dropdown-divider" />
//                         </li>
//                         <li>
//                             <a className="dropdown-item" href="index.html">
//                                 Sign out
//                             </a>
//                         </li>
//                     </ul>
//                 </div>
//             </aside>
//         </>
//     );
// }
