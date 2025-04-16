import Card from '../components/Card.jsx';
import { useEffect, useState } from 'react';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/posts/all', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching posts:', err);
                setLoading(false);
            });
    }, []);

    return (
        <main className="container mt-4">
            <div className="row flex-column gap-4">
                {loading ? (
                    <p>Loading posts...</p>
                ) : posts.length === 0 ? (
                    <p>No posts yet.</p>
                ) : (
                    posts.map(post => (
                        <Card
                            key={post._id}
                            post={post}
                            board={post.board || 'Unknown'}
                        />
                    ))
                )}
            </div>
        </main>
    );
}