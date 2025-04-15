import { Route } from "react-router";
import Boards from "../views/Boards.jsx";
import Board from "../views/Board.jsx";
import Post from "../views/Post.jsx";
import CreatePost from "../views/CreatePost.jsx";
import Awards from "../views/Awards.jsx";

const BoardRoutes = [
    <Route path="boards">
        <Route index element={<Boards />} />
        <Route path=":boardId">
            <Route index element={<Board />} />
            <Route path=":postId" element={<Post />} />
            <Route path="create" element={<CreatePost />} />
            <Route path="awards" element={<Awards />} />
        </Route>
    </Route>
]

export default BoardRoutes;