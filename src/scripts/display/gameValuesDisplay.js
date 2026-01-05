/*
    Esta clase cumplira una labor bastante similar a gameNotesDisplay y gameInformationDisplay, aqui simplemente se cambia el documento 
    dependiendo de la informacion personal de cada jugador.
*/
import { Player1 } from "../players/player1.js";
import { Player2 } from "../players/player2.js";
import { PlayerActions } from "../players/playerActions.js";

export class GameValuesDisplay {
    // Funcion bastante parecida a updateAllInformation, en donde cambia en su totalidad todo el elemento de los valores locales
    static updateAllValues(player) {
        // Cuando se agrege la funcionalidad de los ataques, esto tendra que cambias
        document.getElementById("game-values").innerHTML = `
            <h3 class="game-stat-text game-stat-subtitle-text">Valores:</h3>
            <h3 class="game-stat-text">Actual: <span id="value-locar-player">${player}</span></h3>
            <ul id="game-value-content">
                <p class="game-stat-text">Carga: <span id="value-local-charge">6</span>-6</p>
                <p class="game-stat-text">Nitro: <span id="value-local-nitro">${PlayerActions.getNitroFromPlayer(player)}</span></p>
                <p class="game-stat-text">Poder: <span id="value-local-power">${PlayerActions.getPowerFromPlayer(player)}</span></p>
            </ul>
        `;
    }
}