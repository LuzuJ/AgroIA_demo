# AgriEcuador: Precios de Mercado y Doctor de Cultivos con IA

AgriEcuador es una aplicación web progresiva (PWA) enfocada en empoderar a los agricultores de Ecuador mediante acceso a información vital y herramientas de diagnóstico, optimizada para funcionar en zonas de baja conectividad.

## 🚀 Características Principales

1.  **Precios del Mercado (Offline First):**
    *   Consulta los precios locales de los productos agrícolas más importantes del Ecuador (Cacao, Banano, Arroz, Maíz, etc.).
    *   **Integración Global Inteligente:** Para el Cacao, la app se conecta (vía API Ninjas) con los mercados de valores globales (ICE New York) y aplica descuentos logísticos y de calidad para estimar el *precio real justo* en finca.
    *   **Caché Offline:** Los precios se guardan en el dispositivo para poder consultarlos sin internet.
    *   **Calculadora de Ingresos:** Filtra los precios por Quintal, Kilos, Libras o Toneladas y estima tus ganancias.

2.  **Doctor de Cultivos Inteligente:**
    *   Catálogo avanzado con las enfermedades más críticas por cultivo.
    *   Tarjetas interactivas con **Acción Inmediata**, **Control Biológico**, y **Control Químico**.
    *   Checklists interactivos paso a paso para aplicar tratamientos, con precauciones, dosis y frecuencia.
    *   Fotos de alta resolución de patologías reales almacenadas localmente para funcionar 100% offline.

3.  **Chatbot IA Agro-experto (Gemini):**
    *   Integración con el SDK de Gemini de Google para responder consultas agrícolas avanzadas en tiempo real.

## 🛠️ Tecnologías Utilizadas

*   **Frontend:** React, TypeScript, Vite.
*   **Estilos:** Tailwind CSS (diseño responsivo, glassmorphism, mobile-first).
*   **Offline/PWA:** Vite PWA Plugin, LocalStorage caching.
*   **APIs Externas:** Google Gemini SDK, API Ninjas (Commodity Prices).

## 📦 Instrucciones de Instalación Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción (PWA)
npm run build
```

## 🔐 Configuración de Variables de Entorno

Renombra el archivo `.env.example` a `.env` y configura tus accesos:

```env
# URL de precios locales (por defecto lee de public/api/prices.json)
VITE_PRICES_API_URL=/api/prices.json

# API Key de Gemini para el Chatbot
VITE_GEMINI_API_KEY=tu_clave_aqui

# API Key de API-Ninjas para precios globales de Cacao en tiempo real
VITE_API_NINJAS_KEY=tu_clave_aqui
```

## 🌐 Despliegue a Producción

AgriEcuador está diseñado como una SPA estática, por lo que es ideal para alojarse gratuitamente en plataformas como **Vercel**, **Netlify** o **GitHub Pages**.

1.  Sube este repositorio a GitHub.
2.  Conecta tu cuenta de GitHub a Vercel/Netlify.
3.  Selecciona el repositorio.
4.  Configura el comando de build: `npm run build`
5.  Directorio de salida: `dist`
6.  **¡Importante!** Añade las variables de entorno (`VITE_GEMINI_API_KEY` y `VITE_API_NINJAS_KEY`) en la configuración del proyecto en Vercel/Netlify antes de desplegar.

---
*Desarrollado para revolucionar la agricultura en Ecuador mediante tecnología accesible.*
