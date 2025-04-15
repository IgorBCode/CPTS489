import { Route } from "react-router";
import Battles from "../views/Battles.jsx";
import Battle from "../views/Battle.jsx";
import StartBattle from "../views/StartBattle.jsx";
import CreatePost from "../views/CreatePost.jsx";
import Post from "../views/Post.jsx";

const BattleRoutes = [
    <Route path="battles">
        <Route index element={<Battles />} />
        <Route path="start" element={<StartBattle />} />
        <Route path=":battleId">
            <Route index element={<Battle />} />
            <Route path=":postId" element={<Post />} />
            <Route path="create" element={<CreatePost />} />
        </Route>
    </Route>
]

export default BattleRoutes;