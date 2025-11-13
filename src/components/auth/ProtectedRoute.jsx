import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';


export const ProtectedRoute = ({ children, roles = [] }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    if (!user) {
       
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!roles.includes(user.role)) {
        toast.error("No tienes permiso para acceder a esta página.");

        return <Navigate to="/" replace />;
    }

    return children;
};