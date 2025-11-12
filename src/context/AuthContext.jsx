import React, { createContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)


    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken)
                if (decoded.expires_delta * 1000 > Date.now()) {
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
            const response = await fetch('ttp://18.223.136.198:5000/api/login', {
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

    return (
        <AuthContext.Provider value={{ user, token, login }}>
            {children}
        </AuthContext.Provider>
    )

}