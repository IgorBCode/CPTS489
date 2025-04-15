export default function Login() {
    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="col-md-6">
                <div className="card p-4 shadow">
                    <div className="d-flex flex-column align-items-center">
                        <h2>Board Battles</h2>
                        <img
                            src="../assets/fight.svg"
                            className="img-fluid mb-2"
                            style={{ maxWidth: 100, height: "auto" }}
                        />
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
                                value={username}
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