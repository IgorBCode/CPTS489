import React, { useState } from "react";
import { Form, NavLink } from "react-router";

export const startBattleAction = async (user, board, boardToBattle) => {
    const response = await fetch("/api/battles/start", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, board, boardToBattle }),
    });
    if (!response.ok) {
        throw new Error("Failed to start battle");
    }
    return response.json();
}

export default function StartBattle() {
    const [boardToBattle, setBoardToBattle] = useState("");
    return (
        <div class="content-container d-flex flex-column justify-content-center align-items-center flex-fill">
            <div className="w-75">
                <nav>
                    <NavLink to="/battles">Back</NavLink>
                </nav>
                <h1>Start a Battle Between Boards</h1>
                <Form id="battle-form" className="d-flex flex-column gap-3" method="POST">
                    <fieldset className="form-group">
                        <label for="board">
                        </label>
                        <input type="text" className={`form-control`} name="board" value={boardToBattle} placeholder="Enter board name" onChange={(e) => setBoardToBattle(e.target.value)} required />
                    </fieldset>
                    <button type="submit">Start Battle</button>
                </Form>
            </div>
        </div>
    );
}