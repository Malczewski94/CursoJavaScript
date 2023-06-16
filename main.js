document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const message = document.getElementById("message");
  const difficultySelect = document.getElementById("difficulty");
  const startButton = document.getElementById("start-button");
  const boardSize = 5;
  let user = {
    x: 0,
    y: 0,
    score: 0,
  };
  let treasures = [];
  let timeLeft = 0;
  let timerId = null;
  let timerInterval;
  let messageTimerId;

  function fetchJSON(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.responseType = "json";
      xhr.onload = function () {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(new Error(`Request failed with status ${xhr.status}`));
        }
      };
      xhr.onerror = function () {
        reject(new Error("Request failed"));
      };
      xhr.send();
    });
  }

  function createBoard() {
    const size = getBoardSize();
    board.style.gridTemplateColumns = `repeat(${size}, 44.9px)`;
    board.style.gridTemplateRows = `repeat(${size}, 44.9px)`;
    for (let i = 0; i < size * size; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = i;
      board.appendChild(cell);
    }
  }

  function createCharacter() {
    const startingCell = document.querySelector(`[data-index="${user.y * boardSize + user.x}"]`);
    const character = document.createElement("div");
    character.classList.add("character");
    startingCell.appendChild(character);
  }

  function createTreasure() {
    const x = Math.floor(Math.random() * getBoardSize());
    const y = Math.floor(Math.random() * getBoardSize());
    const treasure = { x, y };
    treasures.push(treasure);
    const startingCell = document.querySelector(`[data-index="${treasure.y * getBoardSize() + treasure.x}"]`);
    const treasureElement = document.createElement("div");
    treasureElement.classList.add("treasure");
    startingCell.appendChild(treasureElement);
  }

  function getBoardSize() {
    const difficulty = difficultySelect.value;
    return difficulty === "medium" ? 12 : difficulty === "hard" ? 14 : 8;
  }

  function distanceToTreasure() {
    const closestTreasure = treasures.reduce((closest, treasure) => {
      const dx = Math.abs(user.x - treasure.x);
      const dy = Math.abs(user.y - treasure.y);
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < closest.distance ? { treasure, distance } : closest;
    }, { treasure: null, distance: Infinity });

    return closestTreasure.distance;
  }

  function updateMessage(text) {
    message.textContent = text;
  }

  function temperatureMessage(distance) {
    return distance < 2 ? "¡Muy caliente!" :
      distance < 4 ? "Caliente" :
      distance < 6 ? "Tibio" :
      "Frío";
  }

  function updateScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `Puntuación: ${user.score}`;
  }

  function moveCharacter(e) {
    const character = document.querySelector(".character");
    const currentCell = character.parentElement;
    const currentIndex = parseInt(currentCell.dataset.index);
    const boardSize = getBoardSize();
    let newIndex;

    switch (e.key) {
      case "ArrowUp":
        newIndex = currentIndex - boardSize;
        break;
      case "ArrowDown":
        newIndex = currentIndex + boardSize;
        break;
      case "ArrowLeft":
        newIndex = currentIndex - 1;
        break;
      case "ArrowRight":
        newIndex = currentIndex + 1;
        break;
      default:
        return;
    }

    if (newIndex >= 0 && newIndex < boardSize * boardSize) {
      const newCell = document.querySelector(`[data-index="${newIndex}"]`);
      if (newCell) {
        currentCell.removeChild(character);
        newCell.appendChild(character);
        user.x = newIndex % boardSize;
        user.y = Math.floor(newIndex / boardSize);
        const distance = distanceToTreasure();
        updateMessage(temperatureMessage(distance));
        if (distance === 0) {
          handleTreasureFound();
        }
      }
    }
  }

  function handleTreasureFound() {
    const character = document.querySelector(".character");
    const currentCell = character.parentElement;
    const treasureElement = currentCell.querySelector(".treasure");

    if (treasureElement) {
      currentCell.removeChild(treasureElement);
      user.score++;
      updateScore();
      treasures = [];
      createTreasure();
      timeLeft += 5;
      document.getElementById("time").textContent = `Tiempo: ${timeLeft}`;
      showMessage("¡Encontraste un tesoro! Ganaste 5 segundos adicionales.");
    }
  }

  function showMessage(text) {
    clearTimeout(messageTimerId);
    message.textContent = text;
    message.style.display = "block";
    messageTimerId = setTimeout(() => {
      message.style.display = "none";
    }, duration);
  }

  function startGame() {
    user.score = 0;
    updateScore();
    createBoard();
    createCharacter();
    createTreasure();
    updateMessage(temperatureMessage(distanceToTreasure()));
    timeLeft = 30;
    document.getElementById("time").textContent = `Tiempo: ${timeLeft}`;
    timerId = setInterval(() => {
      timeLeft--;
      document.getElementById("time").textContent = `Tiempo: ${timeLeft}`;
      if (timeLeft === 0) {
        stopGame();
        showAlert();
      }
    }, 1000);
  }

  function stopGame() {
    clearInterval(timerId);
    document.removeEventListener("keydown", moveCharacter);
  }

  function showAlert() {
    const score = user.score;
    Swal.fire({
      title: "¡Juego terminado!",
      text: `Puntuación: ${score}`,
      icon: "success",
    });
  }

  startButton.addEventListener("click", () => {
    startGame();
    document.addEventListener("keydown", moveCharacter);
  });
});
