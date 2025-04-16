import styles from '../styles/CreatePost.module.css';
import { useState, useContext } from 'react';
import { Form, Navigate, useNavigate } from 'react-router'
import { UserContext } from '../context/UserContext';

export default function CreatePost() {
    const { user, boards } = useContext(UserContext)
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState(null)
    const [board, setBoard] = useState("")
    const navigate = useNavigate();

    const submitPost = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", body);
        formData.append("boardId", board);
        // if (image) {
        //     formData.append("image", image);
        // }
        // images are just for show

        try {
            const response = await fetch(`/api/posts`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: title, content: body, boardId: board._id}),
            })

            if (response.ok) {
                console.log("Post created")
                navigate("/")
            } else {
                alert('Failed to create post')
            }
        } catch (err) {
            console.error("Error creating post:", err);
        }

    }


    return (
        <div className={`container d-flex align-items-center justify-items-center`}>
            <div className={styles["post-form-container"]}>
                <div className={styles["post-form-header"]}>
                    <h>Create Post</h>
                    <label htmlFor="board" className={`form-label`}>
                        Board
                    </label>
                    <select
                        className={`form-select mb-3 selectpicker`}
                        data-live-search="true"
                        id="board"
                        form="post-form"
                        value={board}
                        onChange={(e) => setBoard(e.target.value)}
                        required
                    >
                        <option value="" disabled>
                            -- Select a Board --
                        </option>
                        {boards.map((board) => (
                            <option 
                                key={board._id} 
                                value={board._id} 
                                data-tokens={board.name}
                            >
                                {board.name}
                            </option>
                        ))}
                    </select>
                </div>
                <Form id="post-form" className={styles["post-form"]} onSubmit={submitPost}>
                    <label htmlFor="title" className={`mt-1 mb-1 form-label`}>
                        Post Title
                    </label>
                    <input
                        type="text"
                        className={`form-control`}
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <label htmlFor="body" className={`mt-1 mb-1 form-label`}>
                        Body Text
                    </label>
                    <input
                        type="text"
                        className={`form-control ${styles["body-text"]}`}
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                    <label htmlFor="image" className={`mt-1 mb-1 form-label`}>
                        Image
                    </label>
                    <input
                        type="file"
                        className={`form-control`}
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        accept="image/png, image/jpeg"
                    />
                    <button className={`w-100 btn btn-lg mt-3 ${styles["post-form-button"]}`} type="submit">
                        Post
                    </button>
                </Form>
            </div>
        </div>
    )
}

{/* <>
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
        </> */}
