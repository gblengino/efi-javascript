import { Button } from "primereact/button";
import Comment from "./Comment";
import  CommentForm  from "./forms/CommentForm"

export default function PostComments({ postId, comments = [], onViewMore }){
    
    const latestComments = comments.slice(-2).reverse()
    
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
        <div className="flex flex-column">
            <h4>Comentarios</h4>

            {latestComments.length === 0 ? (
                <p>Aún no hay comentarios aquí.</p>
            ) : (
                latestComments.map((comment, index) => (
                    <Comment
                        key={index}
                        author={comment.author.username}
                        date={parseDate(comment.created_at)}
                        content={comment.content}
                    />
                ))
            )
        }
        <CommentForm postId={postId} />

            {comments.length > 2 && (
                <Button
                    label="Ver Mas"
                    onClick={onViewMore}
                    className="p-button-sm"
                />
            )}
        </div>
    )
}