import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { getStats } from '../../../services/statsService';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Card } from 'primereact/card';


export default function StatsDashboard() {
    const { token } = useContext(AuthContext);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // 1. Llama al servicio
                const data = await getStats(token);
                setStats(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchStats();
        }
    }, [token]); 

   
    if (loading) {
        return <ProgressSpinner />;
    }

    
    if (error) {
        return <p>Error al cargar estadísticas: {error}</p>;
    }

   
    const StatCard = ({ title, value }) => (
        <Card title={title} className="md:w-25rem w-full">
            <p className="p-text-secondary" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                {value}
            </p>
        </Card>
    );

    
    return (
        <div className="p-fluid grid formgrid">
            {stats.total_posts !== undefined && (
                <div className="field col-12 md:col-6 lg:col-3">
                    <StatCard title="Total de Posts" value={stats.total_posts} />
                </div>
            )}
            {stats.total_comments !== undefined && (
                <div className="field col-12 md:col-6 lg:col-3">
                    <StatCard title="Total de Comentarios" value={stats.total_comments} />
                </div>
            )}
            {stats.total_users !== undefined && (
                <div className="field col-12 md:col-6 lg:col-3">
                    <StatCard title="Total de Usuarios" value={stats.total_users} />
                </div>
            )}
            
            {/* Este solo aparece si la API lo envía (para Admins) */}
            {stats.posts_last_week !== undefined && (
                <div className="field col-12 md:col-6 lg:col-3">
                    <StatCard title="Posts Última Semana" value={stats.posts_last_week} />
                </div>
            )}
        </div>
    );
}