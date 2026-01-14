/*
    Toda la informacion actual del juego. Principalmente, la informacion de los jugadores (cantidad de carros faltantes para cada jugador), y 
    el turno y ronda respectiva.
    La informacion de aqui es usada por clases como mainGame.js para administrar las rondas usnado la informacion respectiva.
*/

// Clase que maneja la informacion del juego
import { BoardClick } from "../board/boardActions.js";
import { DisplayCardsInDeck } from "../display/deckDisplay.js";

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
    static removeCarFromPlayer1() {
        --this.#carsPlayer1;
    }
    static removeCarFromPlayer2() {
        --this.#carsPlayer2;
    }
    // Como lo he hecho en todo este proyecto, se juntan dos metodos dependiendo del jugador
    static removeCarFromPlayer(player) {
        (player === "player1") ? (this.removeCarFromPlayer1()) : (this.removeCarFromPlayer2());
    }

    // El juego se termina
    static endGameRemoveListeners() {
        // Consigue todas las casillas de carros y armas
        // Vendran despues otras
        const carSquares = document.getElementsByClassName("card-board-car");
        const weaponSquares = document.getElementsByClassName("card-board-weapon");
        // Icono del mazo
        const deckIcon = document.getElementById("change-deck-icon-div");
        const divDeck = document.getElementsByClassName("deck-cards");
        // Estara intencionalmente vacio
        DisplayCardsInDeck.displayCardOnDeck(divDeck, []);

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