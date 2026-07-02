/*
    Metodos del ataque de carro
    Se va a desarrollar la version funcional con la version que yo diseñe el juego desde un principio: 
    La carga es avisada desde un principio
*/
import { PlayerActions } from "../players/playerActions.js";
import { StandarizedDocCreation } from "../display/standardDoc/standarizedDocCreation.js";
import { AttackValues } from "./attackValues.js";
import { BoardClick } from "../board/boardActions.js";
import { GameValuesDisplay } from "../display/gameValuesDisplay.js";
import { GameInformationDisplay } from "../display/gameInformationDisplay.js";
import { StateGame } from "../game/stateGame.js";
import { DisplayCardInformation } from "../display/displayCardInformation.js";
import { DisplayMessageBoxes } from "../display/displayMessageBoxes.js";
import { GameNotesDisplay } from "../display/gameNotesDisplay.js";

export class Attack {
    // Agrgega el boton de ataque a la informacion si es del jugador indicado
    static createAttackButton(player, zoneNumber, squareNumber, weaponSquare) {
        const currentPlayer = document.getElementById("deck").dataset.player;
        if (currentPlayer === player) {
            //return `<button id="attack-${zoneNumber}-${squareNumber}">Atacar</button>`
            const button = StandarizedDocCreation.customElementCreator(
                {
                    "element": "button",
                    "id": `attack-${zoneNumber}-${squareNumber}`,
                    "class": "attack-button"
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

    static async attack(carSquare) {
        // Banderas si:
        // - El carro fue destruido
        // - El arma ya no tiene energia
        let carDestroyed = false;
        let weaponDischarged = false;

        // Jugador actual
        const currentPlayer = document.getElementById("deck").dataset.player;
    
        // Carro atacante (movido para usarse antes)
        const weaponSquare = document.getElementById(`${currentPlayer}-zone${AttackValues.getZone()}-card-weapon-${AttackValues.getSquareNumber()}`);
        const attackingCarSquare = BoardClick.getCarSquareFromWeaponSquare(weaponSquare);

        // Jugador afectado (movido para usarse en otras funciones)
        const affectedPlayer = carSquare.id.slice(0, 7);

        // Valores actuales de carga y ataque
        const attackValue = AttackValues.getAttack();
        const attackIncrease = AttackValues.getAttackIncrease()
        // Valor de aumento de ataque del nitro (no se si se puede hacer de forma mas elegante)
        const attackNitroIncrease = parseInt(attackingCarSquare.dataset.nitro) !== 0 ? parseInt(attackingCarSquare.dataset.nitroAttack) : 0;
        console.log(`Nitro activado en ataque: ${parseInt(attackingCarSquare.dataset.nitro) !== 0}
        Aumento de ataque: ${attackNitroIncrease}`); // Prueba rapida
        // El valor que se resta por la resistencia de un posible nitro del carro que se le esta atacando
        const resistanceFromAttack = parseInt(carSquare.dataset.nitro) !== 0 ? parseInt(carSquare.dataset.nitroResistance) : 0;
        console.log(`Nitro activado en defensa: ${parseInt(carSquare.dataset.nitro) !== 0}
        Resistencia: ${resistanceFromAttack}`); // Prueba rapida

        // Si por el aumento de ataque queda en negativo el ataque, simplemente lo cambia a 0.
        // Se pone una variable si vienen otros factores extra para evitar confundirme con ya compararlo en el ataque real
        const attackPreliminaryValue = (attackValue + attackIncrease + attackNitroIncrease) - resistanceFromAttack;
        const attack = (attackPreliminaryValue >= 0) ? attackPreliminaryValue : 0;
        console.log(attack);
        const chargeValue = PlayerActions.getChargeFromPlayer(currentPlayer);

        // Le baja la vida al carro que se le dio el ataque
        const currentCarHealth = carSquare.dataset.health;
        carSquare.dataset.health -= attack;
        const afterAttackCarHealth = carSquare.dataset.health;
        // Revisa si el carro quedo destruid
        if (carSquare.dataset.health <= 0) {
            // Se va a quitar el carro del tablero en otro lugar. Esto es para tener la informacion de
            // la data del carro sin incurrir a hacer mas variables
            console.log("El carro quedo destruido!");
            carDestroyed = true;
        }

        // Le baja energia a la arma que se uso para el ataque
        PlayerActions.consumePowerForActionInPlayer(currentPlayer);
        
        
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
            attack,
            carDestroyed,
            weaponDischarged
        );
        // Se muestra en las notas del juego
        console.log("Ataque: " + attack);
        GameNotesDisplay.addAttackActionNote(attackingCarSquare, carSquare, weaponSquare, chargeValue, attack, currentCarHealth, afterAttackCarHealth);

        if (carDestroyed) {
            // Ya quita de verdad el carro destruido en el tablero despues de usar la informacion para el metodo anterior
            // Esta funcion devuelve las armas que estaban en el carro
            const weapons = BoardClick.removeCarOnBoard(carSquare);
            // Elimina el carro del jugador afectado, y actualiza el valor en la ventana de informacion 
            //const affectedPlayer = carSquare.id.slice(0, 7);            
            StateGame.removeCarFromPlayer(affectedPlayer);
            GameInformationDisplay.updateCurrentCarsPlayer(affectedPlayer);
            // Le devuelve las armas al jugador afectado
            // (Porque carajos no marca error cuando no pongo la cantidad de atributos necesarios????????)
            this.returnWeaponsToDeck(affectedPlayer, weapons);
            // Le da nitro de recompensa al jugador que destruyo el carro. Actualiza el valor en la ventana de informacion
            await PlayerActions.giveNitroAfterDestroyedCar(currentPlayer);
            GameValuesDisplay.updateNitroValue();
            // Le quita la estetica a la casilla
            carSquare.classList.remove("car-nitro-activated");
        }
    }

    // Prepara todo para atacar
    static prepareForAttack(weaponSquare, player, zoneNumber, squareNumber) {
        if (PlayerActions.getPowerFromPlayer(player) <= 0) {
            // Avisar al usuario despues
            console.log("Sin poder requerido");
            //const weaponPosData = weaponSquare.getBoundingClientRect().toJSON();
            //console.log(weaponPosData);
            DisplayMessageBoxes.createTemporalText(weaponSquare, "No hay poder suficiente para atacar!");

        } else if (weaponSquare.dataset.energy <= 0) {
            // Tambien avisar al usuario despues (aunque esto es dificil)
            console.log("La arma no tiene la energia suficiente");
        // Ya prepara la pagina para atacar
        } else {
            // Consigue la carga del jugador
            const charge = PlayerActions.getChargeFromPlayer(player);
            // Incremento de ataque del arma
            const attackBuff = Number(BoardClick.getCarSquareFromWeaponSquare(weaponSquare).dataset.attBuff);
            
            // Momento JS esto...
            let attack = parseInt(JSON.parse(weaponSquare.dataset.attacks)[0][charge - 1]);
            console.log("Aumento de ataque:", attackBuff);        
            AttackValues.setAttackValues(charge, attack, zoneNumber, squareNumber, attackBuff);
        }
    }
    // Le regresa las cartas de arma a un jugador, usado cuando un carro es destruido
    static returnWeaponsToDeck(player, weapons) {
        console.log(weapons);
        weapons.forEach((weapon) => {
            PlayerActions.addWeaponToPlayerDeck(player, weapon);
        })
    }
}