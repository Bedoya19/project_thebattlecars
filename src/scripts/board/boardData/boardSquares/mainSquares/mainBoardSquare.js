/*
    Clase general de las casillas "principales", tambien podria llamarlas "casillas normales", pero seria un nombre un poco deshonesto.
    El tema es que aqui se incluye los datos que tienen en comun las casillas de carros y armas
*/

import { BoardSquare } from "../boardSquare.js";

export class MainBoardSquare extends BoardSquare {
    #zone;

    constructor(card, player, zone) {
        super(card, player);
        this.#zone = zone;   // o this._zone
    }

    get zone() { return this.#zone; }
}
