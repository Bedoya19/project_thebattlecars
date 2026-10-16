/*
    Clase del config que se encarga sobre el modo 'random' del metodo de la carga
*/

import { PlayerActions } from "../../../players/playerActions.js";
import { ChargerProvider } from "../chargerProvider";

export class RandomCharge extends ChargerProvider {
    constructor() {
        super();
    }

    peekCharge(player) {
        // No se puede ver la carga cuando esta en "random"
        return null
    }

    consumeCharge(player) {
        // Con este cambio, se puede aqui mismo generar el dado de la carga despues de que este funcionando correctamente
        const charge = Math.floor(Math.random() * 6) + 1;
        return Math.floor(Math.random() * 6) + 1;
    }
}