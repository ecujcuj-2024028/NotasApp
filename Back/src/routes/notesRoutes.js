import express from "express";
import Note from "../models/noteModels.js";
const router = express.Router();

//Obtener todas las notas
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error al obtener las notas", error);
        res.status(500).json({ message: "Error al obtener las notas" })
    }
});


//Obtener una nota por Id
router.get("/:id", async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }
        res.json(note);
    } catch (e) {
        console.error("Error al obtener la nota", e);
        res.status(500).json({ message: "Error al obtener la nota" });
    }
});


//Crear una nota
router.post("/", async (req, res) => {
    try {
        const { title, description } = req.body;
        const note = new Note({ title, description });

        const savedNote = await note.save()

        if (savedNote) {
            res.status(201).json({ message: "Nota creada correctamente", note: savedNote });
        }
    } catch (e) {
        console.error("Error al crear la nota", e);
        res.status(500).json({ message: "Error al crear la nota" });
    }
})

// Eliminar una nota
router.delete("/:id", async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }
        res.json({ message: "Nota eliminada correctamente" });
    } catch (e) {
        console.error("Error al eliminar la nota", e);
        res.status(500).json({ message: "Error al eliminar la nota" });
    }
})

// Editar una nota
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(id, { title, description }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }
        res.status(200).json({ message: "Nota actualizada correctamente", note: updatedNote });
    } catch (error) {
        console.error("Error al editar la nota", error);
        res.status(500).json({ message: "Error al editar la nota" });
    }
})
export default router;