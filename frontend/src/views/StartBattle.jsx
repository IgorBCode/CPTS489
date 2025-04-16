import React, { useContext, useState, useEffect, useRef } from 'react';
import { Form, NavLink, redirect, useParams, useSubmit } from 'react-router';
import { UserContext } from '../context/UserContext';

export async function startBattleAction({ request, params }) {
    const formData = await request.formData();
    const boardA = params.boardId;
    const boardB = formData.get('boardToBattleId');

    const response = await fetch('/api/battles/start', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ boardA, boardB }),
        credentials: 'include',
    });
    const battleData = await response.json();

    if (response.ok) {
        console.log('Battle started successfully:', battleData);
        return redirect(`/battles/${battleData.battle._id}`);
    } else {
        console.error('Error starting battle:', battleData.error);
    }

    return battleData;
}

export default function StartBattle() {
    const { boards } = useContext(UserContext);
    const [boardToBattle, setBoardToBattle] = useState('');
    const [filteredBoards, setFilteredBoards] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const params = useParams();
    const currentBoardId = params.boardId;
    const [boardToBattleId, setBoardToBattleId] = useState('');
    const formRef = useRef(null);
    const submit = useSubmit();

    useEffect(() => {
        if (boardToBattle.trim() === '') {
            setFilteredBoards([]);
            return;
        }

        const filtered = boards.filter(
            board =>
                board._id !== currentBoardId &&
                board.name.toLowerCase().includes(boardToBattle.toLowerCase())
        );
        setFilteredBoards(filtered);
    }, [boardToBattle, boards, currentBoardId]);

    const handleSelectBoard = board => {
        setBoardToBattle(board.name);
        setBoardToBattleId(board._id);
        setShowDropdown(false);
    };

    const handleInputFocus = () => {
        if (boardToBattle.trim() !== '') {
            setShowDropdown(true);
        }
    };

    const handleInputChange = e => {
        setBoardToBattle(e.target.value);
        setShowDropdown(true);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const matchingBoard = boards.find(
            board => 
                board._id !== currentBoardId && 
                board.name.toLowerCase() === boardToBattle.toLowerCase()
        );
        
        if (matchingBoard) {
            const formData = new FormData(e.target);
            formData.set('boardToBattleId', matchingBoard._id);
            submit(formData, { method: "post" });
        } else {
            alert("Please select a valid board from the list");
        }
    };

    return (
        <div className="content-container d-flex flex-column justify-content-center align-items-center flex-fill">
            <div className="w-75">
                <nav>
                    <NavLink to="/battles">Back</NavLink>
                </nav>
                <h1>Start a Battle Between Boards</h1>
                <Form 
                    ref={formRef}
                    method="POST" 
                    id="battle-form" 
                    className="d-flex flex-column gap-3" 
                    onSubmit={handleSubmit}
                >
                    <fieldset className="form-group position-relative">
                        <label htmlFor="board">Board to battle:</label>
                        <input
                            type="text"
                            className={`form-control`}
                            id="board"
                            name="boardToBattle"
                            value={boardToBattle}
                            placeholder="Enter board name"
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            autoComplete="off"
                            required
                        />
                        <input type="hidden" name="boardToBattleId" value={boardToBattleId} />
                        {showDropdown && filteredBoards.length > 0 && (
                            <div className="board-dropdown position-absolute w-100 mt-1 border rounded bg-dark shadow-sm">
                                {filteredBoards.map(board => (
                                    <div
                                        key={board._id}
                                        className="p-2 border-bottom"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleSelectBoard(board)}
                                    >
                                        {board.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </fieldset>
                    <button
                        type="submit"
                        className="btn board-battles-gradient-text mt-2"
                        style={{ width: '10rem' }}
                    >
                        Start Battle
                    </button>
                </Form>
            </div>
        </div>
    );
}
