/* 
    Metodos del nitro de los carros
    Aqui funcionara todas las funciones necesarias para el nitro de los carros.
    Esto incluye la activacion del nitro, revisar los activados, todo eso.
*/
import { StandarizedDocCreation } from "../display/standardDoc/standarizedDocCreation.js";

export class Nitro {
    // Agrega el boton de activar nitro
    // Ahora que lo pienso... Es bastante similar al otro de ataque... Hmmmm...
    static createNitroButton(player, zoneNumber, squareNumber, carSquare) {
        // Toca estandarizar esto del jugador
        const currentPlayer = document.getElementById("deck").dataset.player;
        if (currentPlayer === player) {
            const button = StandarizedDocCreation.customElementCreator(
                {
                    "element": "button",
                    "id": `nitro-${zoneNumber}-${squareNumber}`,
                    "class": "nitro-button"
                }
            )
        }
    }
}