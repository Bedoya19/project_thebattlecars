/*
    Clase de la config por defecto: La carga individual informada
    El refractor siguiente no deberia de cambiar la funcionalidad actual de la pagina
*/

import { Player } from "../../../../players/NewPlayer.js";
import { PlayerActions } from "../../../../players/playerActions.js";
import { StateGame } from "../../../stateGame.js";
import { ChargerProvider } from "../../chargerProvider.js";
import { SpecificCharge } from "./specificCharge.js";

export class IndividualCharge extends SpecificCharge {
    constructor() {
        super();
    }

    peekCharge(player) {
        // Simplemente devuelve la carga para ser vista de forma normal
        return PlayerActions.getChargeFromPlayer(player);
    }
}
