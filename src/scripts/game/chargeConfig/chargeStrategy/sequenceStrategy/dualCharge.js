/*
    Strategy sobre la configuracion de "informed_individual"
*/

import { PlayerActions } from "../../../../players/playerActions";
import { ChargerProvider } from "../../chargerProvider";

export class DualCharge extends ChargerProvider {
    constructor() {
        super();
    }

    peekCharge(player) {
        // Simplemente
    }
}