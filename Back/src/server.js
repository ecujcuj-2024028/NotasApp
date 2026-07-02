import express from "express";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Para poder leer el cuerpo de las solicitudes
app.use("/api/notes", notesRoutes);

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server en el puerto ${PORT}`);
        })
    })



