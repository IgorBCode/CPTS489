import { useState, useContext } from 'react';
import { Form } from 'react-router'
import styles from '../styles/Profile.module.css'
import { UserContext } from '../context/UserContext'

export default function Profile() {
    const { user } = useContext(UserContext)
    return (
       <div className={`container d-flex align-items-center justify-items-center`}>
        <div className={styles["profile-container"]}>
            <div className={styles["profile-header"]}>
                <h>Welcome, {user.username}</h>
            </div>
            <div className={styles["profile-content"]}>
                <TrophyCase/>
                <div className={styles["profile-main"]}>
                    <ProfileSettings/>
                </div>
            </div>
        </div>
       </div> 
    )
}

function ProfileSettings() {

    const { user, setUser } = useContext(UserContext);
    const [username, setUsername] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/users/change-username", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ newUsername: username }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Username updated successfully!");
                setUser((prev) => ({ ...prev, username })); // Update username in context
            } else {
                alert(data.error || "Failed to update username.");
            }
        } catch (err) {
            console.error("Error updating username:", err);
        }

        try {
            const response = await fetch("/api/users/update-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Email updated successfully!");
                setUser((prev) => ({ ...prev, email })); // Update email in context
            } else {
                alert(data.error || "Failed to update email.");
            }
        } catch (err) {
            console.error("Error updating email:", err);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/users/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Password changed successfully!");
                setCurrentPassword("");
                setNewPassword("");
            } else {
                alert(data.error || "Failed to change password.");
            }
        } catch (err) {
            console.error("Error changing password:", err);
        }
    };

    return (
        <div className={styles["profile-settings"]}>
            <h4 className="mb-3">Edit Profile</h4>
            <Form onSubmit={handleUpdateProfile} className="needs-validation">
                <div className="row g-3">
                    <div className="col-sm-6">
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
                    <div className="col-sm-6">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <button className={`w-100 btn btn-lg mt-3 ${styles["profile-button"]}`}>
                    Update Profile
                </button>
            </Form>

            <hr className="my-4" />

            <h4 className="mb-3">Change Password</h4>
            <Form onSubmit={handleChangePassword} className="needs-validation">
                <div className="row gy-3">
                    <div className="col-12">
                        <label htmlFor="current-password" className="form-label">
                            Current Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="current-password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="new-password" className="form-label">
                            New Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button className={`w-100 btn btn-lg mt-3 ${styles["profile-button"]}`} type="submit">
                    Change Password
                </button>
            </Form>
        </div>
)}

function TrophyCase() {
    const { user } = useContext(UserContext)

    return (
        <div className={styles["trophy-case"]}>
            <h>Awards</h>
            <div className={styles["trophies"]}>
                {user.awards && user.awards.length > 0 ? (
                    user.awards.map((award, index) => (
                        <img/> // todo: determine which image displays based on user awards
                    ))
                ) : (
                    <p>No awards yet.</p>
                )}
            </div>
        </div>
    )
}

// {/* <div className="content-container">
//             <h3 className="text-center mb-4">Profile Settings</h3>
//             <hr />
//             <div className="row g-5">
//                 <div className="col-md-5 col-lg-4 order-md-last">
//                     {/* Trophy case */}
//                     <div className="p-3 rounded mini-trophy-case">
//                         <h5 className="text-center">🏆 Your Trophy Case</h5>
//                         <hr />
//                         <div className="text-center">
//                             <img
//                                 src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmZibG9tbzd2ejMxeG81bGk1cWxwbzd0b213NDk0MjQyZzZzZjQwaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HBfViGMWg1wfC/giphy.gif"
//                                 alt="Trophy"
//                                 className="mb-2 mx-1"
//                                 width={50}
//                             />
//                             <img
//                                 src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGcwNXdjOWN2bTVpaTNyM3ByeGJvNmoxcnZwZmpoNGc5NTF0bXJndiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OHs6JJvRA4v7hsxuzF/giphy.gif"
//                                 alt="Award"
//                                 className="mb-2  mx-1"
//                                 width={50}
//                             />
//                             <img
//                                 src="https://media.tenor.com/YTnbHwGQFUQAAAAi/coin-mario-bros-arcade.gif"
//                                 alt="Medal"
//                                 className="mb-2"
//                                 width={50}
//                             />
//                             <img
//                                 src="https://media.tenor.com/pXEDrZV2s4QAAAAi/star-spinning.gif"
//                                 alt="Medal"
//                                 className="mb-2"
//                                 width={50}
//                             />
//                             <img
//                                 src="https://media.tenor.com/rIvmcq4to6QAAAAi/0.gif"
//                                 alt="Medal"
//                                 className="mb-2"
//                                 width={50}
//                             />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-md-7 col-lg-8">
//                     <h4 className="mb-3">User Info</h4>
//                     <Form className="needs-validation">
//                         <div className="row g-3">
//                             <div className="col-sm-6">
//                                 <label htmlFor="firstName" className="form-label">
//                                     User Name
//                                 </label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     id="firstName"
//                                     placeholder=""
//                                     defaultValue="ExampleUser"
//                                     required=""
//                                 />
//                                 <div className="invalid-feedback">
//                                     Valid first name is required.
//                                 </div>
//                             </div>
//                             <div className="col-sm-6">
//                                 <label htmlFor="email" className="form-label">
//                                     Email
//                                 </label>
//                                 <input
//                                     type="email"
//                                     className="form-control"
//                                     id="email"
//                                     placeholder="you@example.com"
//                                 />
//                                 <div className="invalid-feedback">
//                                     Please enter a valid email address for shipping updates.
//                                 </div>
//                             </div>
//                             <hr className="my-4" />
//                             <h4 className="mb-3">Change Password</h4>
//                             <div className="row gy-3">
//                                 <div className="col-12">
//                                     <label htmlFor="cc-name" className="form-label">
//                                         Current Password
//                                     </label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         id="cc-name"
//                                         placeholder=""
//                                         required=""
//                                     />
//                                     <div className="invalid-feedback">Password Required</div>
//                                 </div>
//                                 <div className="col-12">
//                                     <label htmlFor="cc-name" className="form-label">
//                                         New Password
//                                     </label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         id="cc-name"
//                                         placeholder=""
//                                         required=""
//                                     />
//                                     <div className="invalid-feedback">Password Required</div>
//                                 </div>
//                                 <hr className="my-4" />
//                                 <button className="w-100 btn btn-primary btn-lg" type="submit">
//                                     Update Profile
//                                 </button>
//                             </div>
//                         </div>
//                     </Form>
//                 </div>
//             </div>
//         </div> */}