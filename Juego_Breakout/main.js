// Seleccionar el canvas y obtener el contexto 2D
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Radio de la pelota
const ballRadius = 10;

// Posición inicial de la pelota y velocidad
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

// Tamaño y posición inicial de la paleta del jugador
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

// Variables para controlar si las teclas de dirección están presionadas
let rightPressed = false;
let leftPressed = false;

// Configuración de los ladrillos
const brickRowCount = 5;
const brickColumnCount = 3;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

// Puntaje y vidas iniciales
let score = 0;
let lives = 3;

// Matriz que almacena los ladrillos y su estado
let bricks = [];

// Inicialización de la matriz de ladrillos
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 }; // Inicialmente activo
  }
}

// Configuración de la apariencia de las notificaciones
toastr.options = {
  'closeButton': true,
  'debug': false,
  'newestOnTop': false,
  'progressBar': false,
  'preventDuplicates': false,
  'showDuration': '1000',
  'hideDuration': '1000',
  'timeOut': '5000',
  'extendedTimeOut': '1000',
  'showEasing': 'swing',
  'hideEasing': 'linear',
  'showMethod': 'fadeIn',
  'hideMethod': 'fadeOut',
};

// Event listeners para controlar las teclas presionadas
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Función para manejar el evento de tecla presionada
function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

// Función para manejar el evento de tecla liberada
function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

// Función para detectar colisiones entre la pelota y los ladrillos
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0; // El ladrillo está golpeado y ya no es visible
          score++; // Incrementar puntaje
          // Comprobar si se han golpeado todos los ladrillos
          if (score == brickRowCount * brickColumnCount) {
            toastr.success('¡Felicidades, ganaste!');
            // Reiniciar el juego después de un breve retraso
            setTimeout(function () {
              window.location.reload();
            }, 500);
          }
        }
      }
    }
  }
}

// Función para dibujar la pelota en el lienzo
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Función para dibujar la paleta del jugador
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
}

// Función para dibujar los ladrillos en el lienzo
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        const brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#eee300";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

// Funciones para dibujar puntaje y vidas en el lienzo
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#FF0000";
  ctx.fillText("Puntaje: " + score, 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#FF0000";
  ctx.fillText("Vidas: " + lives, canvas.width - 65, 20);
}

// Función principal para dibujar el juego
function draw() {
  // Limpiar el lienzo
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar los elementos del juego
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  // Revisar los límites de la pelota y ajustar la dirección
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    // Verificar colisión con la paleta
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      // Perder una vida
      lives--;
      if (!lives) {
        // Si no quedan vidas, mostrar mensaje de juego terminado
        toastr.error('¡Juego terminado!');
        // Reiniciar el juego después de un breve retraso
        setTimeout(function () {
          window.location.reload();
        }, 500);
      } else {
        // Reiniciar la posición de la pelota y la paleta
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  // Mover la paleta si las teclas están presionadas
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  // Actualizar la posición de la pelota
  x += dx;
  y += dy;

  // Solicitar al navegador que llame a la función de dibujo en el siguiente fotograma de animación
  requestAnimationFrame(draw);
}

// Event listener para el botón de iniciar juego
document.getElementById("startGame").addEventListener("click", function () {
  toastr.success('¡Juego iniciado!');
  draw(); // Iniciar el juego
  this.disabled = true; // Desactivar el botón después de iniciar el juego
});
