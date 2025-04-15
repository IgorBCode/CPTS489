import { createBrowserRouter } from "react-router";
import App from "../App.jsx";
import Login from "../views/Login.jsx";
import Register from "../views/Register.jsx";
import Profile from "../views/Profile.jsx";
import BattleRoutes from "./battleRoutes.jsx";
import BoardRoutes from "./boardRoutes.jsx";

const router = createBrowserRouter([
    {
        path: "/", 
        children: [
            {
                index: true,
                element: <App />,
            },
            ...BattleRoutes,
            ...BoardRoutes,
        ]
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/profile/:userId", element: <Profile /> },
        
]);

export default router;
