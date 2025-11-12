import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const { logout } = useContext(AuthContext);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://18.223.136.198:5000/api/posts');

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
        <div className="post-list-container">
            
            {/* --- BOTÓN DE LOGOUT --- */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Feed del Blog</h2>
                <Button 
                    label="Cerrar Sesión" 
                    icon="pi pi-sign-out" 
                    className="p-button-danger" 
                    onClick={logout} 
                />
            </div>
            {/* ---------------------------------- */}
            
            <hr /> 

            {posts.length === 0 ? (
                <p>No hay posts para mostrar.</p>
            ) : (
                posts.map(post => (
                    
                    <article key={post.id} className="post-card" style={{ marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <small>Por: <strong>{post.author.username}</strong></small>

                        {/* Mostrar Categorías */}
                        <div className="categories" style={{ marginTop: '0.5rem' }}>
                            <strong>Categorías:</strong>
                            {post.categories.map(category => (
                                <span key={category.id} className="category-tag" style={{ marginLeft: '5px', background: '#eee', padding: '2px 5px', borderRadius: '4px' }}>
                                    {category.name}
                                </span>
                            ))}
                        </div>

                        {/* Mostrar Comentarios */}
                        <div className="comments-section" style={{ marginTop: '1rem', paddingLeft: '1rem', borderLeft: '3px solid #f0f0f0' }}>
                            <h4>Comentarios ({post.comments.length})</h4>
                            {post.comments.length === 0 ? (
                                <p>No hay comentarios.</p>
                            ) : (
                                post.comments.map(comment => (
                                    <div key={comment.id} className="comment" style={{ marginBottom: '0.5rem' }}>
                                        <p style={{ margin: 0 }}>{comment.content}</p>
                                        <small>Por: <strong>{comment.author.username}</strong></small>
                                    </div>
                                ))
                            )}
                        </div>
                    </article>
                ))
            )}
        </div>
    );
}