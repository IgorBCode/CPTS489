import { useState } from 'react';
import styles from '../styles/Card.module.css';
import * as Icons from './post-icons';

export function LikeButton({ isClicked, toggleClicked }) {
    return (
        <button className={styles["like-button"]} onClick={toggleClicked}>
            {isClicked ? (
                <Icons.LikeIconClicked fillColor="#8d00e9" />
            ) : (
                <Icons.LikeIcon fillColor="#8d00e9" />
            )}
        </button>
    );
}

export function DislikeButton({ isClicked, toggleClicked }) {
    return (
        <button className={styles["like-button"]} onClick={toggleClicked}>
            {isClicked ? (
                <Icons.DislikeIconClicked fillColor="#ff2aee" />
            ) : (
                <Icons.DislikeIcon fillColor="#ff2aee" />
            )}
        </button>
    );
}

export default function VoteButtons({ postId, upvotes, downvotes }) {
    const [index, setClicked] = useState(2); // 0 = liked, 1 = disliked, 2 = none
    const [curUpvotes, setUpvotes] = useState(upvotes);
    const [curDownvotes, setDownvotes] = useState(downvotes);

    const handleClick = async (voteType) => {
        try {
            let type = 'none';
            if (voteType === 0 && index !== 0) type = 'up';
            if (voteType === 1 && index !== 1) type = 'down';

            const res = await fetch(`/api/posts/${postId}/vote`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ type }),
            });

            const updated = await res.json();
            if (res.ok) {
                setUpvotes(updated.upvotes);
                setDownvotes(updated.downvotes);
                setClicked(voteType === 0 ? 0 : 1);
            } else {
                console.error('Vote error:', updated.error);
            }
        } catch (err) {
            console.error('Voting failed:', err);
        }
    };

    return (
        <div className={styles["like-buttons"]}>
            <div className={styles["like-container"]}>
                <LikeButton isClicked={index === 0} toggleClicked={() => handleClick(0)} />
                <div className={styles["vote-count"]}>{curUpvotes}</div>
            </div>
            <div className={styles["dislike-container"]}>
                <DislikeButton isClicked={index === 1} toggleClicked={() => handleClick(1)} />
                <div className={styles["vote-count"]}>{curDownvotes}</div>
            </div>
        </div>
    );
}