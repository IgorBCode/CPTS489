import Battles, { getBattlesLoader } from '../views/Battles.jsx';
import Battle from '../views/Battle.jsx';
import CreatePost from '../views/CreatePost.jsx';
import Post from '../views/Post.jsx';

const BattleRoutes = [
    {
        path: '/battles',
        children: [
            {
                index: true,
                element: <Battles />,
                loader: getBattlesLoader,
                HydrateFallback: () => <div className="text-center">Loading...</div>
            },
            {
                path: ':battleId',
                children: [
                    {
                        index: true,
                        element: <Battle />,
                    },
                    {
                        path: ':postId',
                        element: <Post />,
                    },
                    {
                        path: 'create',
                        element: <CreatePost />,
                    },
                ],
            },
        ],
    },
];

export default BattleRoutes;
