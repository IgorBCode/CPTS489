import styles from '../styles/Card.module.css'
import { NavLink } from 'react-router';
import VoteButtons from './VoteButtons';

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

export default function Card({postId, postTitle, postUser, postDate, upvotes, downvotes, boardName, boardId, commentCount }) {
    return (
        <div className={styles.post}>
            <div className={styles["post-content"]}>
                <div className={styles["like-buttons"]}>
                <VoteButtons postId={postId} upvotes={upvotes} downvotes={downvotes} />
                </div>
                <div className={styles["post-info"]}>
                    <NavLink to={`/boards/${boardId}/${postId}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <h1>{postTitle}</h1>
                    </NavLink>
                    <p>Posted by {postUser} - {getTimeDifference(postDate)}</p>
                    <p>{commentCount} Comments</p>
                </div>
                <div className={styles["board-info"]}>
                    <span>Board: {boardName}</span>
                </div>
            </div>
        </div>
    )
}