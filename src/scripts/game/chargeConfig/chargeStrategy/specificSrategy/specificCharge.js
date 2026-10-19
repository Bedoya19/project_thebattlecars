/*
    Este es el Strategy sobre los modos de la carga en donde la carga es de "una sola vez", es decir, que no
    esta relacionado de ningun lado y no se tiene forma de predeccir cuales seran las cargas
    Sera usado para IndividualCharge y RandomCharge
*/
import { ChargerProvider } from "../../chargerProvider.js";
import { PlayerActions } from "../../../../players/playerActions.js";

export class SpecificCharge extends ChargerProvider {
    constructor() {
        super();
    }

    peekCharge(player) {
        // Simplemente devuelve la carga para ser vista de forma normal
        // Esta funcion cambiara en IndividualCharge y RandomCharge
        console.log("Leer carga...");
    }

    consumeCharge(player) {
        // Guarda la carga actual
        const charge = PlayerActions.getChargeFromPlayer(player);
        // Comienza a generar una nueva carga
        PlayerActions.generateChargeForPlayer(player);
        // Devuelve la carga para ser usada
        return charge;
    }

    getCurrentCharge(player) {
        // Sabes que ? Uso peekCharge, en este no hay secretos
        return this.peekCharge(player);
    }

    onRoundStart(player) {
        // Genera una carga aleatoria para el jugador que viene
        PlayerActions.generateChargeForPlayer(player);
    }
}
