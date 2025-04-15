import React, { useEffect, useState } from 'react'
import styles from '../styles/Post.module.css'

export default function Post() {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');

    useEffect(() => {
        if (postId) {
            fetch(`/api/posts/${postId}`)
                .then(res => res.json())
                .then(data => {
                    setPost(data);
                    document.title = data.title;
                })
                .catch(err => console.error('Error loading post:', err));
        } else {
            console.error('Invalid postId:', postId);
        }
    }, [postId]);

    useEffect(() => {
        if (postId) {
            fetch(`/api/comments/${postId}`)
                .then(res => res.json())
                .then(data => setComments(data))
                .catch(err => console.error('Error loading comments:', err));
        }
    }, [postId]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        fetch('/api/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ content: newComment, postId })
        })
            .then(res => res.json())
            .then(() => {
                setNewComment('');
                fetch(`/api/comments/${postId}`)
                    .then(res => res.json())
                    .then(data => setComments(data));
            })
            .catch(err => {
                alert('Error posting comment. Are you logged in?');
                console.error(err);
            });
    };

    const vote = (type) => {
        fetch(`/api/posts/${postId}/${type}`, {
            method: 'POST',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(updatedPost => setPost(updatedPost))
            .catch(err => {
                alert('Error voting. Are you logged in?');
                console.error(err);
            });
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.post}>
            <nav>
                <a href="/index.html">Home</a> |
            </nav>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p>By: {post.author?.username || 'Unknown'}</p>
            <p>Upvotes: {post.upvotes} | Downvotes: {post.downvotes}</p>
            <p>
                <button onClick={() => vote('upvote')}>⬆️ Upvote</button>
                <button onClick={() => vote('downvote')}>⬇️ Downvote</button>
            </p>

            <h2>Comments</h2>
            <form onSubmit={handleCommentSubmit}>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    rows="3"
                    cols="50"
                ></textarea><br />
                <button type="submit">Post Comment</button>
            </form>

            <div>
                {comments.map((comment, index) => (
                    <div key={index}>
                        <p>{comment.content}</p>
                        <p><small>By: {comment.author?.username || 'Unknown'}</small></p>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
}