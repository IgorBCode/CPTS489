import styles from '../styles/CreatePost.module.css';

export default function CreatePost() {
    return (
        <>
            <h3>Create Post</h3>
            <div className="button-row d-flex justify-content-between align-items-end">
                <div className="dropdown mt-2">
                    <button
                        className={`${styles['board-dropdown']} btn btn-secondary dropdown-toggle`}
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        WebDev
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <a className="dropdown-item" href="#">
                                WebDev
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#">
                                Food
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#">
                                Movies
                            </a>
                        </li>
                    </ul>
                </div>
                <button
                    type="button"
                    className={`${styles['upload-image']} btn btn-secondary d-flex align-items-center`}
                >
                    <input type="file" className="opacity-0" />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="bi bi-paperclip"
                        viewBox="0 0 16 16"
                    >
                        <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z" />
                    </svg>
                </button>
            </div>
            <div className="input-group mt-3 mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Title*"
                    aria-label="Title"
                    aria-describedby="basic-addon1"
                />
            </div>
            <div className="input-group mb-3">
                <textarea
                    className="form-control"
                    placeholder="Body"
                    aria-label="With textarea"
                    defaultValue={''}
                />
            </div>
            <button
                type="button"
                className="btn btn-primary"
                onclick="window.location.href='web-dev.html'"
            >
                Post
            </button>
        </>
    );
}
