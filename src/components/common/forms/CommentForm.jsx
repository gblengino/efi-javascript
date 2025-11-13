import { useState } from 'react';
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { AuthContext } from '../../../context/AuthContext.jsx' 
import { useContext } from 'react'
import { createComment } from '../../../services/create_comment.js';

export default function CommentForm({ postId }) {

    const {token} =  useContext(AuthContext)

    const [comment, setComment] = useState("");
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

        try {
            await createComment(postId, { content: comment }, token);
            setComment("");
            reloadPost();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputText
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Escribe un comentario..."
            />
            {error && <small className="text-red-500">{error}</small>}
            <Button type="submit" label="Enviar" />
        </form>
    )
}