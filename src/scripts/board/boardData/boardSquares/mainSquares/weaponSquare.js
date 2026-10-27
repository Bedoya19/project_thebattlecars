/*
    Casillas de armas
    Almacena datos extra de energia, nivel, y otras cosas
*/

import { MainBoardSquare } from "./mainBoardSquare.js";

export class WeaponSquare extends MainBoardSquare {
    #maxEnergy;
    #level;

    constructor(card, player, zone) {
        super(card, player, zone);
        this.#maxEnergy = card.energy;
        this.#level = 0;
    }

    get maxEnergy() { return this.#maxEnergy };
    get level() { return this.#level };
    get energy() { return this.card.energy };
    get allAttacks() { return this.card.attacks };
    attacks(level) { return this.card.attacks[level] };
    attack(level, charge) { return this.attacks(level)[charge] };
    get materials() { return this.card.materials };
}
