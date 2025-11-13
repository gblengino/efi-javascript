import { API_URL } from "./api";

const comments_endpoint = (postId) => `${API_URL}/posts/${postId}/comments`;

export async function createComment(postId, data, token) {
    const response = await fetch(comments_endpoint(postId), {
        method: "POST",
        headers: { "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
         },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al crear el comentario.');
    }

    return response.json();
}