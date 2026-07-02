import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SquarePen, Trash } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'

const apiUrl = import.meta.env.VITE_API_URL;

const CardNote = ({ title, description, id, date, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            await axios.delete(`${apiUrl}/api/notes/${id}`);
            onDelete(id);
            toast.info("Nota eliminada correctamente");
        } catch (error) {
            console.error("Error al eliminar la nota:", error);
            toast.error("No se pudo eliminar la nota.");
            setIsDeleting(false);
        }
    };

    return (
        <div className="card bg-base-300 w-full shadow-md hover:shadow-lg transition-all duration-200">
            <div className="card-body">
                <h2 className="card-title text-accent font-bold lg:text-2xl">{title}</h2>
                <p className="text-amber-50">
                    {description}
                </p>
                
                {isDeleting ? (
                    <div className="flex justify-between items-center mt-6 bg-error/15 border border-error/30 p-2.5 rounded-lg animate-fade-in">
                        <span className="text-xs font-semibold text-error">¿Eliminar esta nota?</span>
                        <div className="flex gap-2">
                            <button 
                                className="btn btn-xs btn-error text-white font-bold px-3 py-1 rounded" 
                                onClick={handleDelete}
                            >
                                Sí
                            </button>
                            <button 
                                className="btn btn-xs btn-ghost text-white px-3 py-1 rounded" 
                                onClick={() => setIsDeleting(false)}
                            >
                                No
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-between items-center mt-6">
                        <time dateTime="" className="text-sm opacity-70">{date}</time>
                        <div className="flex gap-4">
                            <Link to={`/editNote/${id}`}>
                                <SquarePen className="text-white cursor-pointer hover:text-accent transition-colors duration-150" size={20}></SquarePen>
                            </Link>
                            <Trash 
                                className="text-red-400 cursor-pointer hover:text-red-500 transition-colors duration-150" 
                                size={20} 
                                onClick={() => setIsDeleting(true)}
                            ></Trash>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CardNote
