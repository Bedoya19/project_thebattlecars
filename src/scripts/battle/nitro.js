/* 
    Metodos del nitro de los carros
    Aqui funcionara todas las funciones necesarias para el nitro de los carros.
    Esto incluye la activacion del nitro, revisar los activados, todo eso.
*/
import { StandarizedDocCreation } from "../display/standardDoc/standarizedDocCreation.js";
import { PlayerActions } from "../players/playerActions.js";
import { GameValuesDisplay } from "../display/gameValuesDisplay.js";

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
            /*
                Aqui se hace una anotacion importante para el futuro.
                Ahora mismo, sin ese otro condicional del nitro, se puede reactivar el nitro, y reincia la duracion del nitro
                Es una mecanica interesante, especialmente cuando se implemente los poderes. Pero no es intencional, entonces se desactiva el boton si
                el carro sigue teniendo el nitro activado.
                Puede ser un modo extra interesante, pero no es la prioridad en este preciso momento.
            */
            if (!this.isNitroActivate(player, carSquare) || carSquare.dataset.nitro !== "0") {
                button.disabled = true;
            }
            return button;
        } else {
            return document.createElement("div");
        }
    }

    static activateNitro(player, carSquare) {
        console.log(carSquare);
        if (this.isNitroActivate(player, carSquare) && PlayerActions.getPowerFromPlayer(player) >= 1) {
            console.log("Se va a activar el nitro...");
            // Cambia el valor de nitro dentro del DOM, y gasta poder
            carSquare.dataset.nitro = parseInt(carSquare.dataset.nitroDuration) + 1;
            PlayerActions.consumePowerForActionInPlayer(player);
            console.log("El nitro sera activado por " + carSquare.dataset.nitroDuration + " turnos");
            PlayerActions.removeNitroFromCar(player, carSquare);
            // Actualiza los valores
            GameValuesDisplay.updateNitroValue();
            GameValuesDisplay.updatePowerValue();
            carSquare.classList.add("car-nitro-activated");
            //console.log(carSquare.dataset.nitro);
        } else {
            console.log("No se puede activar el nitro...");
        }
    }

    // Una simple funcion que sirve para revisar si el nitro puede ser activado
    static isNitroActivate(player, carSquare) {
        return PlayerActions.getNitroFromPlayer(player) >= carSquare.dataset.nitroQuantity;
    }
}