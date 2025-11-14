import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
import CategoryCard from "./CategoryCard";
import { GetData } from "../../services/get_method";
import { Endpoints } from "../../utils/constantAPIMethods";
import { AuthContext } from "../../context/AuthContext";

export default function CategoriesList() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useContext(AuthContext)

    useEffect(() => {
            const fetchCategories = async () => {
                try {
                    setLoading(true);
                    const response = await GetData({ methodToExecute: Endpoints.GET_CATEGORIES });

                    setCategories(response);
                    
                } catch (err) {
                    setError(err.message);
                    toast.error(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchCategories();
        }, []);

    if (loading) {
        
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <ProgressSpinner />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
        <h1 className="text-center text-2xl font-bold my-6">
            Categorías Disponibles
        </h1>

        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 justify-items-center">
            {categories.length === 0 ? (
                <p className="col-span-full text-center">No hay categorías para mostrar.</p>
            ) : (
                [...categories].reverse().map(category => (
                    <CategoryCard
                        key={category.id}
                        id={category.id}
                        name={category.name}
                    />
                ))
            )}
        </div>
        </>

    );
}