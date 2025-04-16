import { useContext } from "react";
import { Form, NavLink } from "react-router";
import { UserContext } from "../context/UserContext";
import styles from "../styles/Boards.module.css";

export default function Boards() {
    const { boards } = useContext(UserContext);

    return (
        <>
            <div className={styles["content-container"]}>
            <h1 className="text-center">Explore Communities</h1>
                {/* list of boards */}
                <div className={`row ${styles["row"]}`}>
                    <div className="row align-items-start">
                        <div className="row align-items-start">
                            <div className="col">
                                <NavLink to="create" className="btn board-battles-gradient-text">
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
                    {boards.map((board) => {
                        return (
                            <div className={`col-md-4 mt-3`} key={board._id}>
                                <div className={`card p-3 h-100`}>
                                    <h5 className="card-title">{board.name}</h5>
                                    <p className={`text-muted clamp-text flex-wrap flex-fill`}>{board.description}</p>
                                    <NavLink to={`${board._id}`} className="btn btn-primary">
                                        Explore
                                    </NavLink>
                                </div>
                            </div>
                        )
                    })}
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