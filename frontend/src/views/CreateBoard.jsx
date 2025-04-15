import React, { useState } from "react";
import { Form, NavLink, useActionData, redirect } from "react-router";

export async function createBoardAction({ request }) {
  const formData = await request.formData();
  const board = {
    name: formData.get("name"),
    description: formData.get("description")
  };

  try {
    const response = await fetch('/api/boards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(board)
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || 'Failed to create board' };
    }

    return redirect("..");
  } catch (error) {
    return { error: "Network error: Could not connect to server" };
  }
}

export default function CreateBoard() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const actionData = useActionData();
    
    return (
        <div className="content-container d-flex flex-column justify-content-center align-items-center flex-fill">
            <div className="content-container w-75">
                <NavLink to="..">Back</NavLink>
                <h1 className="text-light">Create a Board</h1>
                
                {actionData?.error && <div className="alert alert-danger">{actionData.error}</div>}
                
                <Form method="post" className="d-flex flex-column gap-2">
                    <div className="d-flex flex-column">
                        <label htmlFor="name" className="text-light">
                            Name:
                        </label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="d-flex flex-column">
                        <label htmlFor="description" className="text-light">
                            Description:
                        </label>
                        <textarea 
                            id="description" 
                            name="description"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{
                                height: "10rem",
                                resize: "none"
                            }}
                        />
                    </div>
                    <button type="submit">Create Board</button>
                </Form>
            </div>
        </div>
    );
}