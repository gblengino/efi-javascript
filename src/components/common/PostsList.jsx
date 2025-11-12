import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
import PostCard from "./PostCard";
import { API_URL } from "../../services/api";

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/posts`);

                if (!response.ok) {
                    throw new Error("No se pudieron cargar los posts.");
                }

                const data = await response.json();
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