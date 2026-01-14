/*
    Metodos del ataque de carro
    Se va a desarrollar la version funcional con la version que yo diseñe el juego desde un principio: 
    La carga es avisada desde un principio
*/
import { PlayerActions } from "../players/playerActions.js";
import { StandarizedDocCreation } from "../display/standardDoc/standarizedDocCreaction.js";
import { AttackValues } from "./attackValues.js";
import { BoardClick } from "../board/boardActions.js";
import { GameValuesDisplay } from "../display/gameValuesDisplay.js";
import { GameInformationDisplay } from "../display/gameInformationDisplay.js";
import { StateGame } from "../game/stateGame.js";
import { DisplayCardInformation } from "../display/displayCardInformation.js";


export class Attack {
    // Agrgega el boton de ataque a la informacion si es del jugador indicado
    static createAttackButton(player, zoneNumber, squareNumber, weaponSquare) {
        const currentPlayer = document.getElementById("deck").dataset.player;
        if (currentPlayer === player) {
            //return `<button id="attack-${zoneNumber}-${squareNumber}">Atacar</button>`
            const button = StandarizedDocCreation.customElementCreator(
                {
                    "element": "button",
                    "id": `attack-${zoneNumber}-${squareNumber}`
                }
            );
            button.innerText = "Atacar";
            button.addEventListener("click", () => { this.prepareForAttack(weaponSquare, player, zoneNumber, squareNumber) })
            return button;
        } else {
            // Devuelve un simple div vacio
            return document.createElement("div");
        }
    }

    static attack(carSquare) {
        // Banderas si:
        // - El carro fue destruido
        // - El arma ya no tiene energia
        let carDestroyed = false;
        let weaponDischarged = false;

        // Jugador actual
        const currentPlayer = document.getElementById("deck").dataset.player;

        // Valores actuales de carga y ataque
        const attackValue = AttackValues.getAttack();
        const chargeValue = PlayerActions.getChargeFromPlayer(currentPlayer);

        // Le baja la vida al carro que se le dio el ataque
        carSquare.dataset.health -= attackValue;
        // Revisa si el carro quedo destruid
        if (carSquare.dataset.health <= 0) {
            // Se va a quitar el carro del tablero en otro lugar. Esto es para tener la informacion de
            // la data del carro sin incurrir a hacer mas variables
            console.log("El carro quedo destruido!");
            carDestroyed = true;
        }

        // Le baja energia a la arma que se uso para el ataque
        PlayerActions.consumePowerForActionInPlayer(currentPlayer);
        const weaponSquare = document.getElementById(`${currentPlayer}-zone${AttackValues.getZone()}-card-weapon-${AttackValues.getSquareNumber()}`);
        --weaponSquare.dataset.energy;
        // Quita la carta del tablero si ya llego a cero de energia
        if (weaponSquare.dataset.energy <= 0) {
            console.log("El arma quedo descargada");
            weaponDischarged = true;
            BoardClick.removeWeaponOnBoard(weaponSquare);
        }

        // Actualiza la Carga
        PlayerActions.generateChargeForPlayer(currentPlayer);
        GameValuesDisplay.updateChargeValue();
        // Actualiza el Poder (el valor cambiado en pantalla)
        GameValuesDisplay.updatePowerValue();
        // Remueve todos los selectores
        BoardClick.removeAllSelectors();
        // Muestra la accion que se acaba de hacer en pantalla
        DisplayCardInformation.attackInformation(
            document.getElementById("card-selected-information"),
            carSquare,
            chargeValue,
            attackValue,
            carDestroyed,
            weaponDischarged
        );

        if (carDestroyed) {
            // Ya quita de verdad el carro destruido en el tablero despues de usar la informacion para el metodo anterior
            BoardClick.removeCarOnBoard(carSquare);
            // Elimina el carro del jugador afectado, y actualiza el valor en la ventana de informacion
            const affectedPlayer = carSquare.id.slice(0, 7);
            StateGame.removeCarFromPlayer(affectedPlayer);
            GameInformationDisplay.updateCurrentCarsPlayer(affectedPlayer);
        }
    }

    // Prepara todo para atacar
    static prepareForAttack(weaponSquare, player, zoneNumber, squareNumber) {
        if (PlayerActions.getPowerFromPlayer(player) <= 0) {
            // Avisar al usuario despues
            console.log("Sin poder requerido");
        } else if (weaponSquare.dataset.energy <= 0) {
            // Tambien avisar al usuario despues
            console.log("La arma no tiene la energia suficiente");
        } else {
            const charge = PlayerActions.getChargeFromPlayer(player);
            const attack = JSON.parse(weaponSquare.dataset.attacks)[0][charge - 1];
            AttackValues.setAttackValues(charge, attack, zoneNumber, squareNumber);
        }
    }
}