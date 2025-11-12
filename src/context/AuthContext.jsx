import React, { createContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import { API_URL } from '../services/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)


useEffect(() => {
        const storedToken = localStorage.getItem('token')
        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken)
                
                if (decoded.exp * 1000 > Date.now()) {
                    setUser(decoded)
                    setToken(storedToken)
                } else {
                    localStorage.removeItem("token")
                }
            } catch (error) {
                console.error("token invalido", error)
                localStorage.removeItem("token")
            }
        }
    }, [])

    const login = async (username, password) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            })
            if (!response.ok) return toast.error("Credenciales incorrectas")

            const data = await response.json()
            const jwtToken = data.access_token



            if (!jwtToken) return toast.error("No se recibio el token")

            localStorage.setItem('token', jwtToken)
            const decoded = jwtDecode(jwtToken)
            setUser(decoded)
            setToken(jwtToken)
            console.log(jwtToken)
            toast.success('Inicio de sesion exitoso')
            return true
        } catch (error) {
            toast.error("Hubo un error al iniciar sesion", error.message)
            return false
        }
    }

    // --- FUNCIÓN LOGOUT ---
    const logout = () => {
        localStorage.removeItem('token'); 
        setUser(null);                   
        setToken(null);                 
        toast.info("Has cerrado sesión.");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}