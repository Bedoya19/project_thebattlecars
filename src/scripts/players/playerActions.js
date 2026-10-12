/*
Este script va a hacer todos los calculos de los jugadores
Que van a ser estos calculos? Generalmente de hacerle mostrar al jugador correcta el mazo respectivo, 
quitarle o agregarle cartas a cierto jugador, etc etc.
Por ahora lo unico que tendra es que revisa si es del jugador 1 o jugador 2, y si es asi elimina una carta de su
mazo
*/
// Importar jugadores
import { players } from "./Players.js";

import { DisplayCardsInDeck } from "../display/deckDisplay.js";
import { GameValuesDisplay } from "../display/gameValuesDisplay.js";
import { GameNotesDisplay } from "../display/gameNotesDisplay.js";
import { DeckUtils } from "./DeckUtils.js";

// Clase que va a hacer todo
export class PlayerActions {
    // Consigue un deck en especifico dependiendo del jugador
    // Lo voy a hacer que sea junto con todo. Es decir, que se diga por ejemplo que se consigue el deck de carros
    // en este mismo metodo, en vez de distintos metodos para cada deck. Me hago entender?
    // (Se asume, btw, que esta bien escrito lo del deck...)
    static getDeckFromPlayer(player, deck) {
        switch (deck) {
            case "cars":
                return players[player].getCars();
            case "weapons":
                return players[player].getWeapons();
            case "materials":
                return players[player].getMaterials();
            case "powers":
                return "Todavia no se ha implementado los poderes al juego"
            default:
                return "Tipo de carta no existente";
        }
    }

    static getAllDecksFromPlayer(player) {
        return players[player].getDecks();
    }

    // Remueve una carta del deck
    static removeCardInDeck(player, deck, index) {
        players[player].deleteFromDeck(deck, index);
    }

    // Devuelve el poder o nitro de un jugador en especifico
    // Nitro
    static getNitroFromPlayer(player) {
        return players[player].getNitro();
    }
    // Poder
    static getPowerFromPlayer(player) {
        return players[player].getPower();
    }

    // Da nitro y poder a cada jugador
    // Este metodo (por lo general) se usa en lugares como el paso de un turno a otro
    static async giveNitroAndPowerToPlayers() {
        // Tal vez podria divivir la logica de cada en jugador en distintos metodos...? Aunque tocara ver
        // Jugador 1
        await players.player1.giveNitro();
        await players.player1.givePower();
        // Jugador 2
        await players.player2.giveNitro();
        await players.player2.givePower();
    }

    // Dar nitro al jugador a un valor en especifico
    static async giveNitroAfterDestroyedCar(player) {
        await players[player].giveNitroForDestroyedCar();
    }

    // Dar el gasto del poder al respecito jugador
    static consumePowerForActionInPlayer(player) {
        players[player].subtractPower(1);
    }

    static spendPower(player, n = 1) {
        if (!players[player].trySpendPower(n)) return false;
        GameValuesDisplay.updatePowerValue();
        return true;
    }

    

    static getChargeFromPlayer(player) {
        return players[player].getCharge();
    }

    static generateChargeForPlayer(player) {
        return players[player].generateRandomCharge();
    }

    static addWeaponToPlayerDeck(player, weaponCard) {
        players[player].addWeaponToDeck(weaponCard);
    }

    static addMaterialToPlayerDeck(player, materialCard) {
        players[player].addMaterialToDeck(materialCard);
    }

    static getWeaponFromStorageFromPlayer(player, weaponName) {
        return players[player].getWeaponFromStorage(weaponName);
    }

    static removeNitroFromCar(player, carSquare) {
        // Si no es el carSquare, manda error inmediatamente para evitar que cosas raras sucedan.
        if (!(carSquare instanceof HTMLElement) || !carSquare.dataset.nitroQuantity) {
            throw new Error("carSquare inválido o sin dataset de nitro");
        }
        const nitroToRemove = carSquare.dataset.nitroQuantity;
        players[player].removeNitro(nitroToRemove);
    }

    static getWeaponsFromPlayer(player) {
        return players[player].getWeapons();
    }

    // Agrega una carta a un deck en especifico
    static addCardToPlayerDeck(player, cardType, card) {
        // Se puede agregar otros decks
        switch (cardType) {
            case "weapons":
                this.addWeaponToPlayerDeck(player, card);
                break;
            case "materials":
                console.log("Materiales");
                console.log(card);
                this.addMaterialToPlayerDeck(player, card);
                break;
        }
    }

    static getRandomIndividualCardFromPile(player, cardType) {
        return players[player].getRandomCardFromPile(`${cardType}_pile`);
    }

    // Funcion exclusiva para sacar varias cartas de material.
    static getMultipleMaterialCards(player, quantity) {
        if (this.spendPower(player)) {
            try {
                GameNotesDisplay.addDrawCards(player, "materials", 5);
                for (let i = 0; i < quantity; i++) {
                    const randomCard = this.getRandomIndividualCardFromPile(player, "materials");
                    this.addCardToPlayerDeck(player, "materials", randomCard);

                    // Llevar a una funcion despues
                    const deckCards = document.getElementById("deck-cards");
                    const cardInformation = document.getElementById("card-selected-information");
                    deckCards.innerHTML = "";
                    DisplayCardsInDeck.showDeckOfCards(deckCards, this.getDeckFromPlayer(player, "materials"), cardInformation);
                    // Todo esto de arriba...
                }
            } catch (e) {
                console.log(e);
                console.log("Probablemente se acabaron las cartas ?")
            }
        } else {
            console.log("No hay poder suficiente!");
        }
    }

    static getRandomCardFromPlayerPile(player, cardType) {
        if (this.spendPower(player)) {
            try {
                const currentDeck = document.getElementById("deck-icon-current").dataset.deck;
                if (currentDeck === cardType) {
                    console.log(cardType);
                    /* const randomCard = (player === "player1") 
                        ? Player1.getRandomCardFromPile(`${cardType}_pile`) 
                        : Player2.getRandomCardFromPile(`${cardType}_pile`); */
                    //console.log(randomCard);
                    const randomCard = this.getRandomIndividualCardFromPile(player, cardType);
                    
                    this.addCardToPlayerDeck(player, cardType, randomCard);
                    GameValuesDisplay.updatePowerValue();
                    GameNotesDisplay.addDrawCard(player, cardType);

                    const deckCards = document.getElementById("deck-cards");
                    const cardInformation = document.getElementById("card-selected-information");
                    deckCards.innerHTML = "";
                    DisplayCardsInDeck.showDeckOfCards(deckCards, this.getDeckFromPlayer(player, cardType), cardInformation);
                }
            } catch (e) {
                console.log(e);
                console.log(`Ya no hay cartas de ${cardType} disponibles!`);
            }
        } else {
            console.log("No hay poder suficiente!");
        }
    }

    // Funcionalidad al boton de agregar cartas al deck en pantalla
    static getCardFromPile() {
        const player = document.getElementById("deck").dataset.player;
        const currentDeck = document.getElementById("deck-icon-current").dataset.deck;

        switch (currentDeck) {
            case "weapons":
                PlayerActions.getRandomCardFromPlayerPile(player, "weapons");
                break;
            case "materials":
                //PlayerActions.getRandomCardFromPlayerPile(player, "materials");
                PlayerActions.getMultipleMaterialCards(player, 5);
                break;
            default:
                console.log("No se puede sacar cartas de este mazo!");

        }
        //PlayerActions.getRandomWeaponFromPlayerPile(player);
    }

    static removeMaterialsForUpgrade(player, deck, material, needed) {
        console.log(material, needed);
        const indices = DeckUtils
            .selectMaterialCardsToRemove(deck, material, needed)
            .sort((a, b) => b - a);

        console.log(indices);

        indices.forEach(index => this.removeCardInDeck(player, "materials", index));

        // Llevar a una funcion despues
        const currentDeck = document.getElementById("deck-icon-current").dataset.deck;
        if (currentDeck === "materials") {
            const deckCards = document.getElementById("deck-cards");
            const cardInformation = document.getElementById("card-selected-information");
            deckCards.innerHTML = "";
            DisplayCardsInDeck.showDeckOfCards(deckCards, this.getDeckFromPlayer(player, "materials"), cardInformation);
        }
    }
}