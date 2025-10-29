
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

###  Inicialización del canvas

```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio || 1;
canvas.width = canvas.clientWidth * dpr;
canvas.height = canvas.clientHeight * dpr;
ctx.scale(dpr, dpr);
```
Se obtiene el contexto 2D del canvas para dibujar texto e imágenes.
Se ajusta la resolución real considerando devicePixelRatio para evitar pixelación.

```javascript
const lista_palabras = ["perro", "gato", "computadora", "sol"];
let palabras_canva = [];

function palabra_datos() {
    let palabra = lista_palabras[Math.floor(Math.random() * lista_palabras.length)];
    palabras_canva.push({
        texto: palabra,
        pos_x: Math.random() * (canvas.width / dpr - ctx.measureText(palabra).width),
        pos_y: -30,
        velocidad: 1 * velocidad_caida * 2
    });
}
```
Cada palabra se añade al array palabras_canva y cae desde arriba.
Se calcula la posición horizontal para que la palabra no se salga del canvas.

```javascript
function dibujar() {
    ctx.fillStyle = 'white';
    ctx.font = '1.6rem Arial';
    palabras_canva.forEach((p) => {
        ctx.fillText(p.texto, p.pos_x, p.pos_y);
        p.pos_y += p.velocidad;
    });
}
```
Cada frame se dibujan las palabras y se actualiza su posición vertical según su velocidad.

```javascript
document.addEventListener('keydown', (tecla) => {
    if (tecla.key === "Enter") {
        let palabra = document.getElementById("palabra").value.toLowerCase();
        // Verifica si la palabra coincide con alguna palabra en el canvas
    }
});
```
Al presionar Enter, se compara el texto ingresado con las palabras en pantalla.
Si coincide, se elimina la palabra, se suma puntuación y se actualiza la puntuación máxima.
Cada 100 puntos aumenta la velocidad y se activa un efecto visual de "flash".

```javascript
let fondoX = 0;
let velocidad_fondo = 0.3;

function dibujar_fondo() {
    ctx.drawImage(img, fondoX, 0, canvas.width, canvas.height);
    ctx.drawImage(img, fondoX - canvas.width, 0, canvas.width, canvas.height);
    fondoX += velocidad_fondo;
    if (fondoX >= canvas.width) fondoX = 0;
}
```
Se dibujan dos imágenes del fondo para crear un efecto de movimiento continuo horizontal.
La variable fondoX controla la posición del fondo y se reinicia cuando completa el desplazamiento.

### Sistema de juego
- empezar(): inicia intervalos de animación y creación de palabras.
- pausar(): detiene intervalos.
- resetgame(): reinicia puntuación, vidas y velocidad.
- gameterminado(): muestra el final del juego cuando se acaban las vidas.

```javascript
function flashBody(color = 'red', duracion = 600) {
    const body = document.body;
    const prevColor = body.style.backgroundColor;
    body.style.backgroundColor = color;
    setTimeout(() => {
        body.style.backgroundColor = prevColor;
    }, duracion);
}
```
Cambia temporalmente el color de fondo de la pantalla para indicar subida de nivel.
### Recursos

Música de fondo: SoundHelix
Imagen de fondo: imagenes/Level.png .

#### Requisitos

Navegador moderno compatible con Canvas y Audio.
HTML con un <canvas> y elementos para mostrar score, lives, nivel y entrada de palabras.

#### Cómo jugar

- Presiona Start para iniciar el juego.
- Escribe las palabras que caen en el campo de texto.
- Presiona Enter para capturarlas.
- Evita que las palabras lleguen al fondo, o perderás vidas.
- Cada 100 puntos sube de nivel y aumenta la velocidad.

