import { API_URL } from "./api";
import { Endpoints } from "../utils/constantAPIMethods";

function buildUrl(methodToExecute, id){
    switch(methodToExecute){
        case Endpoints.GET_POSTS:
            return `${API_URL}/posts`
        case Endpoints.GET_POST_BY_ID:
            return `${API_URL}/posts/${id}`
        case Endpoints.GET_COMMENTS:
            return `${API_URL}/posts/${id}/comments`
        case Endpoints.GET_CATEGORIES:
            return `${API_URL}/categories`
    }
}

export async function GetData({ methodToExecute, id }) {
    const url = buildUrl(methodToExecute, id);
    const response = await fetch(url, {
        method: "GET",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al crear el post');
    }

    return response.json();
}