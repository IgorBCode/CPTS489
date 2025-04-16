import { createBrowserRouter } from 'react-router';
import App from '../App.jsx';
import Login from '../views/Login.jsx';
import Register from '../views/Register.jsx';
import Profile from '../views/Profile.jsx';
import BattleRoutes from './battleRoutes.jsx';
import BoardRoutes from './boardRoutes.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Awards from '../views/Awards.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Sidebar />,
        children: [
            {
                index: true,
                element: <App />,
            },
            ...BattleRoutes,
            ...BoardRoutes,
            {
                path: '/awards',
                Component: Awards,
            },
            {
                path: '/profile/:userId',
                element: <Profile />,
            },
        ],
    },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
]);

export default router;
