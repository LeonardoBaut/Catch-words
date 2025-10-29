const canvas =document.getElementById("canvas");
const ctx= canvas.getContext("2d");

const lista_palabras=["perro","gato","computadora","sol"];
let palabras_canva=[];
let velocidad_caida= canvas.width/500;
let score = 0;
let lives = 3;
let maxscore = localStorage.getItem('maxscore') || 0;
document.getElementById("maxscore").innerText=maxscore

// Música de fondo
const musica = new Audio('sonido/SoundHelix-Song-1.mp3');
musica.loop = true;
musica.volume = 0.2;
musica.play().catch(()=>{}); // evita error de autoplay

// Efecto de captura
//const efecto = new Audio('https://freesound.org/data/previews/320/320654_5260870-lq.mp3');

// Tamaño real en pixeles considerando devicePixelRatio
const dpr = window.devicePixelRatio || 1;
canvas.width = canvas.clientWidth * dpr;
canvas.height = canvas.clientHeight * dpr;
// Escala el contexto para que todo se dibuje a la resolución correcta
ctx.scale(dpr, dpr);

function palabra_datos(){
    let palabra=lista_palabras[Math.floor(Math.random()*lista_palabras.length)]
    palabras_canva.push({
        texto: palabra,
        pos_x: Math.random() * (canvas.width/dpr - ctx.measureText(palabra).width),
        pos_y: -30,
        velocidad: 1 * velocidad_caida*2
    });
}

function dibujar(){
    //ctx.clearRect(0,0,canvas.width,canvas.height); //limpia la pantalla
    ctx.fillStyle = 'white';
    ctx.font = '1.6rem Arial';

    palabras_canva.forEach((p)=>{
        ctx.fillText(p.texto,p.pos_x,p.pos_y);
        p.pos_y+=p.velocidad;
    });
}
function actualizar_palabras_canvas(){
    palabras_canva.forEach((p,posicion)=>{
        if (p.pos_y > canvas.height){
            palabras_canva.splice(posicion,1);
            lives--;
            document.getElementById("lives").innerText=lives;
            if (lives <= 0) gameterminado();
        }
    });
}

document.addEventListener('keydown',(tecla)=>{
    if (tecla.key ==="Enter"){
        let palabra=document.getElementById("palabra").value;
        document.getElementById("palabra").value='';
        palabra=palabra.toLowerCase();  // Convierte la palabra origen a minusculas
        for(let i=0;i<palabras_canva.length;i++){
            if (palabras_canva[i].texto === palabra){
                palabras_canva.splice(i,1);
                score+=10;
                document.getElementById("score").innerText=score;
                console.log(maxscore);
                console.log(score);
                if (score >= maxscore){
                    maxscore=score;
                    // console.log(maxscore);
                    // console.log(score);
                    document.getElementById("maxscore").innerText=maxscore;
                    localStorage.setItem("maxscore",maxscore);
                }
                let incremento =100;
                if ((score % 100)===0 ){
                    let nivel=score/incremento;
                    document.getElementById("nivel").innerText=nivel
                    velocidad_caida+= 0.4;
                    velocidad_fondo+=0.4;
                    flashBody("white")
                }
                break;
            }
        }
    }
});

function gameterminado(){
    document.getElementById("gameterminado").style.display="block";
    document.getElementById("puntajefinal").innerText=score;
    clearInterval(redibujo);
    clearInterval(crearpalabra);
}

function resetgame(){
    palabras_canva=[];
    score=0;
    lives=3;
    velocidad_caida= canvas.width/500
    velocidad_fondo=0.3
    document.getElementById("score").innerText=score;
    document.getElementById("lives").innerText=lives;
    document.getElementById("gameterminado").style.display="none";
    crearpalabra=setInterval(palabra_datos,2000);
    redibujo=setInterval(animar,30);
}

function animar(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujar_fondo();
    dibujar();
    actualizar_palabras_canvas();
}
let crearpalabra;
let redibujo;
function empezar(){
    document.getElementById("star_bt").style.backgroundColor="green"
    crearpalabra=setInterval(palabra_datos,2000);
    redibujo=setInterval(animar,30);
    document.getElementById("pause_bt").style.backgroundColor="white"
    dibujar_fondo()
}
function pausar(){
    clearInterval(redibujo);
    clearInterval(crearpalabra);
    document.getElementById("pause_bt").style.backgroundColor="red"
    document.getElementById("star_bt").style.backgroundColor="white"

}

const img = new Image(); // Crea el objeto imagen
img.src = "imagenes/Level.png"; //  Ruta local o URL
// Espera a que cargue antes de dibujar
img.onload = function() {
    // Dibuja la imagen en el canvas (x, y)
    dibujar_fondo();
};

let fondoX = 0;
let velocidad_fondo = 0.3; // puedes ajustar la velocidad


function dibujar_fondo() {
    // Dibuja dos imágenes: la principal y la copia a la izquierda
    ctx.drawImage(img, fondoX, 0, canvas.width, canvas.height);
    ctx.drawImage(img, fondoX - canvas.width, 0, canvas.width, canvas.height);

    // Mueve el fondo a la derecha
    fondoX += velocidad_fondo;

    // Si la imagen principal se ha movido totalmente, reinicia
    if (fondoX >= canvas.width) {
        fondoX = 0;
    }
}

function flashBody(color = 'red', duracion = 600) {
    const body = document.body;
    const prevColor = body.style.backgroundColor;

    body.style.backgroundColor = color;

    setTimeout(() => {
        body.style.backgroundColor = prevColor;
    }, duracion);
}

// Ejemplo:
flashBody('yellow', 500); // flash amarillo por medio segundo

//Reorganizamos animar()
function animar(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujar_fondo();              // Fondo animado
    dibujar();                    // Palabras encima
    actualizar_palabras_canvas(); // Lógica del juego
}

