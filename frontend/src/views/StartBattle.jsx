import React, { useContext, useState, useEffect } from 'react';
import { Form, NavLink, useParams } from 'react-router';
import { getUser, UserContext } from '../context/UserContext';

export async function startBattleAction({ request, params}) {
    console.log({request, params});
    const formData = await request.formData();
    const boardToBattle = formData.get('boardToBattle');
    const user = getUser();

    const response = await fetch('/api/battles/start', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ board, boardToBattle }),
        user: user,
        credentials: 'include',
    });
    const battleData = await response.json();

    if (response.ok) {
        console.log('Battle started successfully:', battleData);
        // navigate(`/battles/${battleData._id}`);
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

    const handleSelectBoard = boardName => {
        setBoardToBattle(boardName);
        setShowDropdown(false);
    };

    const handleInputFocus = () => {
        if (boardToBattle.trim() !== '') {
            setShowDropdown(true);
        }
    };

    return (
        <div className="content-container d-flex flex-column justify-content-center align-items-center flex-fill">
            <div className="w-75">
                <nav>
                    <NavLink to="/battles">Back</NavLink>
                </nav>
                <h1>Start a Battle Between Boards</h1>
                <Form method="POST" id="battle-form" className="d-flex flex-column gap-3">
                    <fieldset className="form-group position-relative">
                        <label htmlFor="board">Board to battle:</label>
                        <input
                            type="text"
                            className={`form-control`}
                            id="board"
                            name="board"
                            value={boardToBattle}
                            placeholder="Enter board name"
                            onChange={e => {
                                setBoardToBattle(e.target.value);
                                setShowDropdown(true);
                            }}
                            onFocus={handleInputFocus}
                            autoComplete="off"
                            required
                        />
                        {showDropdown && filteredBoards.length > 0 && (
                            <div className="board-dropdown position-absolute w-100 mt-1 border rounded bg-dark shadow-sm">
                                {filteredBoards.map(board => (
                                    <div
                                        key={board._id}
                                        className="p-2 border-bottom"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleSelectBoard(board.name)}
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
