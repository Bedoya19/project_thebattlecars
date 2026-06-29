/* 
    Metodos del nitro de los carros
    Aqui funcionara todas las funciones necesarias para el nitro de los carros.
    Esto incluye la activacion del nitro, revisar los activados, todo eso.
*/
import { StandarizedDocCreation } from "../display/standardDoc/standarizedDocCreation.js";
import { PlayerActions } from "../players/playerActions.js";

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
            );
            button.innerText = "Activar Nitro";
            button.addEventListener("click", () => {
                this.activateNitro(player, carSquare)
            });
            !this.isNitroActivate(player, carSquare) ? button.disabled = true : button.disabled = false;
            return button;
        } else {
            return document.createElement("div");
        }
    }

    static activateNitro(player, carSquare) {
        console.log(carSquare);
        if (this.isNitroActivate(player, carSquare)) {
            console.log("Se va a activar el nitro...");
        } else {
            console.log("No se puede activar el nitro...");
        }
    }

    // Una simple funcion que sirve para revisar si el nitro puede ser activado
    static isNitroActivate(player, carSquare) {
        return PlayerActions.getNitroFromPlayer(player) >= carSquare.dataset.nitroQuantity;
    }
}