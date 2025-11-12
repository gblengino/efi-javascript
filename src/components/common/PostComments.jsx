import { Button } from "primereact/button";
import Comment from "./Comment";

export default function PostComments({ comments = [], onViewMore }){
    
    const latestComments = comments.slice(-2).reverse()

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
                        date={comment.created_at}
                        text={comment.content}
                    />
                ))
            )}

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