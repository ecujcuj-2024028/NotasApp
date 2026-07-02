import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Tag, FileText, ArrowLeft } from 'lucide-react';

const apiUrl = import.meta.env.VITE_API_URL;

const EditNotePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/notes/${id}`);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setLoading(false);
            } catch (err) {
                console.error("Error al obtener la nota:", err);
                toast.error("No se pudo cargar la nota. Es posible que no exista.");
                navigate('/');
            }
        };
        fetchNote();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!title.trim() || !description.trim()) {
            toast.warning("Por favor, completa todos los campos.");
            return;
        }

        setSaving(true);

        try {
            await axios.put(`${apiUrl}/api/notes/${id}`, { title, description });
            toast.success("Nota actualizada correctamente");
            navigate('/');
        } catch (err) {
            console.error("Error al editar la nota:", err);
            toast.error("Hubo un error al guardar los cambios.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[70vh]">
                <span className="loading loading-spinner loading-lg text-accent"></span>
                <span className="ml-2 text-white">Cargando nota...</span>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-[70vh] px-4">
            <div className="card bg-base-200/50 backdrop-blur-md border border-base-content/5 w-full max-w-lg shadow-xl rounded-2xl animate-fade-in">
                <div className="card-body">
                    <div className="flex items-center gap-3 mb-6">
                        <button 
                            type="button"
                            className="btn btn-sm btn-ghost btn-circle text-base-content/70 hover:text-white"
                            onClick={() => navigate('/')}
                            disabled={saving}
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <h2 className="card-title text-accent font-extrabold text-2xl">Editar Nota</h2>
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
                                disabled={saving}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-white flex items-center gap-2">
                                    <FileText size={16} className="text-accent" /> Descripción
                                </span>
                            </label>
                            <textarea
                                placeholder="Escribe el contenido de la nota..."
                                className="textarea textarea-bordered h-36 w-full text-white bg-base-300 focus:border-accent transition-all duration-150"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                disabled={saving}
                            ></textarea>
                        </div>

                        <div className="card-actions justify-end mt-4 gap-2">
                            <button
                                type="button"
                                className="btn btn-ghost text-white rounded-xl"
                                onClick={() => navigate('/')}
                                disabled={saving}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="btn btn-accent text-white font-bold rounded-xl shadow-lg shadow-accent/10 px-6"
                                disabled={saving}
                            >
                                {saving ? (
                                    <>
                                        <span className="loading loading-spinner loading-xs"></span>
                                        <span>Guardando...</span>
                                    </>
                                ) : "Guardar Cambios"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditNotePage;
