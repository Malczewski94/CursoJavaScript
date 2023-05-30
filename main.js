document.addEventListener("DOMContentLoaded", () => {
// OBTENCION DE ID Y DATOS
    const board = document.getElementById("board");
    const message = document.getElementById("message");
    let user = JSON.parse(localStorage.getItem("user"));
    let treasure = JSON.parse(sessionStorage.getItem("treasure"));

    // VERIFICACION DE DATOS DEL USUARIO
    if (!user) {
        const name = prompt("Ingresa tu nombre de usuario:");
        user = { name, x: 0, y: 0 };
        localStorage.setItem("user", JSON.stringify(user));
    }

    // GENERADOR DE TESORO
    if (!treasure) {
        const x = Math.floor(Math.random() * 8);
        const y = Math.floor(Math.random() * 8);
        treasure = { x, y };
        sessionStorage.setItem("treasure", JSON.stringify(treasure));
    }
    
    // CREACION DEL TABLERO, CADA CELDA TIENE SU CLASE "CELL" Y UN ATRIBUDO DE DATOS "INDEX"
    // PARA IDENTIFICAR LA POSICION
    function createBoard() {
        for (let i = 0; i < 64; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        board.appendChild(cell);
        }
    }

// CREACION DEL PERSONAJE
    function createCharacter() {
        const startingCell = document.querySelector(`[data-index="${user.y * 8 + user.x}"]`);
        const character = document.createElement("div");
        character.classList.add("character");
        startingCell.appendChild(character);
    }

    // CREACION DEL TESORO
    function createTreasure() {
        const startingCell = document.querySelector(`[data-index="${treasure.y * 8 + treasure.x}"]`);
        const treasureElement = document.createElement("div");
        startingCell.appendChild(treasureElement);
    }
    // CALCULA LA DISTANCIA
    function distanceToTreasure() {
        const dx = Math.abs(user.x - treasure.x);
        const dy = Math.abs(user.y - treasure.y);
      return Math.sqrt(dx * dx + dy * dy);
    }
    // DA INDICACIONES SEGUN EL CALCULO DE DISTANCIA
    function updateMessage(text) {
        message.textContent = text;
    }

    function temperatureMessage(distance) {
        if (distance < 2) {
            return "¡Muy caliente!";
        } else if (distance < 4) {
            return "Caliente";
        } else if (distance < 6) {
            return "Tibio";
        } else {
            return "Frío";
        }
    }

// CREACION DE FUNCION PARA EL MOVIMIENTO
// TOMA LA TECLAS PRECIONADA COMO EVENTO Y CREA UN ARGUMENTO PARA DETERMINAR EL MOVIMIENTO.
    function moveCharacter(e) {
        const character = document.querySelector(".character");
        const currentCell = character.parentElement;
        const currentIndex = parseInt(currentCell.dataset.index);
        let newIndex;
        // ASIGNACION DE TECLAS
        switch (e.key) {
            case "ArrowUp":
                newIndex = currentIndex - 8;
                break;
            case "ArrowDown":
                newIndex = currentIndex + 8;
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

// VERIFICA SI EL INDICE DE CELDA ES VADIDO Y SI HAY UN TESORO EN ELLA, 
// SI HAY UN TESORO ACTUALIZA EL MENSAJE Y GENERA EL TESORO EN OTRA POSICION
        if (newIndex >= 0 && newIndex < 64) {
            const newCell = document.querySelector(`[data-index="${newIndex}"]`);
        if (newIndex === treasure.y * 8 + treasure.x) {
            updateMessage("¡Encontraste el tesoro!");
            sessionStorage.removeItem("treasure");
            const x = Math.floor(Math.random() * 8);
            const y = Math.floor(Math.random() * 8);
            treasure = { x, y };
            sessionStorage.setItem("treasure", JSON.stringify(treasure));
            createTreasure();
            return;
        }
        newCell.appendChild(character);
        user.x = newIndex % 8;
        user.y = Math.floor(newIndex / 8);
        localStorage.setItem("user", JSON.stringify(user));
        const distance = distanceToTreasure();
        const temperature = temperatureMessage(distance);
        updateMessage(temperature);
        }
    }

    createBoard();
    createCharacter();
    createTreasure();
    document.addEventListener("keydown", moveCharacter);
    });