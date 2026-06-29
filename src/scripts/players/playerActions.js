/*
Este script va a hacer todos los calculos de los jugadores
Que van a ser estos calculos? Generalmente de hacerle mostrar al jugador correcta el mazo respectivo, 
quitarle o agregarle cartas a cierto jugador, etc etc.
Por ahora lo unico que tendra es que revisa si es del jugador 1 o jugador 2, y si es asi elimina una carta de su
mazo
*/
// Importar jugadores
import { Player1 } from "./player1.js";
import { Player2 } from "./player2.js";

// Clase que va a hacer todo
export class PlayerActions {
    // Consigue un deck en especifico dependiendo del jugador
    // Lo voy a hacer que sea junto con todo. Es decir, que se diga por ejemplo que se consigue el deck de carros
    // en este mismo metodo, en vez de distintos metodos para cada deck. Me hago entender?
    // (Se asume, btw, que esta bien escrito lo del deck...)
    static getDeckFromPlayer(player, deck) {
        switch (deck) {
            case "cars":
                return (player === "player1") ? Player1.getCars() : Player2.getCars();
            case "weapons":
                return (player === "player1") ? Player1.getWeapons() : Player2.getWeapons();
            case "materials":
                return (player === "player1") ? Player1.getMaterials() : Player2.getMaterials();
            default:
                return "Todavia no se ha implementado los poderes al juego";
        }
    }

    static getAllDecksFromPlayer(player) {
        return (player === "player1") ? Player1.getDecks() : Player2.getDecks();
    }

    // Remueve una carta del deck
    static removeCardInDeck(player, deck, index) {
        (player === "player1") ? Player1.deleteFromDeck(deck, index) : Player2.deleteFromDeck(deck, index);
    }

    // Devuelve el poder o nitro de un jugador en especifico
    // Nitro
    static getNitroFromPlayer(player) {
        return (player === "player1") ? Player1.getNitro() : Player2.getNitro();
    }
    // Poder
    static getPowerFromPlayer(player) {
        return (player === "player1") ? Player1.getPower() : Player2.getPower();
    }

    // Da nitro y poder a cada jugador
    // Este metodo (por lo general) se usa en lugares como el paso de un turno a otro
    static async giveNitroAndPowerToPlayers() {
        // Tal vez podria divivir la logica de cada en jugador en distintos metodos...? Aunque tocara ver
        // Jugador 1
        await Player1.giveNitro();
        await Player1.givePower();
        // Jugador 2
        await Player2.giveNitro();
        await Player2.givePower();
    }

    // Dar nitro al jugador a un valor en especifico
    static async giveNitroAfterDestroyedCar(player) {
        (player === "player1") ? await Player1.giveNitroForDestroyedCar() : await Player2.giveNitroForDestroyedCar();
    }

    // Dar el gasto del poder al respecito jugador
    static consumePowerForActionInPlayer(player) {
        (player === "player1") ? Player1.subtractPower(1) : Player2.subtractPower(1);
    }

    static getChargeFromPlayer(player) {
        return (player === "player1") ? Player1.getCharge() : Player2.getCharge();
    }

    static generateChargeForPlayer(player) {
        return (player === "player1") ? Player1.generateRandomCharge() : Player2.generateRandomCharge();
    }

    static addWeaponToPlayerDeck(player, weaponCard) {
        (player === "player1") ? Player1.addWeaponToDeck(weaponCard) : Player2.addWeaponToDeck(weaponCard);
    }

    static getWeaponFromStorageFromPlayer(player, weaponName) {
        return (player === "player1") ? Player1.getWeaponFromStorage(weaponName) : Player1.getWeaponFromStorage(weaponName);
    }

    static removeNitroFromCar(player, carSquare) {
        // Si no es el carSquare, manda error inmediatamente para evitar que cosas raras sucedan.
        if (!(carSquare instanceof HTMLElement) || !carSquare.dataset.nitroQuantity) {
            throw new Error("carSquare inválido o sin dataset de nitro");
        }
        const nitroToRemove = carSquare.dataset.nitroQuantity;
        (player === "player1") ? Player1.removeNitro(nitroToRemove) : Player2.removeNitro(nitroToRemove);
    }
}