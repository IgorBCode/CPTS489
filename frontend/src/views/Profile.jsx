import { Form } from "react-router";

export default function Profile() {
    return (
        <div className="content-container">
            <h3 className="text-center mb-4">Profile Settings</h3>
            <hr />
            <div className="row g-5">
                <div className="col-md-5 col-lg-4 order-md-last">
                    {/* Trophy case */}
                    <div className="p-3 rounded mini-trophy-case">
                        <h5 className="text-center">🏆 Your Trophy Case</h5>
                        <hr />
                        <div className="text-center">
                            <img
                                src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmZibG9tbzd2ejMxeG81bGk1cWxwbzd0b213NDk0MjQyZzZzZjQwaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HBfViGMWg1wfC/giphy.gif"
                                alt="Trophy"
                                className="mb-2 mx-1"
                                width={50}
                            />
                            <img
                                src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGcwNXdjOWN2bTVpaTNyM3ByeGJvNmoxcnZwZmpoNGc5NTF0bXJndiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OHs6JJvRA4v7hsxuzF/giphy.gif"
                                alt="Award"
                                className="mb-2  mx-1"
                                width={50}
                            />
                            <img
                                src="https://media.tenor.com/YTnbHwGQFUQAAAAi/coin-mario-bros-arcade.gif"
                                alt="Medal"
                                className="mb-2"
                                width={50}
                            />
                            <img
                                src="https://media.tenor.com/pXEDrZV2s4QAAAAi/star-spinning.gif"
                                alt="Medal"
                                className="mb-2"
                                width={50}
                            />
                            <img
                                src="https://media.tenor.com/rIvmcq4to6QAAAAi/0.gif"
                                alt="Medal"
                                className="mb-2"
                                width={50}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-7 col-lg-8">
                    <h4 className="mb-3">User Info</h4>
                    <Form className="needs-validation">
                        <div className="row g-3">
                            <div className="col-sm-6">
                                <label htmlFor="firstName" className="form-label">
                                    User Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    placeholder=""
                                    defaultValue="ExampleUser"
                                    required=""
                                />
                                <div className="invalid-feedback">
                                    Valid first name is required.
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="you@example.com"
                                />
                                <div className="invalid-feedback">
                                    Please enter a valid email address for shipping updates.
                                </div>
                            </div>
                            <hr className="my-4" />
                            <h4 className="mb-3">Change Password</h4>
                            <div className="row gy-3">
                                <div className="col-12">
                                    <label htmlFor="cc-name" className="form-label">
                                        Current Password
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cc-name"
                                        placeholder=""
                                        required=""
                                    />
                                    <div className="invalid-feedback">Password Required</div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="cc-name" className="form-label">
                                        New Password
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cc-name"
                                        placeholder=""
                                        required=""
                                    />
                                    <div className="invalid-feedback">Password Required</div>
                                </div>
                                <hr className="my-4" />
                                <button className="w-100 btn btn-primary btn-lg" type="submit">
                                    Update Profile
                                </button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}