# ALLISON.EXE — A story waiting to begin 💗

Pequeña aventura RPG romántica hecha con HTML, CSS y JavaScript vanilla. No usa React, servidor, base de datos ni API. El progreso se guarda localmente en `localStorage`.

## Ejecutar

1. Descomprime `ALLISON-EXE.zip`.
2. Abre `index.html` en un navegador moderno. Si el navegador bloquea módulos JavaScript al abrir archivos directamente, ejecuta un servidor local:
   - Python: `python -m http.server 8000`
   - Abre `http://localhost:8000`
3. Pulsa **Comenzar aventura**. El audio se activa solo si lo habilitas desde el botón de sonido.

## Controles

- Explorar: `WASD` o flechas del teclado.
- Interactuar: `E`, clic en el objeto o botón táctil.
- Minijuego: flechas / WASD; en móvil toca dentro de la arena.
- Los diálogos se escriben letra por letra. Pulsa «Mostrar» para terminar la animación y vuelve a pulsar para avanzar.

## Personalización rápida

- Cambia los textos y diálogos en `js/sceneManager.js` y `js/exploration.js`.
- Cambia la pregunta final y sus respuestas en `js/ending.js`.
- Sustituye los avatares provisionales en `index.html` / `css/style.css` por imágenes PNG transparentes cuando tengas las ilustraciones definitivas.
- La música no incluye canciones comerciales; los efectos se sintetizan con Web Audio API y solo suenan al activar el audio.
- El nombre mostrado al final está configurado como **XOFERZ**. Puedes cambiarlo en `js/ending.js`.

## Guardado

Se guarda el progreso en el navegador actual. Para reiniciarlo usa «Reiniciar» en la barra superior y confirma. El guardado no se sincroniza entre dispositivos.

## Alcance de esta versión

Incluye menú, diálogos, jardín explorable con cuatro flores, habitación interactiva, mirador, minijuego de esquivar obstáculos, archivo con tres objetos, inventario básico, guardado local y escena final con una respuesta respetuosa si Allison no quiere responder «sí». Las ilustraciones son recursos CSS provisionales; no se han inventado retratos físicos de Allison.
