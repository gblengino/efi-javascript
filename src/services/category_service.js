import { API_URL } from "./api";

const category_endpoint = 'categories'

export async function getCategories() {
    const response = await fetch(`${API_URL}/${category_endpoint}`, {
        method: "GET",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al crear el post');
    }

    return response.json();
}

export async function createCategory(data, token) {
    const response = await fetch(`${API_URL}/${category_endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
         },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al crear la categoría.');
    }

    return response.json();
}