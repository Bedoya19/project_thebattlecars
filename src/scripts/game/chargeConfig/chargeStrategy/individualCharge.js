/*
    Clase de la config por defecto: La carga individual informada
    El refractor siguiente no deberia de cambiar la funcionalidad actual de la pagina
*/

import { Player } from "../../../players/NewPlayer.js";
import { PlayerActions } from "../../../players/playerActions.js";
import { StateGame } from "../../stateGame.js";
import { ChargerProvider } from "../chargerProvider.js";

export class IndividualCharge extends ChargerProvider {
    constructor() { 
        super(); 
    }

    peekCharge(player) {
        // Simplemente devuelve la carga para ser vista de forma normal
        return PlayerActions.getChargeFromPlayer(player);
    }

    consumeCharge(player) {
        // Guarda la carga actual
        const charge = PlayerActions.getChargeFromPlayer(player);
        // Comienza a generar una nueva carga
        PlayerActions.generateChargeForPlayer(player);
        // Devuelve la carga para ser usada
        return charge;
    }

    onRoundStart(player) {
        // Genera una carga aleatoria para el jugador que viene
        PlayerActions.generateChargeForPlayer(player);
    }
}