import { useState } from "react";
import { Button } from "primereact/button";
import Comment from "./Comment";

export default function PostComments({ comments = [] }){
    
    const [showAll, setShowAll] = useState(false);

    const commentsToShow = showAll 
        ? comments.slice().reverse() 
        : comments.slice(-2).reverse();

    return (
        <div className="flex flex-column">
            <h4>Comentarios</h4>

            {commentsToShow.length === 0 ? (
                <p>Aún no hay comentarios aquí.</p>
            ) : (
                commentsToShow.map((comment, index) => (
                    <Comment
                        key={index} 
                        author={comment.author.username}
                        date={comment.created_at}
                        text={comment.content}
                    />
                ))
            )}
            {comments.length > 2 && (
                <Button
                   
                    label={showAll ? "Ver Menos" : "Ver Mas"}
                    
                    
                    onClick={() => setShowAll(!showAll)}
                    
                    className="p-button-sm"
                />
            )}
        </div>
    )
}