/*
    Metodos del nitro de los carros
    Aqui funcionara todas las funciones necesarias para el nitro de los carros.
    Esto incluye la activacion del nitro, revisar los activados, todo eso.
*/
import { StandarizedDocCreation } from "../display/standardDoc/standarizedDocCreation.js";
import { PlayerActions } from "../players/playerActions.js";
import { GameValuesDisplay } from "../display/gameValuesDisplay.js";
import { GameNotesDisplay } from "../display/gameNotesDisplay.js";
import { StateGame } from "../game/stateGame.js";
import { getCarSquaresFromBoard } from "../board/boardData/boardManager.js";

export class Nitro {
    // Agrega el boton de activar nitro
    // Ahora que lo pienso... Es bastante similar al otro de ataque... Hmmmm...
    static createNitroButton(player, zoneNumber, squareNumber, carSquare, carSquareInst) {
        // Toca estandarizar esto del jugador
        const currentPlayer = StateGame.getCurrentPlayer();
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
                this.activateNitro(player, carSquare, carSquareInst)
            });
            /*
                Aqui se hace una anotacion importante para el futuro.
                Ahora mismo, sin ese otro condicional del nitro, se puede reactivar el nitro, y reincia la duracion del nitro
                Es una mecanica interesante, especialmente cuando se implemente los poderes. Pero no es intencional, entonces se desactiva el boton si
                el carro sigue teniendo el nitro activado.
                Puede ser un modo extra interesante, pero no es la prioridad en este preciso momento.
            */
            if (!carSquareInst.isNitroActive()) {
                button.disabled = true;
            }
            return button;
        } else {
            return document.createElement("div");
        }
    }

    static activateNitro(player, carSquare, carSquareInst) {
        console.log(carSquare);

        // Revisa que tenga el suficiente poder, si es asi, gasta
        if (!PlayerActions.spendPower(player)) return;

        if (this.isNitroBeActivate(player, carSquare, carSquareInst)) {
            console.log("Se va a activar el nitro...");
            // Cambia el valor de nitro dentro del DOM, y gasta poder
            carSquareInst.activateNitro();
            console.log("El nitro sera activado por " + carSquareInst.nitroDuration + " turnos");
            // Le quita el nitro al jugador que acaba de activar el nitro
            PlayerActions.removeNitroFromCar(player, carSquareInst);
            // Actualiza los valores en pantalla
            GameValuesDisplay.updateNitroValue();
            // Agrega lo que acaba de pasar en las notas
            GameNotesDisplay.addNitroNote(player, carSquare, carSquareInst);
            // Agrega la clase de estilo de nitro
            carSquare.classList.add("car-nitro-activated");
        } else {
            console.log("No se puede activar el nitro...");
        }
    }

    // Una simple funcion que sirve para revisar si el nitro puede ser activado
    static isNitroBeActivate(player, carSquare, carSquareInst) {
        return PlayerActions.getNitroFromPlayer(player) >= carSquareInst.nitroQuantity;
    }

    // Reduce el nitro para todos los carros activados de un jugador
    static reduceNitroFromCarsFromPlayer(player) {
        const carSquaresNitro = this.getCarSquaresWithNitroFromPlayer(player);
        console.log(carSquaresNitro);

        carSquaresNitro.forEach(carSquare => {
            carSquare.reduceNitro();

            if (!carSquare.isNitroActive()) {
                const carSquareDom = document.getElementById(`${player}-zone${carSquare.zone}-card-car-${carSquare.zone}`)
                carSquareDom.classList.remove("car-nitro-activated");
            }
        });
    }

    // Consigue todas las casillas con nitro activado.
    // Se va a hacer con la clase car-nitro-activated
    static getAllCarSquaresWithNitro() {
        return document.querySelectorAll(".car-nitro-activated");
    }
    // Consigue las casillas de un jugador en especifico
    static getCarSquaresWithNitroFromPlayer(player) {
        //return document.querySelectorAll(`.card-board-${player}.car-nitro-activated`);
        const carSquares = getCarSquaresFromBoard(player);
        const carSquaresWithNitro = carSquares.filter((carSquare) => { return carSquare.isNitroActive() });
        return carSquaresWithNitro;
    }
}
