/*
    Clase de las casillas de carros
    Almacena la carta de carro, junto con valores extra como vida y nitro
*/

import { BoardSquare } from "../boardSquare.js";
import { MainBoardSquare } from "./mainBoardSquare.js";

export class CarSquare extends MainBoardSquare {
    constructor(card, player, zone) {
        super(card, player, zone);
        this.maxHealth = card.health;
        this.nitro = 0;
    }

    get maxHealth() { return this.maxHealth };
    get nitro() { return this.nitro };
}
