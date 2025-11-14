import { API_URL } from "./api";

const comments_endpoint = (postId) => `${API_URL}/posts/${postId}/comments`;
const modify_comments_endpoint = (commentID) => `${API_URL}/comments/${commentID}`

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

export async function updateComment(data, token, commentId) {
 
    const response = await fetch(modify_comments_endpoint(commentId), {
        method: "PATCH", 
        headers: { "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
         },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al editar el comentario');
    }

    return response.json();
}


export async function deleteComment(token, commentId) {
    const response = await fetch(modify_comments_endpoint(commentId), {
        method: "DELETE",
        headers: { "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
         }
    });

    if (response.status === 204) {
        return { success: true }
    }

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al eliminar el comentario');
    }

    return response.json();
}