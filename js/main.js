const botonPiedra = document.getElementById('piedra');
const botonPapel = document.getElementById('papel');
const botonTijeras = document.getElementById('tijeras');
const resultadoDiv = document.getElementById('resultado');
let jugador = 0;
let computadora = 0;

function juego() {
  marcador();
}

botonPiedra.addEventListener('click', () => {
  playRound('piedra');
});

botonPapel.addEventListener('click', () => {
  playRound('papel');
});

botonTijeras.addEventListener('click', () => {
  playRound('tijeras');
});

function playRound(seleccionJugador) {
  const opciones = ['piedra', 'papel', 'tijeras'];
  const seleccionComputadora = opciones[Math.floor(Math.random() * opciones.length)];

  if (seleccionJugador === seleccionComputadora) {
    resultadoDiv.textContent = 'Empate';
  } else if (
    (seleccionJugador === 'piedra' && seleccionComputadora === 'tijeras') ||
    (seleccionJugador === 'papel' && seleccionComputadora === 'piedra') ||
    (seleccionJugador === 'tijeras' && seleccionComputadora === 'papel')
  ) {
    jugador++;
    marcador();
    resultadoDiv.textContent = 'Ganaste';
  } else {
    computadora++;
    marcador();
    resultadoDiv.textContent = 'Perdiste';
  }
}

function marcador() {
  document.getElementById('jugador').textContent = jugador;
  document.getElementById('computadora').textContent = computadora;
}
