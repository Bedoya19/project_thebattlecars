/*
    Casillas de armas
    Almacena datos extra de energia, nivel, y otras cosas
*/

import { MainBoardSquare } from "./mainBoardSquare.js";

export class WeaponSquare extends MainBoardSquare {
    constructor(card, player, zone) {
        super(card, player, zone);
        this.maxEnergy = card.energy;
        this.level = 0;
    }

    // Los metodos vendran despues...
}