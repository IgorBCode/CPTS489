// import { Route } from "react-router";
import Boards from '../views/Boards.jsx';
import Board from '../views/Board.jsx';
import Post from '../views/Post.jsx';
import CreatePost from '../views/CreatePost.jsx';
import CreateBoard, { createBoardAction } from '../views/CreateBoard.jsx';
import StartBattle, { startBattleAction } from '../views/StartBattle.jsx';
import Awards from '../views/Awards.jsx';

const BoardRoutes = [
    {
        path: 'boards',
        children: [
            {
                index: true,
                element: <Boards />,
            },
            {
                path: 'create',
                element: <CreateBoard />,
                action: createBoardAction,
            },
            {
                path: ':boardId',
                children: [
                    {
                        index: true,
                        element: <Board />,
                    },
                    {
                        path: ':postId',
                        element: <Post />,
                    },
                    {
                        path: 'create',
                        element: <CreatePost />,
                    },
                    {
                        path: 'battle',
                        element: <StartBattle />,
                        action: startBattleAction,
                    },
                    {
                        path: 'awards',
                        element: <Awards />,
                    },
                ],
            },
        ],
    },
    // <Route path="boards">
    //     <Route index element={<Boards />} />
    //     <Route path=":boardId">
    //         <Route index element={<Board />} />
    //         <Route path=":postId" element={<Post />} />
    //         <Route path="create" element={<CreatePost />} />
    //         <Route path="awards" element={<Awards />} />
    //     </Route>
    // </Route>
];

export default BoardRoutes;
