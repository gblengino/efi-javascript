import { API_URL } from "./api";

const posts_endpoint = 'posts'

export async function getPosts() {
    try {
        const response = await fetch(`${API_URL}/${posts_endpoint}`);
        const data = await response.json();

        if (response.ok) {
    
            return data;
        } else {
          
            if (data.error && data.error === "No posts available yet") {
               
                return []; 
            } else {
                
                throw new Error(data.error || 'Error al obtener los posts');
            }
        }
    } catch (err) {
        
        console.error("Error en getPosts:", err);
        throw err; 
    }
}



export async function createPost(data, token) {
    const response = await fetch(`${API_URL}/${posts_endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
         },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al crear el post');
    }

    return response.json();
}

export async function editPost(data, token, id) {
    const response = await fetch(`${API_URL}/${posts_endpoint}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
         },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al editar el post');
    }

    return response.json();
}

export async function deletePost(token, id) {
    const response = await fetch(`${API_URL}/${posts_endpoint}/${id}`, {
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
        throw new Error(error.message || 'Error al eliminar el post');
    }

    return response.json();
}