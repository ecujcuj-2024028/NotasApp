import { useEffect, useState } from 'react'
import CardNote from '../components/CardNote'
import axios from 'axios'
import formatData from '../utils/formatDate'
import { Search, FileText, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

const apiUrl = import.meta.env.VITE_API_URL;

const HomePage = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/notes`);
                setNotes(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error)
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = (id) => {
        setNotes(notes.filter(note => note._id !== id));
    };

    const filteredNotes = notes.filter(note => 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[50vh] gap-4">
                <span className="loading loading-spinner loading-lg text-accent"></span>
                <span className="text-sm text-base-content/60 font-medium">Cargando tus notas...</span>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header / Dashboard Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-base-200/40 p-6 rounded-2xl border border-base-content/5">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">Mis Notas</h1>
                    <p className="text-sm text-base-content/70 mt-1">
                        {notes.length === 0 
                            ? "Crea tu primera nota para empezar a organizarte." 
                            : `Organiza tus ideas. Tienes ${notes.length} ${notes.length === 1 ? 'nota' : 'notas'} en total.`
                        }
                    </p>
                </div>
                
                {notes.length > 0 && (
                    <div className="relative w-full md:w-80">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/50">
                            <Search size={18} />
                        </span>
                        <input
                            type="text"
                            placeholder="Buscar notas..."
                            className="input input-bordered w-full pl-10 bg-base-300 text-white focus:border-accent"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                )}
            </div>

            {/* Notes Grid or Empty States */}
            {notes.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-base-200/20 border-2 border-dashed border-base-content/10 rounded-3xl gap-6">
                    <div className="p-4 bg-accent/10 text-accent rounded-full">
                        <FileText size={48} className="animate-pulse" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white">No tienes notas guardadas</h3>
                        <p className="text-sm text-base-content/60 max-w-sm">
                            Comienza a escribir tus pensamientos, ideas o listas de tareas creando una nota.
                        </p>
                    </div>
                    <Link to="/createNote" className="btn btn-accent text-white font-bold gap-2 rounded-xl">
                        <Plus size={18} />
                        Crear Nota
                    </Link>
                </div>
            ) : filteredNotes.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-base-200/10 rounded-2xl gap-4">
                    <span className="text-lg font-semibold text-base-content/70">No se encontraron notas</span>
                    <p className="text-sm text-base-content/50">
                        Ninguna de tus notas coincide con la búsqueda "{searchQuery}".
                    </p>
                    <button 
                        className="btn btn-sm btn-outline text-white mt-2"
                        onClick={() => setSearchQuery('')}
                    >
                        Limpiar Búsqueda
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-6 xl:grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))]">
                    {filteredNotes.map(note => (
                        <CardNote
                            key={note._id}
                            title={note.title}
                            description={note.description}
                            id={note._id}
                            date={formatData(note.createdAt)}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default HomePage
