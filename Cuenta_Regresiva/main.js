// Esta función inicia el contador regresivo.
function startCountdown(unit) {
  // Variable para almacenar el tiempo restante en segundos.
  var time;
  // Verifica la unidad seleccionada por el usuario.
  if (unit === 'seconds') {
      // Si la unidad es segundos, toma el valor directamente desde el campo de entrada.
      time = parseInt(document.getElementById('timeInput').value);
  } else if (unit === 'minutes') {
      // Si la unidad es minutos, convierte los minutos ingresados a segundos.
      time = parseInt(document.getElementById('timeInput').value) * 60;
  }
  // Obtiene el elemento donde se mostrará el contador regresivo.
  var countdownElement = document.getElementById('countdown');

  // Crea un intervalo que se ejecuta cada segundo.
  var countdownInterval = setInterval(function() {
      // Verifica si el tiempo ha llegado a cero.
      if (time <= 0) {
          // Si el tiempo ha terminado, detiene el intervalo y muestra un mensaje.
          clearInterval(countdownInterval);
          countdownElement.textContent = '¡Feliz Año Nuevo 🎇!';
      } else {
          // Calcula los minutos y segundos restantes.
          var minutes = Math.floor(time / 60);
          var seconds = time % 60;

          // Formatea la salida del contador regresivo en minutos y segundos.
          countdownElement.textContent = minutes + ' minutos ' + seconds + ' segundos';

          // Decrementa el tiempo restante.
          time--;
      }
  }, 1000); // El intervalo se ejecuta cada 1000 milisegundos, es decir, cada segundo.
}

// Agrega un evento de clic al botón de inicio.
document.getElementById('startButton').addEventListener('click', function() {
  // Obtiene la unidad de tiempo seleccionada del elemento 'unitSelect'.
  var unit = document.getElementById('unitSelect').value;
  // Inicia el contador regresivo con la unidad seleccionada.
  startCountdown(unit);
});
