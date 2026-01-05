/*
    Esta clase cumplira una labor bastante similar a gameNotesDisplay y gameInformationDisplay, aqui simplemente se cambia el documento 
    dependiendo de la informacion personal de cada jugador.
*/
import { Player1 } from "../players/player1";
import { Player2 } from "../players/player2";

export class gameValuesDisplay {
    // Funcion bastante parecida a updateAllInformation, en donde cambia en su totalidad todo el elemento de los valores locales
    static updateAllValues(player) {
        document.getElementById("game-values").innerHTML = `
            <h3 class="game-stat-text game-stat-subtitle-text">Valores:</h3>
            <h3 class="game-stat-text">Actual: <span id="value-locar-player">Jugador 1</span></h3>
            <ul id="game-value-content">
                <p class="game-stat-text">Carga: <span id="value-local-charge">6</span>-6</p>
                <p class="game-stat-text">Nitro: <span id="value-local-nitro">5</span></p>
                <p class="game-stat-text">Poder: <span id="value-local-power">5</span></p>
            </ul>
        `;
    }
}