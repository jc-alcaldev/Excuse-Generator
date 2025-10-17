
// Llama a nuestro propio servidor de Node.js, donde se ejecuta el backend
const BACKEND_URL = "http://localhost:3000/api/generate-excuse"; 

const inputTopic = document.getElementById('excuse-topic');
const outputDiv = document.getElementById('excuse-output');
const generateButton = document.getElementById('generate-button');


// Listener para el botón
if (generateButton) {
    generateButton.addEventListener('click', generateExcuse);
}

async function generateExcuse() {
    const topic = inputTopic.value.trim(); // Obtiene el valor y quita espacios
    
    // Si el campo está vacío, la IA generará una excusa general
    const topicToSend = topic || "estar muy distraído hoy"; 

    // 1. Mostrar estado de carga
    generateButton.disabled = true;
    generateButton.textContent = "Generando... ⏳";
    outputDiv.textContent = "Pensando una excusa super creible...";

    try {
        // 2. Llama a nuestro servidor Express
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Enviamos el tema en el cuerpo JSON
            body: JSON.stringify({ topic: topicToSend })
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        
        // 3. Mostrar el resultado o el error del servidor
        if (data.excuse) {
            outputDiv.textContent = data.excuse;
        } else {
            outputDiv.textContent = data.error || "Error al obtener la excusa del servidor.";
        }

    } catch (error) {
        console.error("Error al generar excusa:", error);
        outputDiv.textContent = "Error de conexión. Asegúrate de que tu servidor Node.js esté corriendo en el puerto 3000.";
    } finally {
        // 4. Restaurar el botón
        generateButton.disabled = false;
        generateButton.textContent = "Generar Excusa IA";
    }
}