import { useEffect, useState, useContext } from "react";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import Comment from "./Comment";
import  CommentForm  from "./forms/CommentForm"
import { AuthContext } from "../../context/AuthContext";

export default function PostComments({ postId, comments = [] }){
    
    const [currentComments, setComments] = useState(comments)

    const { token } = useContext(AuthContext)


    useEffect(()=>{
        setComments(comments)
    }, [comments])

    const handleAddComment = (newComment) => {
        const updatedComments = [...currentComments, newComment]
        setComments(updatedComments)
    }

    const handleUpdateComment = (comment_id, updatedComment) => {
        setComments(prev => prev.map(c => c.id === comment_id ? {...c, ...updatedComment} : c));
    }

    const handleDeleteComment = (comment_id) => {
        setComments(prev => prev.filter(c => c.id !== comment_id))
    }

    const latestComments = currentComments.slice(-2).reverse()
    const [showAll, setShowAll] = useState(false)
    
    function parseDate(isoString) {
    if (!isoString) return "";
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
    }

    return (
        <div className="flex-1 flex flex-column">
            <h4>Comentarios</h4>

            {currentComments.length === 0 ? (
                <p>Aún no hay comentarios aquí.</p>
            ) : ( !showAll ? (
                latestComments.map((comment, index) => (
                    <Comment
                        key={index} 
                        id={comment.id}
                        author_id={comment.author.id}
                        author={comment.author.username}
                        date={parseDate(comment.created_at)}
                        content={comment.content}
                        onUpdate={handleUpdateComment}
                        onDelete={handleDeleteComment}
                    />
                )) ) : (
                    currentComments.map((comment, index) => (
                    <Comment
                        key={index} 
                        author={comment.author.username}
                        date={parseDate(comment.created_at)}
                        content={comment.content}
                        onUpdate={handleUpdateComment}
                        onDelete={handleDeleteComment}
                    />
                        )
                    )
                )
            )
            }
        <Divider/>
        {token ? (
        <CommentForm postId={postId} onAddComment={handleAddComment} />
            ): null}
            {currentComments.length > 2 && (
                <Button
                    
                    label={showAll ? "Ver Menos" : "Ver Mas"}
                    
                    
                    onClick={() => setShowAll(!showAll)}
                    
                    className="p-button-sm"
                />
            )}
        
        </div>
    )
}