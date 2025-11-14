import { useState } from 'react';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { AuthContext } from '../../../context/AuthContext.jsx' 
import { useContext } from 'react'
import { createComment } from '../../../services/comment_service.js';

export default function CommentForm({ postId, initialContent = '' ,onSubmit, onAddComment}) {

    const {token} =  useContext(AuthContext)

    const [comment, setComment] = useState(initialContent);
    const [error, setError] = useState("");

    const validateComment = (text) => {
        if (text.length < 1) return "El comentario debe tener al menos 1 carácter.";
        if (text.length > 500) return "El comentario no puede exceder los 500 caracteres.";
        return "";
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateComment(comment);
        if (validationError) {
            setError(validationError);
            return;
        }
        setError("");

        if (onSubmit) {
            onSubmit({content: comment})
            return
        }

        try {
            const newComment = await createComment(postId, { content: comment }, token);
            onAddComment(newComment)
            setComment("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex-1 flex flex-column gap-3'>
            <InputTextarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Escribe un comentario..."
                rows={3}
            />
            {error && <small className="text-red-500">{error}</small>}
            <Button type="submit" label="Enviar" />
        </form>
    )
}