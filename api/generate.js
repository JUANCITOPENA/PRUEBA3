// api/generate.js
// Carga las variables de entorno del archivo .env (solo para desarrollo local)
require('dotenv').config();

const axios = require('axios');

// Middleware simple para CORS (permitir peticiones desde el navegador)
const allowCors = (fn) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permite cualquier origen (para desarrollo)
  // O especifica tu origen local: res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Manejar petición OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  // Ejecutar la función principal
  return await fn(req, res);
};

// La función principal que maneja la petición
const handler = async (req, res) => {
  // 1. Verificar que sea método POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // 2. Obtener el prompt del cuerpo de la petición
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'El campo "prompt" es requerido.' });
  }

  // 3. Obtener la API Key de las variables de entorno
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    console.error('Error: GOOGLE_API_KEY no está configurada.');
    // No reveles detalles de la API Key al cliente
    return res.status(500).json({ error: 'Error de configuración del servidor.' });
  }

  // 4. Definir la URL de la API de Google Gemini
  // Usa un modelo reciente como 'gemini-1.5-flash-latest'
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  try {
    // 5. Realizar la llamada a la API de Google
    const response = await axios.post(apiUrl, {
      // El cuerpo esperado por la API de Gemini
      contents: [{
        parts: [{ text: prompt }]
      }],
      // Opcional: Configuración de generación (ej. para controlar la salida)
      // generationConfig: {
      //   temperature: 0.7,
      //   maxOutputTokens: 2048,
      // }
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // 6. Enviar la respuesta de Google de vuelta al frontend
    return res.status(200).json(response.data);

  } catch (error) {
    // 7. Manejar errores de la llamada a la API
    console.error('Error al llamar a la API de Google:', error.response ? error.response.data : error.message);

    // Construir un mensaje de error útil para el frontend
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data?.error?.message || 'Error interno al procesar la consulta con la IA.';

    return res.status(statusCode).json({ error: errorMessage });
  }
};

// Exportar el handler envuelto en el middleware CORS
module.exports = allowCors(handler);