# 🚀 Simple Gemini AI Web App (Guía de Configuración Local)

Esta es una aplicación web básica que permite a los usuarios enviar consultas a la **API de Google Gemini** y ver las respuestas. Utiliza un frontend simple (HTML, CSS, JS) y un backend serverless (Node.js) que se ejecuta localmente simulando el entorno de Vercel con `vercel dev`.

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

1. **Node.js y npm:** Necesarios para ejecutar JavaScript en el backend, gestionar paquetes y usar Vercel CLI. Verifica tu instalación abriendo tu terminal y ejecutando:
   ```bash
   node -v
   npm -v
   ```
   Si no los tienes, descárgalos desde [nodejs.org](https://nodejs.org/) (se recomienda la versión LTS).

2. **Vercel CLI:** La herramienta de línea de comandos de Vercel. Instálala globalmente e inicia sesión:
   ```bash
   npm install -g vercel
   vercel login
   ```
   Sigue las instrucciones para autenticarte (generalmente a través del navegador).

3. **Google Gemini API Key:** Necesitas una clave API para usar Gemini. Puedes obtenerla desde [Google AI Studio](https://aistudio.google.com/) o la consola de Google Cloud. Asegúrate de que la API esté habilitada para tu proyecto.

4. **Un Editor de Código:** Como [Visual Studio Code](https://code.visualstudio.com/), Sublime Text, etc.

5. **Git (Opcional pero recomendado):** Si planeas usar GitHub.

## 🛠️ Herramientas Esenciales a Instalar

Instala estas herramientas iniciales y esenciales en tu computadora **ANTES** de empezar a crear los archivos del proyecto:

### 💻 PASO 1: Instalar Visual Studio Code (VS Code)

**¿Qué es?** Es el programa donde escribirás y editarás todo el código (HTML, CSS, JavaScript).

**¿Dónde conseguirlo?** Ve al sitio web oficial: https://code.visualstudio.com/

**Pasos de Instalación:**

1. Abre el enlace en tu navegador.
2. La página detectará automáticamente tu sistema operativo. Haz clic en el botón grande de descarga.
3. Se descargará un archivo instalador.
4. Ejecuta ese archivo.
5. En el asistente de instalación:
   - Acepta el acuerdo de licencia.
   - Elige la carpeta de instalación (la ubicación por defecto suele estar bien).
   - En "Tareas Adicionales", asegúrate de marcar "Agregar al PATH" (**importante**).
   - Haz clic en "Instalar".
6. ¡Listo! Ahora puedes buscar "Visual Studio Code" en tu menú de inicio y abrirlo.

### ⚙️ PASO 2: Instalar Node.js y npm

**¿Qué es?** Node.js es el entorno que permite ejecutar JavaScript fuera del navegador. npm (Node Package Manager) viene incluido y se usa para instalar librerías.

**¿Dónde conseguirlo?** Ve al sitio web oficial: https://nodejs.org/

**Pasos de Instalación:**

1. Abre el enlace en tu navegador.
2. Elige la versión **LTS** (Long Term Support).
3. Ejecuta el archivo descargado.
4. En el asistente de instalación:
   - Acepta los términos de licencia.
   - Elige la carpeta de instalación.
   - Asegúrate de que la opción "Add to PATH" esté seleccionada (**crucial**).
   - Haz clic en "Instalar".
5. **Verificación Importante:**
   - Cierra TODOS los terminales abiertos.
   - Abre un NUEVO terminal.
   - Escribe `node -v` y presiona Enter.
   - Escribe `npm -v` y presiona Enter.
   - Si ves números de versión, ¡todo está correcto!

### 🔄 PASO 3: Instalar Vercel CLI

**¿Qué es?** Es la herramienta de línea de comandos de Vercel para ejecutar y desplegar tu proyecto.

**Pasos de Instalación:**

1. Abre un terminal.
2. Escribe el siguiente comando y presiona Enter:
   ```bash
   npm install -g vercel
   ```
3. Verifica la instalación:
   ```bash
   vercel --version
   ```
4. Iniciar Sesión:
   ```bash
   vercel login
   ```
5. Sigue las instrucciones para autorizar la conexión.

## 📁 Pasos de Configuración

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local.

### 1. Crear la Carpeta del Proyecto

Crea una carpeta en tu computadora donde vivirá el proyecto. Abre tu terminal y usa:

```bash
# Elige una ubicación (ej. Escritorio)
cd ~/Desktop
# Crea la carpeta del proyecto
mkdir mi-proyecto-ia
# Entra en la carpeta
cd mi-proyecto-ia
```

### 2. Estructura de Archivos

Tu proyecto tendrá esta estructura:

```
mi-proyecto-ia/
├── api/
│   └── generate.js      <-- Archivo de la función serverless
├── .env                 <-- Archivo para la API Key (local)
├── .gitignore           <-- Archivo para ignorar archivos en Git/Vercel
├── index.html           <-- El frontend de la aplicación
├── style.css            <-- Estilos CSS para el frontend
└── package.json         <-- Se creará con npm init
```

Para crear esta estructura, dentro de la carpeta del proyecto ejecuta:

```bash
# Dentro de mi-proyecto-ia
mkdir api
touch index.html style.css .env .gitignore api/generate.js
```
