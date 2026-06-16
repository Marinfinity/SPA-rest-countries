import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors()); // permite que React (puerto 5173) llame al backend (puerto 3001)
app.use(express.json());

// Simular una base de datos en memoria
let favoritos: string[] = ["Spain", "Japan", "Brazil"];

// GET — devuelve los favoritos
app.get("/api/favoritos", (req, res) => {
    res.json({ data: favoritos });
});

// POST — añade un país a favoritos
app.post("/api/favoritos", (req, res) => {
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: "El campo nombre es obligatorio" });
    }
    if (favoritos.includes(nombre)) {
        return res.status(409).json({ error: "El país ya está en favoritos" });
    }

    favoritos.push(nombre);
    res.status(201).json({ data: favoritos });
});

// DELETE — elimina un país de favoritos
app.delete("/api/favoritos/:nombre", (req, res) => {
    const { nombre } = req.params;
    favoritos = favoritos.filter(f => f !== nombre);
    res.json({ data: favoritos });
});

app.listen(PORT, () => {
    console.log(`Backend corriendo en http://localhost:${PORT}`);
});