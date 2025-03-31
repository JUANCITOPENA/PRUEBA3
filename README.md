# Simple Gemini AI Web App

Esta es una aplicación web básica que permite a los usuarios enviar consultas a la API de Google Gemini y ver las respuestas. Utiliza un frontend simple (HTML, CSS, JS) y un backend serverless (Node.js) diseñado para ejecutarse localmente con `vercel dev` o desplegarse fácilmente en Vercel.

![Ejemplo de la Interfaz](https://via.placeholder.com/600x400.png?text=Imagen+de+la+App+Aquí)
*(Reemplaza la URL de la imagen de arriba con una captura de pantalla real de tu aplicación si lo deseas)*

## Características

*   Interfaz de usuario sencilla para ingresar consultas (prompts).
*   Comunicación con la API de Google Gemini (modelo `gemini-1.5-flash-latest`).
*   Visualización de la respuesta de la IA, con soporte básico para formato Markdown (incluyendo bloques de código).
*   Indicador de carga durante la llamada a la API.
*   Backend serverless en Node.js listo para Vercel.
*   Configuración local simplificada usando `vercel dev` y variables de entorno `.env`.

## Tecnologías Utilizadas

*   **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
*   **Backend (Serverless Function):** Node.js
*   **API:** Google Generative Language API (Gemini)
*   **Librerías Frontend (CDN):**
    *   [Marked.js](https://marked.js.org/): Para renderizar Markdown.
    *   [Prism.js](https://prismjs.com/): Para resaltar sintaxis en bloques de código.
*   **Librerías Backend (npm):**
    *   `axios`: Para realizar peticiones HTTP a la API de Gemini.
    *   `cors`: Para manejar Cross-Origin Resource Sharing en la función serverless.
    *   `dotenv`: Para cargar variables de entorno desde un archivo `.env` en desarrollo local.
*   **Entorno de Desarrollo/Despliegue:** [Vercel CLI](https://vercel.com/docs/cli) (`vercel dev` para local, `vercel deploy` para producción).

## Estructura del Proyecto


mi-proyecto-ia/
├── api/
│ └── generate.js # Función Serverless Node.js que llama a Gemini
├── .env # Archivo para guardar la API Key (¡NO SUBIR A GIT!)
├── .gitignore # Especifica archivos a ignorar por Git
├── index.html # Estructura HTML del frontend
├── package.json # Define dependencias y scripts de Node.js
├── README.md # Este archivo
└── style.css # Estilos CSS para el frontend
└── node_modules/ # Carpeta creada por npm install (ignorada por Git)


## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

*   [Node.js](https://nodejs.org/) (versión LTS recomendada) y npm (viene con Node.js).
*   [Vercel CLI](https://vercel.com/docs/cli) (`npm install -g vercel`).
*   Una [Google Gemini API Key](https://aistudio.google.com/).
*   Git (opcional, pero recomendado para control de versiones).

## Configuración Local

Sigue estos pasos para ejecutar el proyecto en tu máquina:

1.  **Clonar el Repositorio (si está en GitHub):**
    ```bash
    git clone <URL-del-repositorio>
    cd <nombre-del-repositorio>
    ```
    **O si empiezas desde cero, crea la estructura y archivos** como se describe en la sección "Estructura del Proyecto".

2.  **Crear el archivo `.env`:**
    En la raíz del proyecto, crea un archivo llamado `.env` y añade tu clave API de Google:
    ```env
    # .env
    GOOGLE_API_KEY=TU_CLAVE_API_DE_GOOGLE_AQUI
    ```
    **Importante:** Reemplaza `TU_CLAVE_API_DE_GOOGLE_AQUI` con tu clave real. Asegúrate de que `.env` esté listado en tu archivo `.gitignore`.

3.  **Instalar Dependencias:**
    Abre tu terminal en la raíz del proyecto y ejecuta:
    ```bash
    npm install
    ```
    Esto instalará `axios`, `cors` y `dotenv` listados en `package.json` (si no existe `package.json`, ejecúta `npm init -y` antes).

4.  **Iniciar el Servidor de Desarrollo:**
    Ejecuta el comando de Vercel para desarrollo local:
    ```bash
    vercel dev
    ```
    *   **Nota:** La primera vez que ejecutes `vercel dev` en esta carpeta, te hará preguntas para vincular el proyecto a tu cuenta de Vercel. Responde afirmativamente para configurar (`Y`), elige tu scope, indica que no es un proyecto existente (`N`), dale un nombre en minúsculas (ej. `mi-proyecto-ia`), confirma el directorio (`.`) y acepta la configuración detectada (`N`). Esto solo ocurre una vez por carpeta.

5.  **Abrir la Aplicación:**
    `vercel dev` te dará una URL local (normalmente `http://localhost:3000`). Abre esa dirección en tu navegador web.

6.  **Probar:**
    Escribe una consulta en el área de texto y haz clic en "Enviar". Deberías ver la respuesta de la IA.

7.  **Detener el Servidor:**
    Vuelve al terminal y presiona `Ctrl + C`.

## Despliegue en Vercel

1.  **Configurar Variables de Entorno en Vercel:**
    *   Ve al dashboard de tu proyecto en [vercel.com](https://vercel.com/).
    *   Navega a Settings -> Environment Variables.
    *   Añade una variable llamada `GOOGLE_API_KEY`.
    *   Pega tu clave API de Google como valor.
    *   Asegúrate de que esté disponible para los entornos de Production, Preview y Development.

2.  **Desplegar:**
    Desde tu terminal en la raíz del proyecto, ejecuta:
    ```bash
    # Despliega a una URL de preview
    vercel

    # Despliega directamente a producción
    vercel --prod
    ```
    Vercel construirá y desplegará tu aplicación, proporcionando una URL pública.

## Solución de Problemas Comunes

*   **Error 404 al enviar consulta localmente:** Verifica que la estructura `api/generate.js` sea correcta (nombres en minúsculas) y reinicia `vercel dev`.
*   **Errores 500, 400, 403:** Revisa la salida del terminal donde corre `vercel dev`. Usualmente indica problemas con la `GOOGLE_API_KEY` en `.env` o errores devueltos por la API de Gemini. Asegúrate de que la clave sea correcta y esté habilitada en Google Cloud/AI Studio.
*   **La aplicación no carga en `localhost:3000`:** Asegúrate de que `vercel dev` se esté ejecutando activamente en el terminal.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un *issue* para discutir cambios mayores o un *pull request* para mejoras menores o correcciones de errores.

## Licencia

[MIT](LICENSE) *(O la licencia que prefieras. Si no tienes un archivo LICENSE, puedes omitir esta sección o elegir una licencia como MIT)*.
