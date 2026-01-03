/*
    Toda la informacion actual del juego. Principalmente, la informacion de los jugadores (cantidad de carros faltantes para cada jugador), y 
    el turno y ronda respectiva.
    La informacion de aqui es usada por clases como mainGame.js para administrar las rondas usnado la informacion respectiva.
*/

// Clase que maneja la informacion del juego
export class StateGame {
    // - Variables del estado del juego -
    // Carros que siguen teniendo cada jugador
    static #carsPlayer1 = 5;
    static #carsPlayer2 = 5;
    // Rondas y turnos actuales en el juego
    static #round = 1;
    static #turn = 1;

    // Getters de la infromacion
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
    // Avanzar a la siguiente ronda, tambien avanza al sigueinte turno si es el momento (ronda impar)
    static nextRound() {
        ++this.#round;
        if (this.#round % 2 !== 0) {
            ++this.#turn;
            return [1, "siguiente ronda, siguiente turno"];
        } else {
            return [2, "siguiente ronda"];
        }
    }
}