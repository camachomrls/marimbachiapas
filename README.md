# Marimba Orquesta Chiapas — Web Unificada

Proyecto web moderno desarrollado en **React 19 + TypeScript + Vite + Tailwind CSS v4**, que unifica el nuevo diseño estético y responsive en TSX con todo el contenido, audios reales, videos y funcionalidades del sitio web original.

---

## 🎵 ¿Qué incluye esta versión unificada?

1. **Diseño Visual Moderno y Artesanal en TSX**:
   - Paleta cálida chiapaneca (tonos madera, terracota, crema, oro y verde WhatsApp).
   - Tipografía editorial elegante (*Libre Caslon Display* y *Manrope*).
   - Logotipo animado con barras de marimba (`brand-bars`).
   - Cenefa artesanal y patrones de marquetería tradicional de Ocozocoautla (Coita), Chiapas.
   - Diseño 100% responsivo para móviles, tablets y computadoras de escritorio.

2. **Catálogo Completo de Repertorio Musical (75 Melodías Reales)**:
   - Archivos de audio reales (`.mp3`) organizados por categorías oficiales:
     - **Boleros** (12 canciones)
     - **Vals y rancheras** (10 canciones)
     - **Corridos y pasos dobles** (17 canciones)
     - **Cumbias y mambos** (13 canciones)
     - **Zapateados tradicionales, carnavaleros y zoques** (23 canciones)
   - **Reproducción interactiva exclusiva**: un solo audio suena a la vez; al iniciar una nueva canción se pausa y reinicia la anterior automáticamente.
   - Barra flotante de mini-reproductor con ecualizador animado.
   - Búsqueda en tiempo real (insensible a acentos y mayúsculas) y filtros por género con contadores dinámicos.

3. **Galería de Videos en Vivo ("Melodías donde las maderas cantan")**:
   - Los 6 videos originales de YouTube embebidos en cuadrícula responsiva:
     - `64uAPd141hg`
     - `aRbR7yCHhcs`
     - `eDgFCD3f0Nk`
     - `xkynVMmkmNw`
     - `yCdjWLHlFe4`
     - `Vi6NqhVYecw`

4. **Sección Fotográfica y Presentación de la Orquesta**:
   - Fotografías auténticas de la agrupación y el maestro (`marimbachis.jpg`).
   - Reseña del **Mtro. Rogelio Gómez** y su trayectoria musical en Ocozocoautla de Espinosa y Chiapas.

5. **Módulo Completo de Cotizaciones y Reserva**:
   - Selector interactivo de tipo de evento (*Bodas y Aniversarios*, *XV Años*, *Carnaval Zoque Coiteco*, *Serenatas*, *Graduaciones*, *Eventos Empresariales*).
   - Enlace directo a WhatsApp con mensaje personalizado pre-llenado.
   - Enlaces directos a llamada móvil (`Cel: 968 106 5475`) y teléfono fijo (`Casa: 968 688 3081`).
   - Ubicación en Google Maps (*2a. Ote. Sur #758 B. San Antonio, Ocozocoautla de Espinosa, Chiapas*).
   - Enlace oficial a Facebook (`Heri Gómez`).

6. **Botón Flotante Persistente de WhatsApp**:
   - Disponible en todo momento para atención y cotización rápida.

---

## 📁 Estructura del Proyecto

```text
Marimba Orquesta Web/
├── public/
│   ├── Bailes/                                              # Audios MP3
│   ├── audios_drive/                                        # Audios MP3
│   ├── audios_youtube/                                      # Audios MP3
│   ├── marimba chiapas exitos romanticos/                   # Audios MP3
│   ├── Audios para carnaval marimba chis-20240215T194158Z-001/ # Audios Carnaval
│   ├── marimbachis.jpg                                      # Fotografía oficial
│   ├── 1724804583956.jpg                                    # Fotografía
│   ├── favicon.svg                                          # Ícono
│   └── marimba.png                                          # Logo
├── src/
│   ├── data/
│   │   ├── songsData.ts                                     # Catálogo maestro (75 canciones con metadatos)
│   │   └── videosData.ts                                    # Catálogo de 6 videos de YouTube
│   ├── App.tsx                                              # Aplicación React unificada
│   ├── index.css                                            # Estilos Tailwind + custom Chiapaneco
│   ├── main.tsx                                             # Entrypoint de React
│   └── vite-env.d.ts
├── index.html                                               # Plantilla HTML con metadatos
├── package.json                                             # Dependencias
├── tsconfig.json                                            # Configuración TypeScript
└── vite.config.ts                                           # Configuración Vite + Tailwind CSS v4
```

---

## 🚀 Cómo Ejecutar

```bash
# Instalar dependencias (si aún no están instaladas)
pnpm install
# o con npm
npm install

# Iniciar el servidor de desarrollo
pnpm dev
# o con npm
npm run dev
```
