import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
import PostCard from "./PostCard";
import { getPosts } from "../../services/post_service";
import { API_URL } from "../../services/api";

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

useEffect(() => {
        // 2. El useEffect ahora es mucho más simple
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const data = await getPosts(); 
                setPosts(data); 
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

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="w-full flex flex-column align-items-center justify-content-center gap-3 m-3">
            {posts.length === 0 ? (
                <p>No hay posts para mostrar.</p>
            ) : (
                posts.map(post => (
                    <PostCard 
                        key={post.id}
                        title={post.title}
                        author={post.author.username}
                        date={post.created_at}
                        content={post.content}
                        categories={post.categories}
                        comments={post.comments}
                        />
                ))
            )}
        </div>
    );
}