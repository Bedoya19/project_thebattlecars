// El script en donde tendra el ciclo del juego principal.
// Ahora los objetivos son los siguientes:
// * Que se cambie de un jugador a otro
// * Que limite la cantidad de acciones con respecto al poder de cada jugador
// * El ciclo del juego. Es decir, que siga indefinidamente el cambio de turnos

import { DisplayCardsInDeck } from "../display/deckDisplay.js";
import { GameInformationDisplay } from "../display/gameInformationDisplay.js";
import { StateGame } from "./stateGame.js";
import { PlayerActions } from "../players/playerActions.js";
import { GameValuesDisplay } from "../display/gameValuesDisplay.js";

// Como lo ha sido siempre en este proyecto, se va a crear una clase
// En general ha sido asi en todo el proyecto para facilitar la importacion y exportacion de funciones hacia
// otros documentos JS.
export class MainGame {
    // Cambia de jugadores
    static changePlayers() {
        // Cambia el data del deck para que sea del otro jugador
        const currentPlayer = document.getElementById("deck").dataset.player;
        const newPlayer = (currentPlayer === "player1") ? "player2" : "player1";
        document.getElementById("deck").dataset.player = newPlayer;
        
        // Reinicia el deck en su totalidad
        // Toca conseguir primero los ementos del documento necesario para
        // el cambio del deck
        // (no se si se puede hacer despues una funcion...? Aunque toca ver)
        const deckIcon = document.getElementById("deck-icon-current");
        const deckCards = document.getElementById("deck-cards");
        const cardInformation = document.getElementById("card-selected-information");
        deckCards.innerHTML = "";
        DisplayCardsInDeck.changeSpecificDeck(deckCards, deckIcon, cardInformation, newPlayer, "cars");
    }

    // Sigue para la siguiente ronda o turno
    static async goToNextRound() {
        // Cambia de jugadores
        this.changePlayers();
        // Va a la siguiente ronda
        const stateRound = StateGame.nextRound();
        // Actualiza solo la ronda o el turno dependiendo de lo que devuelve stateRound
        if (stateRound[0] === 1) {
            GameInformationDisplay.updateCurrentRound();
        } else {
            await PlayerActions.giveNitroAndPowerToPlayers();
            GameInformationDisplay.updateCurrentRoundAndTurn();
        }
        GameValuesDisplay.updateAllValues(
            document.getElementById("deck").dataset.player
        );
    }

    // Hace los calculos con el poder con cada accion
    // Devuelve true despues de restar poder. false si ya esta en 0
    static calculatePowerForAction(player) {
        if (PlayerActions.getPowerFromPlayer(player) <= 0) {
            return false;
        } else {
            PlayerActions.consumePowerForActionInPlayer(player);
            GameValuesDisplay.updatePowerValue();
            return true;
        }
    }
}