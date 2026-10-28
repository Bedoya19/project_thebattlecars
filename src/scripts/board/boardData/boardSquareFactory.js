/*
    Codigo que se encarga de fabricar las casillas del tablero.
    Esto en general solo es usado por BoardClick, y por ahora por lo menos, solo deberia de encargarse de
    fabricar las casillas en si.
*/

import { board } from "./boardManager.js";
import { CarSquare } from "./boardSquares/mainSquares/carSquare.js";
import { WeaponSquare } from "./boardSquares/mainSquares/weaponSquare.js";

export class BoardSquareFactory {
    // Crea la casilla de carro
    // Por probablemente BoardClick, se tiene que conseguir de aqui la zona y el jugador
    // OJO, el zone tiene que ser por numero DE 0 - 2, tener cuidado con pasar un 3 y que JS
    // me sorprenda con lo que sacara
    static createCarSquare(carCard, player, zone) {
        const carSquare = new CarSquare(carCard, player, (zone + 1));
        board[player]["zone"][zone].carSquare = carSquare;
        console.log(board);
        return carSquare;
    }

    // Crea la casilla de arma
    // !OJO! Zona de 0 - 2
    // !OJO! weaponNumber de 0 - 7
    // No poder cumplir estos requerimientos, JS va a hacer cosas raras
    static createWeaponSquare(weaponCard, player, zone, weaponNumber) {
        const weaponSquare = new WeaponSquare(weaponCard, player, (zone + 1));
        board[player]["zone"][zone].weaponSquares[weaponNumber] = weaponSquare;
        console.log(board);
        return weaponSquare;
    }
}
