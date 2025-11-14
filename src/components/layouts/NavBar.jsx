import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { Button } from 'primereact/button';


export default function NavBar() {
    
    const {user, logout, token} = useContext(AuthContext)
    const navigate = useNavigate()

    const items = [
        {
            label: 'Inicio',
            icon: 'pi pi-home',
            command: () => navigate('/')
        },
    ]
    if (user) {
        items.push(
            {
                label: 'Nuevo Post',
                icon: 'pi pi-plus',
                command: () => navigate('/posts/new')
            }
        )

        if (user.role === 'admin' || user.role === 'moderator') {
            items.push({
                label: 'Estadísticas',
                icon: 'pi pi-chart-bar', 
                command: () => navigate('/stats')
            })
        }
        if (user.role === 'admin') {
            items.push({
                label: 'Crear Categoría',
                icon: 'pi pi-plus', 
                command: () => navigate('/categories')
            })
        }
    }

    const end = user ? (
        <Button 
            label="Cerrar Sesión" 
            icon="pi pi-sign-out" 
            className="p-button-danger" 
            onClick={logout} 
        />
    ) : (
        <Button
            label="Login"
            icon="pi pi-sign-in"
            className='p-button-text'
            onClick={()=>navigate('/login')}
        />
    )

    return (
        <Menubar model={items} end={end} />
    )

}