import { useState } from 'react';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { AuthContext } from '../../../context/AuthContext.jsx' 
import { useContext } from 'react'
import { createCategory } from '../../../services/category_service.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CategoriesList from '../../common/CategoriesList.jsx';

export default function CategoryForm() {

    const navigate = useNavigate()

    const {token} =  useContext(AuthContext)

    const [category, setCategory] = useState("");
    const [error, setError] = useState("");

    const validateCategory = (text) => {
        if (text.length < 1) return "La categoría debe tener al menos 1 carácter.";
        if (text.length > 50) return "La categoría no puede exceder los 50 carácteres.";
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateCategory(category);
        if (validationError) {
            setError(validationError);
            return;
        }
        setError("");

        try {
            const categorySuccess = await createCategory({name: category}, token);
            toast.success("Categoría creada exitosamente.");
            setCategory("");
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
        <CategoriesList/>
        <form onSubmit={handleSubmit} className='flex-1 flex flex-column gap-3'>
            <InputTextarea
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Crea una categoria..."
                rows={3}
            />
            {error && <small className="text-red-500">{error}</small>}
            <Button type="submit" label="Enviar" />
        </form>
        </>

    )
}