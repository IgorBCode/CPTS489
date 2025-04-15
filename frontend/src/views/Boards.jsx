import { Form, NavLink } from "react-router";

export default function Boards() {
    return (
        <>
            <div className="content-container">
            <h1 className="text-center">Explore Communities</h1>
                {/* list of boards */}
                <div className="row">
                    <div className="row align-items-start">
                        <div className="row align-items-start">
                            <div className="col">
                                <NavLink to="create" className="btn btn-success btn-md">
                                    Create Board
                                </NavLink>
                            </div>
                            <div className="col-md-4">
                                <Form className="d-flex">
                                    <div className="input-group">
                                        <input
                                            className="form-control form-control-lg"
                                            type="search"
                                            placeholder="Search"
                                            aria-label="Search"
                                        />
                                        <button className="btn btn-primary px-4" type="submit">
                                            Search
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="card p-3">
                            <h5 className="card-title">🚗 Cars</h5>
                            <p className="text-muted">
                                Share your car pics, mod/fix tips, and talk about anything car
                                related.
                            </p>
                            <NavLink to="./" className="btn btn-primary">
                                Explore
                            </NavLink>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="card p-3">
                            <h5 className="card-title">🍔 Food</h5>
                            <p className="text-muted">
                                Share recipes, restaurant recommendations, and anything else food
                                related.
                            </p>
                            <NavLink to="./" className="btn btn-primary">
                                Explore
                            </NavLink>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="card p-3">
                            <h5 className="card-title">💻 WebDev</h5>
                            <p className="text-muted">
                                A place where you can learn how to center a div.
                            </p>
                            <NavLink to="./" className="btn btn-primary">
                                Explore
                            </NavLink>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="card p-3">
                            <h5 className="card-title">🐶 Pets</h5>
                            <p className="text-muted">
                                Join other pet owner to discuss anything related to our furry
                                friends.
                            </p>
                            <NavLink to="./" className="btn btn-primary">
                                Explore
                            </NavLink>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="card p-3">
                            <h5 className="card-title">🎮 Gaming</h5>
                            <p className="text-muted">All things video game related.</p>
                            <NavLink to="./" className="btn btn-primary">
                                Explore
                            </NavLink>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="card p-3">
                            <h5 className="card-title">🎨 Art</h5>
                            <p className="text-muted">
                                Join a community of artists sharing, exploring, and appreciating
                                art.
                            </p>
                            <NavLink to="./" className="btn btn-primary">
                                Explore
                            </NavLink>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="card p-3">
                            <h5 className="card-title">🎥 Movies</h5>
                            <p className="text-muted">
                                Join the discussion about all things movie related
                            </p>
                            <NavLink to="./" className="btn btn-primary">
                                Explore
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}