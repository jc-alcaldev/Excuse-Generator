// server/server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Para permitir la comunicación con el frontend
const { GoogleGenAI } = require('@google/genai'); 

dotenv.config();

const app = express();
const port = 3000; 

// MIDDLEWARE
// Permite que cualquier frontend (incluso Live Server) acceda a este servidor
app.use(cors()); 
app.use(express.json()); // Permite a Express leer el cuerpo de las peticiones JSON

// Inicializa el cliente de la IA de Gemini (la clave se lee de .env)
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

// RUTA API para generar la excusa
app.post('/api/generate-excuse', async (req, res) => {
    try {
        const { topic } = req.body;
        
        if (!topic) {
            return res.status(400).json({ error: "Falta el tema (topic) de la excusa." });
        }

        const promptText = `Crea una excusa muy creativa, divertida y absurda de una frase para: "${topic}". La excusa debe ser corta y no usar más de 20 palabras.`;

        // Llamada segura a la API de Gemini
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: promptText,
        });

        const generatedText = response.text;

        // Devuelve la excusa generada al frontend
        res.json({ excuse: generatedText });

    } catch (error) {
        console.error("Error al generar excusa con la IA:", error.message);
        res.status(500).json({ error: "Error interno del servidor al contactar con la IA. Posiblemente clave API inválida o error del modelo." });
    }
});

app.listen(port, () => {
    console.log(`Servidor de excusas IA escuchando en http://localhost:${port}`);
});