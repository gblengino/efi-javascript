import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

// Boton para utilizar en redirecciones dentro de la web con useNavigate()
// Ahorra tener que inicializar useNavigate() en cada lugar que necesitemos un boton asi

export default function LinkButton({to, label, ...props}) {
    const navigate = useNavigate()

    const handleClick = () => {
        if (to) navigate(to)
        if (props.onClick) props.onClick()
    }

    return (
        <Button
            label={label}
            onClick={handleClick}
            {...props} // Las demas propiedades que pase iran al componente Button de PR (ej. severity, icon, etc.)
        />
    )
}