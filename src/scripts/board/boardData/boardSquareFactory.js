/*
    Codigo que se encarga de fabricar las casillas del tablero.
    Esto en general solo es usado por BoardClick, y por ahora por lo menos, solo deberia de encargarse de
    fabricar las casillas en si.
*/

import { board } from "./boardManager.js";
import { CarSquare } from "./boardSquares/mainSquares/carSquare.js";

export class BoardSquareFactory {
    // Crea la casilla de carro
    // Por probablemente BoardClick, se tiene que conseguir de aqui la zona y el jugador
    // OJO, el zone tiene que ser por numero DE 0 - 2, tener cuidado con pasar un 3 y que JS
    // me sorprenda con lo que sacara
    static crearCarSquare(carCard, player, zone) {
        const carSquare = new CarSquare(carCard, player, (zone + 1));
        board[player]["zone"][zone].carSquare = carSquare;
        console.log(board);
    }
}
