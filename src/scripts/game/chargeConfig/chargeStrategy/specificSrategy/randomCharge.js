/*
    Clase del config que se encarga sobre el modo 'random' del metodo de la carga
*/

import { PlayerActions } from "../../../../players/playerActions.js";
import { ChargerProvider } from "../../chargerProvider.js";
import { SpecificCharge } from "./specificCharge.js";

export class RandomCharge extends SpecificCharge {
    constructor() {
        super();
    }

    peekCharge(player) {
        // No se puede ver la carga cuando esta en "random"
        return null
    }
}
