# Plataforma de Evaluación de Talento

Una aplicación completa para evaluaciones profesionales con análisis de IA.

## 🚀 Despliegue en Netlify

### Paso 1: Preparar el Repositorio
1. Descarga todos los archivos del proyecto desde Bolt
2. Crea un nuevo repositorio en GitHub
3. Sube todos los archivos al repositorio

### Paso 2: Configurar Netlify
1. Ve a [netlify.com](https://netlify.com) y crea una cuenta
2. Haz clic en "New site from Git"
3. Conecta tu repositorio de GitHub
4. Configura los settings de build:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18`

### Paso 3: Variables de Entorno
En Netlify, ve a Site settings > Environment variables y agrega:

```
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
VITE_GEMINI_API_KEY=tu_clave_de_gemini_ai
```

### Paso 4: Configurar Supabase
1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Ve a Settings > API para obtener tu URL y clave anónima
3. Ejecuta las migraciones SQL desde la carpeta `supabase/migrations/`

### Paso 5: Configurar Gemini AI
1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crea una API key para Gemini
3. Agrégala a las variables de entorno de Netlify

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
├── services/           # Servicios (Supabase, Gemini, PDF)
├── types.ts           # Definiciones de tipos
├── constants.ts       # Preguntas y configuraciones
└── App.tsx           # Componente principal
```

## 🔧 Tecnologías Utilizadas

- **Frontend**: React + TypeScript + Tailwind CSS
- **Base de datos**: Supabase
- **IA**: Google Gemini
- **PDF**: jsPDF
- **Hosting**: Netlify

## 📊 Características

- ✅ 5 tipos de evaluaciones profesionales
- ✅ Panel de administración completo
- ✅ Análisis con IA
- ✅ Generación de reportes PDF
- ✅ Exportación a CSV
- ✅ Diseño responsive

## 🛠️ Desarrollo Local

```bash
npm install
npm run dev
```

## 📝 Licencia

Todos los derechos reservados - BoadMate.net