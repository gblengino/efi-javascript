import StatsDashboard from "../components/common/stats/StatsDashboard"

export default function Estadisticas() {
    return(
        
        <div className="flex-1 h-full flex flex-column align-items-center justify-content-start mt-8">
            
           
            <h2 className="mb-5">Estadísticas del Sitio</h2>

            
            <div className="w-10">
                
                <StatsDashboard />
            </div>
        </div>
    )
}