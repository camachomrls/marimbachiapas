# Plan de implementación — Marimba Orquesta Chiapas, tres variantes

## 1. Objetivo y criterios de éxito

Construir un prototipo web responsive en React + Vite + Tailwind CSS v4 para **Marimba Orquesta Chiapas**, con tres rutas independientes que muestran exactamente el mismo contenido y funcionalidad bajo tres direcciones visuales:

- `/variante-a`: **Neumorfismo Suave**
- `/variante-b`: **Elegancia Contemporánea**
- `/variante-c`: **Fusión Orgánica**

El resultado debe sentirse orgánico, cálido y profesional; evitar minimalismo extremo, exceso de texturas, sombras pesadas o recursos 3D. Las tres variantes deben permitir una comparación justa: misma jerarquía, información, orden de secciones e interacciones, cambiando únicamente el sistema visual y ciertos tratamientos compositivos propios del tema.

Se considerará terminado cuando:

1. Las tres rutas sean accesibles directamente y desde una portada/selector en `/`.
2. Cada ruta incluya presentación, contacto, repertorio y reserva.
3. La navegación por anclas, filtros de género, búsqueda y CTA de WhatsApp funcionen.
4. Los estados responsive, vacío, foco y hover sean legibles y coherentes.
5. La app no afirme reproducir audios inexistentes: los controles serán demostrativos y claramente no disponibles.
6. El sitio conserve buena legibilidad y contraste en escritorio y móvil.

## 2. Base técnica confirmada

- Aplicación React 19 + Vite 8 + TypeScript.
- Tailwind CSS v4 ya conectado desde `src/index.css`.
- No existe router ni librería de iconos; `src/App.tsx` está vacío.
- No se agregará una dependencia de routing para solo cuatro vistas estáticas.
- No se iniciará otro servidor: el entorno de Figma Make ya mantiene Vite activo.
- Las tres imágenes adjuntas se usarán como referencia de estructura y contenido, no como assets embebidos en la interfaz.

## 3. Arquitectura de rutas

Implementar un router mínimo basado en `window.location.pathname` dentro de `App.tsx`:

- `/`: portada compacta para comparar y entrar a las tres variantes.
- `/variante-a`: sitio completo con tema A.
- `/variante-b`: sitio completo con tema B.
- `/variante-c`: sitio completo con tema C.
- Cualquier ruta desconocida: estado 404 ligero con enlace a `/`.

Los enlaces entre rutas usarán URLs reales (`<a href>`), de modo que cada variante se pueda abrir, refrescar y compartir de manera independiente sin introducir complejidad de estado. La navegación dentro de cada variante usará anclas (`#inicio`, `#repertorio`, `#reserva`) con desplazamiento suave y compensación para el encabezado fijo.

## 4. Estructura de archivos y responsabilidades

### `src/App.tsx`

Mantener la implementación concentrada en el archivo principal, pero dividida en componentes locales claros:

- `App`: resolución de ruta.
- `VariantIndex`: portada/selector de variantes.
- `VariantPage`: composición compartida, parametrizada por `theme`.
- `Header`: marca, enlaces por ancla, selector compacto de variante y CTA.
- `Hero`: título, subtítulo, promesa de valor y acción principal.
- `ContactStrip`: teléfono móvil, teléfono fijo, dirección y ubicación.
- `RepertoireSection`: filtros, búsqueda, contador de resultados, grilla y estado vacío.
- `SongCard`: género, título y control de audio demostrativo no disponible.
- `BookingSection`: propuesta de reserva, tipos de evento y CTA.
- `FloatingWhatsApp`: acceso persistente sin cubrir contenido importante.
- `Footer`: datos breves, navegación y atribución básica.

Definir en el mismo archivo, fuera de los componentes:

- Tipos `VariantId`, `ThemeConfig`, `Song` y `ContactItem`.
- Configuración por variante (etiqueta, ruta, clases/tokens visuales).
- Datos locales de repertorio y contacto.
- URL de WhatsApp y generador del mensaje prellenado.

### `src/index.css`

Usar este archivo solo para lo que no conviene expresar como utilidades repetidas:

- Imports iniciales de Tailwind y, si se usa carga remota, las familias públicas de Google Fonts seleccionadas.
- Variables globales de tipografía y suavizado.
- `scroll-behavior`, `scroll-margin-top`, selección de texto y foco accesible.
- Clases temáticas para sombras neumórficas, textura de madera sutil y formas orgánicas.
- Animaciones cortas y discretas, desactivadas bajo `prefers-reduced-motion`.
- Ajustes globales de los controles demostrativos y del patrón decorativo.

No crear `tailwind.config`, PostCSS ni archivos de documentación adicionales.

## 5. Contenido compartido

### Encabezado y hero

- Marca: **Marimba Orquesta Chiapas**.
- Firma: **Del Mtro. Rogelio Gómez**.
- Mensaje: **Amenizamos todo tipo de eventos en Chiapas y sus alrededores**.
- Navegación: Inicio, Repertorio, Reserva.
- CTA principal: **Cotizar por WhatsApp**.

### Contacto

Usar los datos visibles en las referencias:

- Teléfono móvil: `968 106 5475`.
- Teléfono fijo: `968 688 3081`.
- Dirección: `2a. Ote. Sur #758 B, San Antonio`.
- Ubicación: `Ocozocoautla de Espinosa, Chiapas`.

Los teléfonos serán enlaces `tel:`. La dirección podrá enlazar a una búsqueda de Google Maps en nueva pestaña con `rel="noreferrer"`.

### Repertorio

Datos demo locales suficientes para mostrar filtros y grilla; incluir al menos dos títulos por género para que la interacción sea visible:

- Boleros: Así, Balance, Capricho, Camino Verde, Amor de la Calle, Nochecita.
- Vals / Rancheras.
- Cumbias / Mambos.
- Zapateados.
- Corridos.

Los títulos adicionales deberán ser nombres plausibles claramente tratados como contenido de muestra si no aparecen en las referencias. Los filtros serán: Todo, Boleros, Vals / Rancheras, Cumbias / Mambos, Zapateados y Corridos.

Cada tarjeta mostrará género, título y un control visual de audio con botón deshabilitado/`aria-disabled`, barra y texto **Muestra próximamente**. No usar `<audio>` vacío ni simular reproducción, para evitar una interacción engañosa.

### Reserva

- Eyebrow: **Atención directa e inmediata**.
- Título: **¿Tienes una fecha especial en puerta?**.
- Texto: invitación a consultar presupuesto, disponibilidad y asesoría personalizada.
- Chips: Bodas y aniversarios, XV años, Carnavales y fiestas, Serenatas, Eventos empresariales.

### WhatsApp

Usar el número visible con prefijo de México: `https://wa.me/529681065475`.

Añadir un mensaje prellenado y codificado, por ejemplo: `Hola, quisiera cotizar a Marimba Orquesta Chiapas para un evento.` El enlace abrirá en una pestaña nueva con nombre accesible completo. El CTA aparecerá en header/hero/reserva y como botón flotante; en móvil el flotante se compactará para no tapar la navegación ni el contenido.

## 6. Interacciones y estado

### Filtros y búsqueda

- Estado local `activeGenre`, iniciado en `Todo`.
- Estado local `query`, iniciado vacío.
- Filtrado combinado y sin distinción entre mayúsculas/minúsculas ni acentos, usando normalización Unicode para que búsquedas como `asi` encuentren `Así`.
- Actualización inmediata de la grilla y texto de cantidad de resultados.
- Estado vacío con mensaje claro y botón **Limpiar filtros**.
- El filtro activo se distinguirá por color, borde y `aria-pressed`, no solo por color.

### Navegación

- Header fijo o sticky con fondo que mantenga legibilidad al hacer scroll.
- Menú de escritorio visible.
- En móvil, evitar un menú complejo: navegación horizontal compacta o botón de menú con estado local, según el espacio real durante implementación. Si se usa menú desplegable, cerrarlo al elegir una sección y exponer `aria-expanded`/`aria-controls`.
- Selector A/B/C accesible en cada variante para cambiar de dirección sin volver obligatoriamente a la portada.

### Movimiento

- Transiciones de 150–250 ms para botones, chips y tarjetas.
- Entrada inicial muy sutil en hero y secciones, sin paralaje ni movimiento continuo.
- Eliminar animaciones y scroll suave cuando el sistema solicite movimiento reducido.

## 7. Dirección visual por variante

### Variante A — Neumorfismo Suave

- Fondo arena/beige claro, no el café saturado de las capturas originales.
- Superficies apenas elevadas con doble sombra difusa clara/oscura.
- Bordes amplios y redondeados; contraste suficiente entre tarjeta y fondo.
- Verde cálido como acento principal para CTA, con sombra corta y moderna.
- Tipografía serif editorial para títulos y sans humanista para lectura.
- Evitar hundidos profundos, brillos plásticos y exceso de componentes elevados.

### Variante B — Elegancia Contemporánea

- Fondo blanco hueso.
- Texto carbón, terracota como acento primario y verde olivo como acento secundario.
- Divisiones finas, amplios espacios y tarjetas mayormente planas.
- Chips con borde terracota; filtro activo con relleno terracota y texto claro.
- Títulos serif elegantes, cuerpo sans limpio.
- CTA WhatsApp en olivo oscuro o terracota según contraste, sin verde neón.

### Variante C — Fusión Orgánica

- Fondo café con leche.
- Dorado mate para detalles y estados activos; texto espresso.
- Formas asimétricas redondeadas en hero, repertorio y reserva, manteniendo alineación legible.
- Veta de madera construida con gradientes CSS/SVG embebido al 3% aproximado de opacidad, sin descargar una textura pesada.
- Sombras muy suaves y cálidas; no usar biseles ni efectos tridimensionales.
- CTA WhatsApp plano en verde profundo, acompañado por un detalle dorado discreto.

## 8. Tipografía, iconos y recursos

- Usar una pareja consistente en las tres variantes para que la comparación se centre en la dirección visual: una serif editorial pública (por ejemplo, Cormorant Garamond) y una sans legible pública (por ejemplo, Manrope).
- Si se importan desde Google Fonts, colocar el `@import` junto con los imports al inicio de `src/index.css` y mantener fallbacks (`Georgia`, `ui-sans-serif`, `system-ui`).
- No agregar una librería de iconos. Crear un pequeño componente `Icon` con SVG inline para teléfono, ubicación, búsqueda, reproducción deshabilitada, flecha y WhatsApp. Todos los SVG decorativos llevarán `aria-hidden="true"`; el texto/enlace aportará el nombre accesible.
- No introducir fotografías genéricas: las referencias y el alcance se apoyan en tipografía, color, formas y repertorio; esto evita desviar la identidad con imágenes ajenas. Los recursos adjuntos no se copiarán dentro de `src`.

## 9. Responsive y accesibilidad

Diseñar mobile-first y comprobar al menos tres rangos:

- Móvil: una columna, hero compacto, contacto y canciones apilados, chips con wrap, CTA flotante reducido.
- Tablet: dos columnas en repertorio/contacto cuando haya espacio.
- Escritorio: ancho máximo aproximado de 1200–1280 px, grilla de tres canciones y jerarquía amplia similar a las referencias.

Requisitos transversales:

- Un solo `h1` por página y jerarquía semántica correcta.
- `header`, `nav`, `main`, `section`, `footer` y formularios/controles con etiquetas.
- Contraste mínimo razonable para cuerpo, chips y botones; no colocar texto tenue sobre textura.
- Foco visible mediante `:focus-visible`.
- Área táctil cercana a 44 px en controles principales.
- Campo de búsqueda con `label` accesible, no depender solo del placeholder.
- Mensaje de resultados con `aria-live="polite"`.
- El CTA flotante no debe tapar el último contenido: reservar padding inferior adecuado.

## 10. Casos límite

- Búsqueda sin coincidencias: mostrar estado vacío y acción para restaurar.
- Consulta con espacios o acentos: recortar y normalizar antes de filtrar.
- Ruta desconocida: mostrar 404 con acceso a la portada.
- JavaScript disponible pero sin audio: controles permanecen claramente deshabilitados.
- Pantalla estrecha: chips y navegación se envuelven o desplazan de forma controlada sin overflow horizontal de página.
- Texto largo en dirección o título: tarjetas permiten múltiples líneas sin alturas rígidas.
- Fallo de carga de Google Fonts: fallbacks conservan jerarquía y legibilidad.

## 11. Orden de implementación

1. Definir datos, tipos, configuración de rutas y configuración temática.
2. Construir la portada de selección y el shell compartido de `VariantPage`.
3. Implementar estructura semántica completa con contenido común.
4. Añadir filtros, búsqueda normalizada, estado vacío, navegación por anclas y enlaces externos.
5. Aplicar tokens y tratamientos de A, B y C sin duplicar el árbol completo de componentes.
6. Añadir responsive, SVG inline, foco, reduced motion y detalles de interacción.
7. Revisar que las tres variantes mantengan paridad de contenido y que ninguna dependa de assets inexistentes.

## 12. Verificación

Por tratarse de una implementación amplia de interfaz, ejecutar al finalizar:

1. `pnpm run build` para validar TypeScript, JSX y generación de producción.
2. `pnpm run format` si el script modifica/verifica el formato según su comportamiento; revisar después que solo cambie archivos del alcance.
3. Volver a ejecutar `pnpm run build` si el formateador produjo cambios sustantivos.

Validación manual en el preview ya activo, sin iniciar otro servidor:

- Abrir `/`, `/variante-a`, `/variante-b` y `/variante-c`.
- Probar enlaces directos, refresh y 404.
- Recorrer Inicio/Repertorio/Reserva desde header.
- Probar cada filtro, búsqueda con y sin acentos, combinación de ambos y limpiar filtros.
- Confirmar destino, número y mensaje codificado de WhatsApp.
- Confirmar que teléfonos y ubicación tienen destinos correctos.
- Verificar que audio aparece como no disponible y no genera errores.
- Revisar desktop, tablet y móvil; foco por teclado, contraste, overflow y que el CTA flotante no tape contenido.
- Revisar `prefers-reduced-motion` y estado de fuentes fallback.

## 13. Fuera de alcance

- Backend, CMS, autenticación o persistencia.
- Reproducción de audio real, integración de YouTube o carga de archivos.
- Envío de formularios o agenda/disponibilidad real.
- Analítica, SEO avanzado o despliegue.
- Copiar literalmente el color café dominante o las sombras de las capturas; las referencias orientan contenido y composición, mientras las tres direcciones visuales definidas gobiernan el resultado final.
