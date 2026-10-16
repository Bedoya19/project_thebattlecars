/*
    Esta clase cumplira una labor bastante similar a gameNotesDisplay y gameInformationDisplay, aqui simplemente se cambia el documento 
    dependiendo de la informacion personal de cada jugador.
*/
import { Player1 } from "../players/player1.js";
import { Player2 } from "../players/player2.js";
import { PlayerActions } from "../players/playerActions.js";
import { DisplayCardInformation } from "./displayCardInformation.js";
import { StateGame } from "../game/stateGame.js";
import { LoadConfig } from "../game/loadConfig.js";

export class GameValuesDisplay {
    // Funcion bastante parecida a updateAllInformation, en donde cambia en su totalidad todo el elemento de los valores locales
    static updateAllValues(player) {
        // Cuando se agrege la funcionalidad de los ataques, esto tendra que cambias
        document.getElementById("game-values").innerHTML = `
            <h3 class="game-stat-text game-stat-subtitle-text">Valores:</h3>
            <h3 class="game-stat-text">Actual: <span id="value-local-player">${DisplayCardInformation.convertPlayerString(player)}</span></h3>
            <ul id="game-value-content">
                <p class="game-stat-text">Carga: <span id="value-local-charge">${this.drawDiceFromCharge(PlayerActions.getChargeFromPlayer(player))}</span></p>
                <p class="game-stat-text">Nitro: <span id="value-local-nitro">${PlayerActions.getNitroFromPlayer(player)}</span></p>
                <p class="game-stat-text">Poder: ${this.showPowerWithGamemode(player)}</p>
            </ul>
        `;
    }

    static showPowerWithGamemode(player) {
        const gamemode = LoadConfig.loadGamemode();

        if (gamemode === "normal") {
            return `<svg id="value-local-power" class="led ${PlayerActions.getPowerFromPlayer(player) > 0 ? "encendido" : ""}" viewBox="0 0 308 443" xmlns="http://www.w3.org/2000/svg" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.5;">
                        <g>
                            <path class="cuerpo" d="M21.716,373.146c0,0 -0.228,-164.128 -0.228,-237.04c0,-72.912 59.195,-132.107 132.107,-132.107c72.912,0 132.107,59.195 132.107,132.107c0,72.912 0.811,237.04 0.811,237.04c0,0 0,-21.177 0,-0.113c0,21.064 -59.427,38.165 -132.512,38.165c-73.085,0 -132.33,-17.101 -132.33,-38.165" style="stroke:#000;stroke-width:8px;"/>
                            <path class="base" d="M21.488,358.033l-17.488,10l0,33.209c0,0 28,34.527 150,36.791c122,-2.264 150,-36.791 150,-36.791l0,-33.209l-17.488,-10l-0,15.113c0,0 0,-21.177 0,-0.113c0,21.064 -59.427,38.165 -132.512,38.165c-73.085,0 -132.33,-17.101 -132.33,-38.165c0,-4.064 -0.182,-15 -0.182,-15" style="stroke:#000;stroke-width:8px;stroke-linecap:round;"/>
                        </g>
                        <defs>
                            <linearGradient id="led-on" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0,140,-140,0,154,268.033053)">
                            <stop offset="0" style="stop-color:#0066a3;stop-opacity:1"/>
                            <stop offset="1" style="stop-color:#003350;stop-opacity:1"/>
                            </linearGradient>
                            <linearGradient id="led-off" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0,140,-140,0,154,268.033053)">
                            <stop offset="0" style="stop-color:#565656;stop-opacity:1"/>
                            <stop offset="1" style="stop-color:#363636;stop-opacity:1"/>
                            </linearGradient>
                        </defs>
                    </svg>`;
        } else if (gamemode === "powers") {
            return `<span id="value-local-power">${PlayerActions.getPowerFromPlayer(player)}</span>`;
        }
    }

    // Actualiza el valor de poder en especifico
    static updatePowerValue() {
        const poderLocal = document.getElementById("value-local-power");
        const poder = PlayerActions.getPowerFromPlayer(StateGame.getCurrentPlayer());

        const gamemode = LoadConfig.loadGamemode();
        if (gamemode === "normal") {
            poderLocal.classList.toggle("encendido", poder > 0)
        } else {
            poderLocal.innerText = poder;
        }
    }

    // Dibujar un dado para el poder (por ahora solo va a ser pensado en tiros de 6)
    static drawDiceFromCharge(charge) {
        let dice = "";
        switch (charge) {
            case 1:
                dice = "&#9856";
                break;
            case 2:
                dice = "&#9857";
                break;
            case 3:
                dice = "&#9858";
                break;
            case 4:
                dice = "&#9859";
                break;
            case 5:
                dice = "&#9860";
                break;
            case 6:
                dice = "&#9861";
                break;
        }
        return `<span class="dice-charge">${dice}</span>`
    }
    

    // Actualiza el valor de la carga
    static updateChargeValue() {
        document.getElementById("value-local-charge").innerHTML = this.drawDiceFromCharge(PlayerActions.getChargeFromPlayer(
            StateGame.getCurrentPlayer()
        ));
    }

    // Actualiza el valor de nitro
    static updateNitroValue() {
        document.getElementById("value-local-nitro").innerText = PlayerActions.getNitroFromPlayer(
            StateGame.getCurrentPlayer()
        );
    }
}