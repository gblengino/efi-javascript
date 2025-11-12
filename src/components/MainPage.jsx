import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import Home from "./Home.jsx";
import PostList from "./PostsList.jsx";

export default function MainPage() {
    
    const { user } = useContext(AuthContext);

    return user ? <PostList /> : <Home />;
}