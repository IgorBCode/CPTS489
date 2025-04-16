import React, { useContext } from 'react';
import { NavLink, useParams } from 'react-router';
import { UserContext } from '../context/UserContext';
import { useState, useEffect } from 'react';
import Card from '../components/Card.jsx';

export default function Board() {
    const { user } = useContext(UserContext);
    const { boardId } = useParams();
    const [board, setBoard] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchBoardInfo = async () => {
            const resBoard = await fetch(`/api/boards/${boardId}`);
            const boardData = await resBoard.json();
            setBoard(boardData);
        };

        const fetchPosts = async () => {
            const resPosts = await fetch(`/api/posts/board/${boardId}`);
            const postsData = await resPosts.json();
            setPosts(postsData);
        };

        fetchBoardInfo();
        fetchPosts();
    }, [boardId]);

    const handleJoinBoard = async () => {
        const response = await fetch('/api/subscriptions/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                boardId: boardId,
            }),
        });
        const data = await response.json();

        if (response.ok) {
            console.log('Subscribed to board.', data);
            await fetchBoardInfo();
        } else {
            console.error('Failed to subscribe to board.', data.error);
        }
    };

    return (
        <div className="content-container flex-fill">
            <h1 className="text-center">Welcome to {board.name}!</h1>
            <NavLink
                className="btn btn-primary position-absolute top-0 start-2 m-3 board-battles-gradient-text"
                to="battle"
            >
                Start Board Battle
            </NavLink>
            <NavLink to="create" className="btn  btn-primary position-absolute top-0.75 start-2 m-3 board-battles-gradient-text">
                Create Post
            </NavLink>
            {/* Trophy case */}
            <div className="p-3 rounded mini-trophy-case">
                <h5 className="text-center">🏆 Trophy Case</h5>
                <hr />
                <div className="text-center">
                    {board?.awards?.length > 0 ? (
                        board.awards.map((gif, index) => (
                            <img
                                key={index}
                                src={gif}
                                alt={`Trophy ${index}`}
                                className="mb-2 mx-1"
                                width={50}
                            />
                        ))
                    ) : (
                        <p>No awards yet.</p>
                    )}
                </div>
            </div>
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <h3 className="mb-0">Posts</h3>
                    {!user?.subscriptions?.includes(boardId) && (
                        <button
                            type="button"
                            className="btn btn-success btn-md px-4"
                            onClick={handleJoinBoard}
                        >
                            Join Board!
                        </button>
                    )}
                    <div>
                        <label className="me-2">Sort by:</label>
                        <select className="form-select d-inline-block w-auto">
                            <option value="date">Date</option>
                            <option value="score">Score</option>
                        </select>
                    </div>
                </div>
                {/* Posts */}
                <div className="row flex-column gap-4 mt-3">
                    {posts.length === 0 ? (
                        <p>No posts. Be the first to post here!</p>
                    ) : (
                        posts.map(post => (
                            <Card
                                key={post._id}
                                postId = {post._id}
                                postTitle={post.title}
                                postUser={post.author.username}
                                postDate={new Date(post.createdAt)}
                                upvotes={post.upvotes}
                                downvotes={post.downvotes}
                                boardName={board.name}
                                commentCount={post.commentCount}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}