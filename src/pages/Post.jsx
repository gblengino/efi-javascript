import PostCard from "../components/common/PostCard";
import { useParams } from "react-router-dom";
import { Endpoints } from "../utils/constantAPIMethods";
import { GetData } from "../services/get_method";
import { useState, useEffect, use, useContext } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

export default function Post() {

    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [post, setPost] = useState({})

    const {user } = useContext(AuthContext)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await GetData({ methodToExecute: Endpoints.GET_POST_BY_ID, id });

                setPost(response);
                
            } catch (err) {
                setError(err.message);
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <ProgressSpinner />
            </div>
        );
    }

    return (
        <div className="w-full flex flex-column align-items-center justify-content-center gap-3 m-3">
        <PostCard
            id={post.id}
            title={post.title}
            author={post.author.username}
            date={post.created_at}
            content={post.content}
            categories={post.categories}
            comments={post.comments}
            options={user.user_id === post.author.id}
            />
        </div>
    )
}