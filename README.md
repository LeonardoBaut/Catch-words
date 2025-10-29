
# Catch Words - Juego de palabras para el navegador

Catch Words es un juego interactivo desarrollado en JavaScript utilizando un `<canvas>` HTML5. El objetivo es escribir las palabras que caen del cielo antes de que lleguen al fondo de la pantalla. El juego incluye animación de fondo, música, niveles y sistema de puntuación.

---

## 🎮 Funcionalidades principales

- Palabras que caen desde la parte superior de la pantalla.
- Sistema de puntuación (`score`) y vidas (`lives`).
- Incremento de dificultad cada 100 puntos (aumenta velocidad de palabras y fondo).
- Fondo animado que se desplaza horizontalmente de manera continua.
- Música de fondo en loop.
- Efecto visual de "flash" en la pantalla al subir de nivel.
- Guardado de la puntuación máxima usando `localStorage`.
- Posibilidad de pausar y reiniciar el juego.

---

## ⚙️ Cómo funciona el código

### 1. Inicialización del canvas

```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio || 1;
canvas.width = canvas.clientWidth * dpr;
canvas.height = canvas.clientHeight * dpr;
ctx.scale(dpr, dpr);

Se obtiene el contexto 2D del canvas para dibujar texto e imágenes.

Se ajusta la resolución real considerando devicePixelRatio para evitar pixelación.