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
    static #turn = 0;

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
}