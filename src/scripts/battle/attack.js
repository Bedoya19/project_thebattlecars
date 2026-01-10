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
        // Le baja la vida al carro que se le dio el ataque
        carSquare.dataset.health -= AttackValues.getAttack();
        // Le baja energia a la arma que se uso para el ataque
        const currentPlayer = document.getElementById("deck").dataset.player;
        PlayerActions.consumePowerForActionInPlayer(currentPlayer);
        --document.getElementById(`${currentPlayer}-zone${AttackValues.getZone()}-card-weapon-${AttackValues.getSquareNumber()}`).dataset.energy;
        // Actualiza la Carga
        PlayerActions.generateChargeForPlayer(currentPlayer);
        GameValuesDisplay.updateChargeValue();
        // Actualiza el Poder (el valor cambiado en pantalla)
        GameValuesDisplay.updatePowerValue();
        // Remueve todos los selectores
        BoardClick.removeAllSelectors();
        DisplayCardInformation.attackInformation(
            document.getElementById("card-selected-information"),
            
        );
    }

    // Prepara todo para atacar
    static prepareForAttack(weaponSquare, player, zoneNumber, squareNumber) {
        if (PlayerActions.getPowerFromPlayer(player) <= 0) {
            // Avisar al usuario despues
            console.log("Sin poder requerido");
        } else {
            const charge = PlayerActions.getChargeFromPlayer(player);
            const attack = JSON.parse(weaponSquare.dataset.attacks)[0][charge - 1];
            AttackValues.setAttackValues(charge, attack, zoneNumber, squareNumber);
        }
    }
}