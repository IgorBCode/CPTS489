import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './App.jsx'
import Login from './views/Login.jsx'
import Register from './views/Register.jsx'
import Profile from './views/Profile.jsx'
import { BoardRoutes, BattleRoutes } from './routes'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
                <Routes>
                    <Route index element={<App />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="profile/:userId" element={<Profile />} />
                    {BoardRoutes}
                    {BattleRoutes}
                </Routes>
        </BrowserRouter>
    </StrictMode>
)