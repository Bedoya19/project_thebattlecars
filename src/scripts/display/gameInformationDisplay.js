/*
Script que actualiza toda la informacion de los datos de la informacion del juego
Hare que cada dato en especifico pueda ser cambiado en el momento, esto yo creo que ayudaria bastante al ahorro de rendimiento
ya si es una funcion que cambie todo al mismo tiempo, pues no creo que sea lo mas optimo.
*/

import { StateGame } from "../game/stateGame.js";

export class GameInformationDisplay {
    // Actualiza/crea TODA la informacion de primerazo
    static updateAllInformation() {
        const statePlayers = document.getElementById("state-players");
        statePlayers.innerHTML = `
            <h3 id="general-game-state-text" class="game-stat-text game-stat-subtitle-text">Estado del juego:</h3>
            <div id="general-game-stat-content">
                <p class="game-stat-text">Carros del jugador 1: <span id="value-cars-current-player1">${StateGame.getCarsPlayers1()}</span>/<span id="value-cars-max-player1">5</span></p>
                <p class="game-stat-text">Carros del jugador 2: <span id="value-cars-current-player2">${StateGame.getCarsPlayers2()}</span>/<span id="value-cars-max-player2">5</span></p>
                <p class="game-stat-text">Ronda <span id="value-current-round">${StateGame.getRound()}</span></p>
                <p class="game-stat-text">Turno <span id="value-current-turn">${StateGame.getTurn()}</span></p>
            </div>
        `
    }
    // Todas las funciones desde ahora en adelante debe de ser usado DESPUES de que se garantize de que los elementos con las estadisticas existan

    // Actualiza el valor de los carros actuales, dependiendo del jugador que sea
    // Se pone el respectivo jugador (player1 o player2), y lo cambia dependiendo del nuevo valor que esta en .getCarsPlayers1()
    static updateCurrentCarsPlayer(player) {
        const currentCarsValue = document.getElementById(`value-cars-current-${player}`);
        (player === "player1") ? (currentCarsValue.innerText = StateGame.getCarsPlayers1()) : (currentCarsValue.innerText = StateGame.getCarsPlayers2());
    }

    // Actualiza el valor de la ronda con el valor de .getRound()
    static updateCurrentRound() {
        document.getElementById("value-current-round").innerText = StateGame.getRound();
    }
    // Actualiza el valor del turno con el valor de .getTurn()
    static updateCurrentTurn() {
        document.getElementById("value-current-turn").innerText= StateGame.getTurn();
    }
}