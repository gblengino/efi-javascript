import { API_URL } from './api';




export const getStats = async (token) => {
    try {
        const response = await fetch(`${API_URL}/stats`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                
                'Authorization': `Bearer ${token}` 
            }
        });

        if (!response.ok) {
            throw new Error('No se pudo obtener las estadísticas');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error al llamar a /api/stats:", error);
        throw error; 
    }
};