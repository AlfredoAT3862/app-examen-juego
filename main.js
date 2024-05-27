const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Ajuste del tamaño del canvas al contenedor principal
function resizeCanvas() {
    const container = document.querySelector('main');
    const window_height = container.clientHeight;
    const window_width = container.clientWidth;

    canvas.width = window_width;
    canvas.height = window_height;
}

// Llama a la función para ajustar el tamaño del canvas inicialmente
resizeCanvas();

// Vuelve a ajustar el tamaño del canvas si la ventana cambia de tamaño
window.addEventListener('resize', resizeCanvas);

// Imagen de fondo
const backgroundImage = new Image();
backgroundImage.src = 'fondo.avif';

// Imagen del círculo
const circleImage = new Image();
circleImage.src = 'demonio.png';

// Clase Circle para representar los círculos
class Circle {
    constructor(x, y, radius, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.speed = speed;
        this.angle = this.randomAngle(); // Ángulo inicial aleatorio dentro del rango especificado
        this.isDestroyed = false; // Indica si el círculo ha sido destruido
    }

    randomAngle() {
        const ranges = [
            { min: 0, max: 70 },
            { min: 290, max: 360 }
        ];
        const range = ranges[Math.floor(Math.random() * ranges.length)];
        const angleInDegrees = Math.random() * (range.max - range.min) + range.min;
        return angleInDegrees * Math.PI / 180; // Convertir a radianes
    }

    draw(context) {
        if (!this.isDestroyed) {
            context.drawImage(circleImage, this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);
        }
    }

    update(context) {
        if (!this.isDestroyed) {
            this.draw(context);
            // Actualizar posición según la velocidad y el ángulo
            this.posX += this.speed * Math.cos(this.angle);
            this.posY += this.speed * Math.sin(this.angle);

            // Verificar colisiones con el borde superior e inferior
            if (this.posY - this.radius < 0 || this.posY + this.radius > canvas.height) {
                this.angle = -this.angle; // Cambiar el ángulo si toca el borde superior o inferior
            }
        }
    }
}

// Campo de texto para mostrar el score
const scoreText = document.createElement('div');
scoreText.style.position = 'absolute';
scoreText.style.top = '10px';
scoreText.style.left = '10px';
scoreText.style.fontFamily = 'Comic Sans MS';
scoreText.style.fontSize = '20px';
scoreText.style.color = 'white'; // Color blanco
document.body.appendChild(scoreText);

let score = 0;
let highScore = 0;
scoreText.innerText = `Score: ${score}  High Score: ${highScore}`;

// Posición de la línea roja (a la derecha de la pantalla)
const initialRedLineX = canvas.width - 50;
const distanceFromRightEdge = canvas.width - initialRedLineX;
const redLineX = canvas.width - (distanceFromRightEdge * 4);

// Mensaje de inicio
const startMessage = document.createElement('div');
startMessage.textContent = "¡Que no te atrapen!";
startMessage.style.position = 'absolute';
startMessage.style.top = '50%';
startMessage.style.left = '50%';
startMessage.style.transform = 'translate(-50%, -50%)';
startMessage.style.fontSize = '80px'; // Tamaño más grande
startMessage.style.color = 'red'; // Color rojo
startMessage.style.fontFamily = '"Creepster", sans-serif'; // Fuente de estilo de terror
document.body.appendChild(startMessage);

// Cargar la fuente Creepster desde Google Fonts
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Creepster&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

setTimeout(() => {
    // Eliminar el mensaje de inicio después de 2 segundos
    startMessage.remove();
}, 2000);

let level = 1; // Nivel inicial
let numCircles = 2; // Cantidad inicial de círculos
let circles = [];
let gameOverFlag = false; // Bandera para indicar si el juego terminó

createCircles();

// Función para crear los círculos
function createCircles() {
    circles = []; // Limpiar el arreglo de círculos antes de crear nuevos
    for (let i = 0; i < numCircles; i++) {
        let randomX = -Math.random() * 200; // Coordenada X aleatoria para iniciar desde la izquierda
        let randomY = Math.random() * canvas.height; // Coordenada Y aleatoria dentro del alto de la pantalla
        let randomRadius = 40; // Tamaño del círculo
        let speed = 1 + level * 0.2; // La velocidad aumenta muy gradualmente con el nivel
        circles.push(new Circle(randomX, randomY, randomRadius, speed));
    }
}

// Función para aumentar el nivel del juego
function increaseLevel() {
    level++;
        numCircles += 2; // Aumentar la cantidad de círculos cada 3 niveles
    
    createCircles();
}

canvas.addEventListener('click', (event) => {
    const canvasRect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - canvasRect.left;
    const mouseY = event.clientY - canvasRect.top;

    circles.forEach(circle => {
        if (!circle.isDestroyed) {
            const distance = Math.sqrt((mouseX - circle.posX) ** 2 + (mouseY - circle.posY) ** 2);
            if (distance <= circle.radius) {
                circle.isDestroyed = true; // Marcar el círculo como destruido
                score += 10; // Incrementar el score por cada círculo destruido
                scoreText.innerText = `Score: ${score}  High Score: ${highScore}`;

                if (circles.every(circle => circle.isDestroyed)) {
                    // Todos los círculos están destruidos, pasar al siguiente nivel
                    increaseLevel();
                }
            }
        }
    });
});


function gameLoop() {
ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

// Dibujar la imagen de fondo
ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

// Dibujar la línea roja vertical
ctx.strokeStyle = 'red';
ctx.lineWidth = 5;
ctx.beginPath();
ctx.moveTo(redLineX, 0);
ctx.lineTo(redLineX, canvas.height);
ctx.stroke();

circles.forEach(circle => {
    circle.update(ctx);

    // Verificar si algún círculo ha cruzado la línea roja
    if (circle.posX + circle.radius > redLineX) {
        gameOver();
    }
});

if (!gameOverFlag) {
    requestAnimationFrame(gameLoop);
}
}

// Función para manejar el fin del juego
function gameOver() {
gameOverFlag = true;

ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

ctx.fillStyle = 'black'; // Fondo negro
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = 'red'; // Texto rojo
ctx.font = '80px "Creepster", sans-serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);

// Actualizar el high score si es necesario
if (score > highScore) {
    highScore = score;
}

scoreText.innerText = `Score: ${score}  High Score: ${highScore}`;

setTimeout(() => {
    resetGame();
}, 3000); // Reiniciar el juego después de 3 segundos
}

function resetGame() {
score = 0;
level = 1;
numCircles = 2;
gameOverFlag = false;
scoreText.innerText = `Score: ${score}  High Score: ${highScore}`;
createCircles();
gameLoop();
}

gameLoop();
