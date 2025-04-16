import React, { useEffect, useState } from 'react'
import styles from '../styles/Post.module.css'
import { Form, useParams } from 'react-router';
import VoteButtons from '../components/VoteButtons';

export default function Post() {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { postId } = useParams();

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
        <div className={`container d-flex align-items-center justify-items-center`}>
            <div className={styles['post-container']}>
                <div className={styles['post-header']}>
                    <VoteButtons postId={postId} upvotes={post.upvotes} downvotes={post.downvotes}/>
                    <div className={styles["post-info"]}>
                        <h>{post.title}</h>
                        <p>{post.author?.username || 'Unknown'}</p>
                        <p>Board: {post.board?.name || 'Unknown'}</p>
                    </div>
                </div>
                <div className={styles['post-content']}>
                    <p>{post.content}</p>
                </div>
                <div className={styles['comment-form']}>
                    <Form onSubmit={handleCommentSubmit}>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a comment..."
                            rows="3"
                            cols="50"
                        ></textarea><br />
                        <button className={`btn btn-lg mt-1`}type="submit">Post Comment</button>
                    </Form>
                </div>
                <div className={styles['comment-header']}><h>{post.commentCount} Comments</h></div>
                <div className={styles['comment-container']}>
                    {comments.map((comment, index) => (
                        <div className={styles['comment']} key={index}>
                            <p>{comment.content}</p>
                            <p><small>By: {comment.author?.username || 'Unknown'}</small></p>
                        </div>
                    ))}
                </div>
            </div>
                        
            
            
        </div>
    );
}