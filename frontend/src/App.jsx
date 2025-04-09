import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import Sidebar from './components/Sidebar';
import Home from './views/Home';
import Login from './views/Login';

export default function App() {
    const [currentView, setCurrentView] = useState("home");

    if (currentView === "home") {
        return (
            <>
                <Sidebar updateView={setCurrentView} />
                <Home />
            </>
        )
    } else if (currentView === "login") {
        return (
            <Login authenticate={authenticate} />
        )
    }
}