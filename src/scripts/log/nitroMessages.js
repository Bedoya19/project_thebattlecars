// Clase sencilla que basicamente hace el mismo trabajo que attackMessages, pero esta vez para todo lo que tiene que ver con nitro

import { DisplayCardInformation } from "../display/displayCardInformation.js";

export class NitroMessages {
    static nitroActivated(player, carSquare) {
        return `${DisplayCardInformation.convertPlayerString(player)} activó el nitro de "${carSquare.dataset.name}"! Ahora tiene +${carSquare.dataset.nitroAttack} de ataque y reduce ${carSquare.dataset.nitroResistance} de daño que reciba en cualquier ataque. Mucho ojo!`;
    }
}