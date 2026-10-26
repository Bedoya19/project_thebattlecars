// Clase sencilla que basicamente hace el mismo trabajo que attackMessages, pero esta vez para todo lo que tiene que ver con nitro

import { DisplayCardInformation } from "../display/displayCardInformation.js";

export class NitroMessages {
    static nitroActivated(player, carSquare, carSquareInst) {
        return `${DisplayCardInformation.convertPlayerString(player)} activó el nitro de "${carSquareInst.name}"! Ahora tiene +${carSquareInst.nitroAttack} de ataque y reduce ${carSquareInst.nitroResistance} de daño que reciba en cualquier ataque. Mucho ojo!`;
    }
}
