import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { UserContext } from '../context/UserContext.jsx';

function formatTimeRemaining(ms) {
    if (ms <= 0) return "Battle is over";
    const totalSec = Math.floor(ms / 1000);
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m remaining`;
}

export async function getBattlesLoader() {
    return fetch('/api/battles/all', { credentials: 'include' })
        .then(async res => {
            if (res.ok) {
                return res.json();
            }
            const error = await res.text();
            throw new Error(`Failed to load battles: ${res.status} - ${error}`);
        })
        .catch(error => {
            console.error('Network error:', error);
            throw new Error('Network error occurred while fetching battles');
        });
}

export default function Battles() {
    const battles = useLoaderData();
    const [upvoteMap, setUpvoteMap] = useState({});
    const [endStatus, setEndStatus] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchUpvotes = async () => {
            const results = {};
            for (const battle of battles) {
                const res = await fetch(`/api/battles/upvotes/${battle._id}`, {
                    credentials: 'include'
                });
                const upvoteData = await res.json();
                results[battle._id] = upvoteData;
            }
            setUpvoteMap(results);
        };

        fetchUpvotes();
    }, [battles]);

    const handleEndBattles = async () => {
        try {
            const res = await fetch('/api/battles/end-battles', { // 🔧 FIXED route
                method: 'POST',
                credentials: 'include'
            });
        } catch (err) {
            console.error('Failed to end battles:', err);
            setEndStatus('Error ending battles.');
        }
    };

    const now = new Date();
    const filteredBattles = battles.filter(battle => {
        if (filter === 'active') {
            return new Date(battle.endTime) > now && !battle.winner;
        }
        return true;
    });

    return (
        <div className="content-container flex-fill">
            <section className="my-3 text-center">
                <h3>Battle Controls (For Demo)</h3>
                <button className="btn btn-warning" onClick={handleEndBattles}>
                    Force End All Battles
                </button>
            </section>

            <section className="text-center my-4">
                <label className="me-2 fw-bold">Show:</label>
                <select
                    id="battleFilter"
                    className="form-select d-inline-block w-auto"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                >
                    <option value="all">All Battles</option>
                    <option value="active">Only Active Battles</option>
                </select>
            </section>

            <h3 className="text-center mt-4 mb-4">All Board Battles</h3>
            <hr />

            <div className="row justify-content-center">
                {filteredBattles.length === 0 ? (
                    <p className="text-center">No battles to show.</p>
                ) : (
                    filteredBattles.map(battle => {
                        const boardA = battle.boardA.name;
                        const boardB = battle.boardB.name;
                        const upvotes = upvoteMap[battle._id] || { boardA: 0, boardB: 0 };

                        const now = new Date();
                        const end = new Date(battle.endTime);
                        const timeLeft = end - now;
                        const isOver = timeLeft <= 0;

                        return (
                            <div className="col-12 mb-4" key={battle._id}>
                                <div className="d-flex justify-content-center">
                                    <div className="col-md-6">
                                        <div className="card text-center">
                                            <div className="card-header text-white board-battles-gradient-text">
                                                <h2>{boardA} VS {boardB}</h2>
                                            </div>
                                            <div className="card-body">
                                                <p><strong>{boardA} Upvotes:</strong> {upvotes.boardA}</p>
                                                <p><strong>{boardB} Upvotes:</strong> {upvotes.boardB}</p>
                                            </div>
                                            <div className="card-footer">
                                                {isOver ? (
                                                    <p className="text-success">
                                                        <strong>Winner:</strong>{' '}
                                                        {battle.winner?.name || 'Tie / Undecided'}
                                                    </p>
                                                ) : (
                                                    <p className="text-danger">{formatTimeRemaining(timeLeft)}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
