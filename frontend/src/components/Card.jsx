import { useState } from 'react';
import styles from '../styles/Post.module.css'
import * as Icons from './post-icons'
import { NavLink } from 'react-router';

// For showing when the post was created on the Card
function getTimeDifference(date) {
    const now = new Date();
    const diff = now - date;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return years + (years === 1 ? " year ago" : " years ago");
    if (months > 0) return months + (months === 1 ? " month ago" : " months ago");
    if (days > 0) return days + (days === 1 ? " day ago" : " days ago");
    if (hours > 0) return hours + (hours === 1 ? " hour ago" : " hours ago");
    if (minutes > 0) return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
    return seconds + (seconds === 1 ? " second ago" : " seconds ago");
}

function LikeButton({ isClicked, toggleClicked }) {
    return (
        <div>
            {isClicked ? (
                <button className={styles["like-button"]} onClick={toggleClicked}>
                    <Icons.LikeIconClicked fillColor="#8d00e9" />
                </button>
            ) : (
                <button className={styles["like-button"]} onClick={toggleClicked}>
                    <Icons.LikeIcon fillColor="#8d00e9" />
                </button>
            )}
        </div>
    )
}

export default function Card({postId, postTitle, postUser, postDate, upvotes, downvotes, boardName, commentCount }) {
    const [index, setClicked] = useState(2); // 0 = liked, 1 = disliked, 2 = none
    const [cur_upvotes, setUpvotes] = useState(upvotes);
    const [cur_downvotes, setDownvotes] = useState(downvotes);

    const handleClick = async (vote_type) => {
        try {
            // default vote
            let type = 'none';
    
            // get the vote type
            if (vote_type === 0 && index !== 0) type = 'up'; 
            if (vote_type === 1 && index !== 1) type = 'down';
    
            const res = await fetch(`/api/posts/${postId}/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ type })
            });
    
            const updated = await res.json();
            if (res.ok) {
                setUpvotes(updated.upvotes);
                setDownvotes(updated.downvotes);
                if (type === 'up') setClicked(0);
                else if (type === 'down') setClicked(1);
                else setClicked(2);
            } else {
                console.error('Vote error:', updated.error);
            }
        } catch (err) {
            console.error("Voting failed:", err);
        }
    };

    return (
        <div className={styles.post}>
            <NavLink style={{ textDecoration: "none", color: "inherit" }}>
                <div className={styles["post-content"]}>
                    <div className={styles["like-buttons"]}>
                        <div className={styles["like-container"]}>
                            <LikeButton
                                isClicked={index === 0}
                                toggleClicked={() => handleClick(0)}
                            />
                            <div className={styles["vote-count"]}>{cur_upvotes}</div>
                        </div>
                        <div className={styles["dislike-container"]}>
                            <DislikeButton
                                isClicked={index === 1}
                                toggleClicked={() => handleClick(1)}
                            />
                            <div className={styles["vote-count"]}>{cur_downvotes}</div>
                        </div>
                    </div>
                    <div className={styles["post-info"]}>
                        <h1>{postTitle}</h1>
                        <p>Posted by {postUser} - {getTimeDifference(postDate)}</p>
                        <p>{commentCount} Comments</p>
                    </div>
                    <div className={styles["board-info"]}>
                        <span>Board: {boardName}</span>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}

function DislikeButton({ isClicked, toggleClicked }) {
    return (
        <div>
            {isClicked ? (
                <button className={styles["like-button"]} onClick={toggleClicked}>
                    <Icons.DislikeIconClicked fillColor="#ff2aee" />
                </button>
            ) : (
                <button className={styles["like-button"]} onClick={toggleClicked}>
                    <Icons.DislikeIcon fillColor="#ff2aee" />
                </button>
            )}
        </div>
    )
}