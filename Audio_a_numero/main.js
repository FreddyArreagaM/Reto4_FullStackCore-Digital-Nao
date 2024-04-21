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


let recognition;

const iniciarReconocimiento = () => {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
  recognition.lang = "es-US";

  recognition.onresult = (resultado) => {
    manejarResultado(resultado);
  };
  
  recognition.start();
};

const manejarResultado = (resultado) => {
  const texto = resultado.results[0][0].transcript;
  toastr.success('Cantidad detectada');
  document.getElementById("output").value += texto + " ";
};

document.getElementById("startButton").addEventListener("click", () => {
  toastr.success('Inicio de reconocimiento');
  iniciarReconocimiento();
});