import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Tag, FileText, ArrowLeft } from 'lucide-react';

const apiUrl = import.meta.env.VITE_API_URL;

const CreateNotePage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!title.trim() || !description.trim()) {
            toast.warning("Por favor, completa todos los campos.");
            return;
        }

        setLoading(true);

        try {
            await axios.post(`${apiUrl}/api/notes`, { title, description });
            toast.success("Nota creada correctamente");
            navigate('/');
        } catch (err) {
            console.error("Error al crear la nota:", err);
            toast.error("Hubo un error al crear la nota.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[70vh] px-4">
            <div className="card bg-base-200/50 backdrop-blur-md border border-base-content/5 w-full max-w-lg shadow-xl rounded-2xl animate-fade-in">
                <div className="card-body">
                    <div className="flex items-center gap-3 mb-6">
                        <button 
                            type="button"
                            className="btn btn-sm btn-ghost btn-circle text-base-content/70 hover:text-white"
                            onClick={() => navigate('/')}
                            disabled={loading}
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <h2 className="card-title text-accent font-extrabold text-2xl">Crear Nueva Nota</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-white flex items-center gap-2">
                                    <Tag size={16} className="text-accent" /> Título
                                </span>
                            </label>
                            <input
                                type="text"
                                placeholder="Escribe el título aquí..."
                                className="input input-bordered w-full text-white bg-base-300 focus:border-accent transition-all duration-150"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                
                            </label>
                            <textarea
                                placeholder="Escribe el contenido de la nota..."
                                className="textarea textarea-bordered h-36 w-full text-white bg-base-300 focus:border-accent transition-all duration-150"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                disabled={loading}
                            ></textarea>
                        </div>

                        <div className="card-actions justify-end mt-4 gap-2">
                            <button
                                type="button"
                                className="btn btn-ghost text-white rounded-xl"
                                onClick={() => navigate('/')}
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="btn btn-accent text-white font-bold rounded-xl shadow-lg shadow-accent/10 px-6"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner loading-xs"></span>
                                        <span>Guardando...</span>
                                    </>
                                ) : "Crear Nota"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateNotePage;
