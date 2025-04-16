import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function Awards() {
    const [awards, setAwards] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (!user) return;
        fetch(`/api/users/${user._id}`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                setAwards(data.awards || []);
            })
            .catch(err => console.error('Failed to load awards', err));
    }, [user]);

    if (!user) {
        return (
            <div className="content-container d-flex flex-column flex-fill text-center">
            <h1 className="display-4 mt-4">🏆 Your Trophy Case</h1>
            <p className="text-muted fs-4 mt-3">Log in to view awards.</p>
            </div>
        )
    }

    return (
        <div className="content-container d-flex flex-column flex-fill">
            <h1 className="text-center display-4 my-4">🏆 Your Trophy Case</h1>
            <hr />
            <div className="row g-4 justify-content-center">
                {awards.length === 0 ? (
                    <p className="text-center">You haven’t earned any awards yet — go win some board battles!</p>
                ) : (
                    awards.map((gif, index) => (
                        <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={index}>
                            <div className="award-card text-center p-3 border border-3 rounded shadow-sm bg-light h-100">
                                <img
                                    src={gif}
                                    alt={`Award ${index}`}
                                    className="award-img mb-2 rounded"
                                    style={{ width: '100%', maxHeight: '120px', objectFit: 'contain' }}
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}