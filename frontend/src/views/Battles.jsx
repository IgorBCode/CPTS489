import React, { useContext } from 'react';
import { useLoaderData } from 'react-router';
import { UserContext } from '../context/UserContext.jsx';

export async function getBattlesLoader() {
    return fetch('/api/battles/all')
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
    const { boards } = useContext(UserContext);

    /*
        battles = [
            {
                "_id": "67ff810e3c2e998aca2e758a",
                "boardA": {
                    "_id": "67fed0cf5d17acf44bc3b046",
                    "name": "Test"
                },
                "boardB": {
                    "_id": "67feee1b5d17acf44bc3b08e",
                    "name": "Test 2"
                },
                "startedBy": "67fdf2c65d17acf44bc3b007",
                "startTime": "2025-04-16T10:06:06.976Z",
                "endTime": "2025-04-23T10:06:06.976Z",
                "winner": null,
                "createdAt": "2025-04-16T10:06:06.978Z",
                "updatedAt": "2025-04-16T10:06:06.978Z",
                "__v": 0
            }
        ]
    */

    /*
        boards = [
            {
                "_id": "67fed0cf5d17acf44bc3b046",
                "name": "Test",
                "description": "test board",
                "createdBy": "67fdf2c65d17acf44bc3b007",
                "awards": [],
                "createdAt": "2025-04-15T21:34:07.292Z",
                "updatedAt": "2025-04-15T21:34:07.292Z",
                "__v": 0
            },
            {
                "_id": "67feee1b5d17acf44bc3b08e",
                "name": "Test 2",
                "description": "atsdlkfjadlkalbkfnlksaevwdlgsjfanfglkjflagnsdjdfsbnfjsdnlwejrgnfsdlkjrnfsdkljnrgefdkljrgvljnlwjesdatsdlkfjadlkalbkfnlksaevwdlgsjfanfglkjflagnsdjdfsbnfjsdnlwejrgnfsdlkjrnfsdkljnrgefdkljrgvljnlwjesdatsdlkfjadlkalbkfnlksaevwdlgsjfanfglkjflagnsdjdfsbnfjsdnlwejrgnfsdlkjrnfsdkljnrgefdkljrgvljnlwjesdatsdlkfjadlkalbkfnlksaevwdlgsjfanfglkjflagnsdjdfsbnfjsdnlwejrgnfsdlkjrnfsdkljnrgefdkljrgvljnlwjesd",
                "createdBy": "67fdf2c65d17acf44bc3b007",
                "awards": [],
                "createdAt": "2025-04-15T23:39:07.912Z",
                "updatedAt": "2025-04-15T23:39:07.912Z",
                "__v": 0
            }
        ]
    */

    let battleData = battles.map(battle => {
        let boardA = boards.find(board => board._id === battle.boardA._id);
        let boardB = boards.find(board => board._id === battle.boardB._id);

        return {
            ...boardA,
            ...boardB,
        };
    });

    console.log(battleData);

    return (
        <div className="content-container flex-fill">
            <h3 className="text-center mt-4 mb-4">Active Battles</h3>
            <hr />
            {/* battles */}
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="card-header text-white board-battles-gradient-text">
                            <h2>Food VS Art</h2>
                        </div>
                        <div className="card-body">
                            <p>
                                <strong>Food Upvotes:</strong> 12,345
                            </p>
                            <p>
                                <strong>Art Upvotes:</strong> 10,987
                            </p>
                        </div>
                        <div className="card-footer">
                            <p className="text-danger">Battle ends in 48 hours!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center my-4">
                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="card-header text-white board-battles-gradient-text">
                            <h2>Cars VS Gaming</h2>
                        </div>
                        <div className="card-body">
                            <p>
                                <strong>Cars Upvotes:</strong> 2,955
                            </p>
                            <p>
                                <strong>Gaming:</strong> 5,437
                            </p>
                        </div>
                        <div className="card-footer">
                            <p className="text-danger">Battle ends in 120 hours!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
