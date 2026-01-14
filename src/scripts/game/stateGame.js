/*
    Toda la informacion actual del juego. Principalmente, la informacion de los jugadores (cantidad de carros faltantes para cada jugador), y 
    el turno y ronda respectiva.
    La informacion de aqui es usada por clases como mainGame.js para administrar las rondas usnado la informacion respectiva.
*/

// Clase que maneja la informacion del juego
import { BoardClick } from "../board/boardActions.js";
import { DisplayCardsInDeck } from "../display/deckDisplay.js";
import { StandarizedDocCreation } from "../display/standardDoc/standarizedDocCreaction.js";

export class StateGame {
    // - Variables del estado del juego -
    // Carros que siguen teniendo cada jugador
    static #carsPlayer1 = 5;
    static #carsPlayer2 = 5;
    // Rondas y turnos actuales en el juego
    static #round = 1;
    static #turn = 1;

    // Getters de la informacion
    static getCarsPlayers1() {
        return this.#carsPlayer1;
    }
    static getCarsPlayers2() {
        return this.#carsPlayer2;
    }
    static getRound() {
        return this.#round;
    }
    static getTurn() {
        return this.#turn;
    }
    static geCarsFromPlayer(player) {
        return (player === "player1") ? (this.getCarsPlayers1()) : (this.getCarsPlayers2()); 
    }

    // - Metodos -
    // Reiniciar datos del juego (por si acaso)
    static resetGame() {
        this.#carsPlayer1 = 5;
        this.#carsPlayer2 = 5;
        this.#round = 1;
        this.#turn = 1;
    }

    // Avanzar a la siguiente ronda, tambien avanza al sigueinte turno si es el momento (ronda impar)
    // 1: Siguiente ronda
    // 2: Siguiente ronda y siguiente turno
    // (Esto va a ser manejado por (probablemente) mainGame.js)
    static nextRound() {
        // Siempre avanza a la siguiente ronda
        ++this.#round;
        // Si la ronda es impar, avanza al siguiente turno, sino es asi, no hace nada peculiar (por ahora)
        // Devuelve datos que seran usados en otros scripts.
        if (this.#round % 2 !== 0) {
            ++this.#turn;
            return [2, "siguiente ronda, siguiente turno"];
        } else {
            return [1, "siguiente ronda"];
        }
    }

    // Quitar un carro de algun jugador
    // El if statementCon esto es que me referia a funciones adicionales que podrian existir en un futuro
    // Si cuando se quita un carro se detecta que ya no tiene carros el jugador contrincante, termina el
    // juego y anuncia como ganador el otro jugador
    static removeCarFromPlayer1() {
        --this.#carsPlayer1;
        if (this.#carsPlayer1 <= 0) {
            this.endGame("Jugador 2");
        }
    }
    static removeCarFromPlayer2() {
        --this.#carsPlayer2;
        
        if (this.#carsPlayer2 <= 0) {
            this.endGame("Jugador 1");
        }
    }
    // Como lo he hecho en todo este proyecto, se juntan dos metodos dependiendo del jugador
    static removeCarFromPlayer(player) {
        (player === "player1") ? (this.removeCarFromPlayer1()) : (this.removeCarFromPlayer2());
    }

    // Termina el juego
    static endGame(playerWinner) {
        this.endGameRemoveListeners();
        const statePlayers = document.getElementById("state-players");
        const announceWinner = StandarizedDocCreation.customElementCreator(
            {
                "element": "h4",
                "class": "game-stat-text",
                "class": "game-stat-subtitle-text"
            }
        );
        announceWinner.innerText = `El ${playerWinner} es el ganador!`;
        statePlayers.appendChild(announceWinner);
        // Me da pereza por ahora hacer una funcion que reinicie la pagina
        // Tal vez despues
        const resetGame = StandarizedDocCreation.customElementCreator(
            {
                "element": "p",
                "class": "game-stat-text"
            }
        );
        resetGame.innerText = "Reinicia la pagina para jugar de nuevo";
        statePlayers.appendChild(resetGame);
    }

    // Quita los event listeners (actuales) del tablero
    static endGameRemoveListeners() {
        // Consigue todas las casillas de carros y armas
        // Vendran despues otras
        const carSquares = document.getElementsByClassName("card-board-car");
        const weaponSquares = document.getElementsByClassName("card-board-weapon");
        // Icono del mazo
        const deckIcon = document.getElementById("change-deck-icon-div");
        const divDeck = document.getElementsByClassName("deck-cards");
        // Estara intencionalmente vacio
        DisplayCardsInDeck.showDeckOfCards(divDeck, []);

        // Le quita los event listener a todo lo posible
        for (const carSquare of carSquares) {
            carSquare.removeEventListener("click", () => { BoardClick.clickOnCarSquare(carSquare) });
        }
        for (const weaponSquare of weaponSquares) {
            weaponSquare.removeEventListener("click", () => { BoardClick.clickOnWeaponSquare(weaponSquare)});
        }
        deckIcon.removeEventListener("click", () => DisplayCardsInDeck.changeDeckPlayer);
    }
}