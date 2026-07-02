import React from 'react'

const NoteForm = () => {
    return (
        <form className="bg-base-300  rounded-lg max-w-4xl mx-auto p-10">
            <input
                className="block w-full mb-8 input lg:input-lg focus:ring-0 border-0"
                placeholder="Titulo de la nota"
                type="text"
                id="title"
                name="title"
                required
            />
            <textarea
                name="description" 
                id="description" 
                placeholder="Escribe tu nota..." 
                className="block w-full mb-8 textarea lg:textarea-lg focus:ring-0 border-0" 
                required
            >

            </textarea>
        </form>
    )
}

export default NoteForm