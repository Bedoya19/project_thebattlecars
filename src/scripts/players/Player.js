/* 
    Clase madre de Player1 y Player2.
    Contiene toda la logica compartida entre ambos jugadores.
    
    NOTA IMPORTANTE - Por que "_" y no "#":
    Los campos privados reales de JS (con "#") no son heredables — las subclases
    no pueden acceder a "this.#decks" si "#decks" fue declarado en la clase madre.
    Por eso se usa la convencion "_" (guion bajo), que indica "privado por convencion"
    pero tecnicamente es accesible. Dado que PlayerActions es la unica puerta de entrada
    al estado de los jugadores, esto no representa un problema practico.
*/

import { StateGame } from "../game/stateGame.js";
import { LoadConfig } from "../game/loadConfig.js";

export class Player {
    // Estado interno — sobreescrito por cada subclase con sus propios datos
    static _decks = {};
    static _nitro = 0;
    static _power = 1;
    static _charge = 1;

    // Getters de decks

    static getDecks() {
        return this._decks;
    }

    static getCars() {
        return this._decks["cars"];
    }

    static getWeapons() {
        return this._decks["weapons"];
    }

    static getMaterials() {
        return this._decks["materials"];
    }

    // Getter para la bodega de armas
    static getWeaponsStorage() {
        return this._decks["weapons_storage"];
    }

    static getWeaponsPile() {
        return this._decks["weapons_pile"];
    }

    // Getters de nitro, poder y carga

    static getNitro() {
        return this._nitro;
    }

    static getPower() {
        return this._power;
    }

    static getCharge() {
        return this._charge;
    }

    // Modificacion de decks

    static deleteFromDeck(deck, index) {
        this._decks[deck].splice(index, 1);
    }

    // Agrega una carta de arma al jugador
    // (Si se van a agregar varias cartas, un for loop sale)
    // ((Aunque podria devolverselo a la pila, por ahora se devuelve al deck como tal))
    static addWeaponToDeck(weaponCard) {
        this._decks["weapons"].push(weaponCard);
    }

    static addMaterialToDeck(materialCard) {
        this._decks["materials"].push(materialCard);
    }

    // Saca la informacion de una carta de arma de la bodega sacandola del nombre
    // Esta funcion es para regresarle el arma cuando el carro sea destruido
    static getWeaponFromStorage(weaponName) {
        return this.getWeaponsStorage().find(weapon => weapon.name === weaponName);
    }

    // Modificacion de poder

    // Este da poder. Esto depende del modo que esta en el json de la configuracion
    static async givePower() {
        try {
            const res = await fetch("src/configs/config.json");
            if (!res.ok) throw new Error(`HTTP Error ${res.status}`);

            const data = await res.json();
            // Modo normal, solo 1 de poder por turno para cada jugador
            if (data["gamemode"] === "normal") {
                this._power = 1;
            } else if (data["gamemode"] === "powers") {
                // Modo poderes, se da dependiendo del turno que se esta
                this._power += StateGame.getTurn();
            }
        } catch (e) {
            console.error(`Error: ${e}`);
        }
    }

    // Restar poder
    // Generalmente va a ser 1 por una accion normal, o mas si se usa un poder.
    static subtractPower(amountPower) {
        this._power -= amountPower;
    }

    // Modificacion de nitro

    // Se da nitro dependiendo de lo que esta marcado en la configuracion
    static async giveNitro() {
        this._nitro += await LoadConfig.loadNitroPerTurn();
    }

    // Dar nitro por carro destruido
    static async giveNitroForDestroyedCar() {
        this._nitro += await LoadConfig.loadNitroPerCar();
    }

    // Quitar nitro
    static removeNitro(quantity) {
        this._nitro -= quantity;
    }

    // Modificacion de carga

    // Generar una carga de manera aleatoria
    static generateRandomCharge() {
        this._charge = Math.floor(Math.random() * 6) + 1;
    }

    // Pila de cartas (pile)

    // Saca una carta de manera aleatoria de la pila
    // ESTAS FUNCIONES LA ELIMINAN DE LA PILA
    static getRandomCardFromPile(deck) {
        const pile = this._decks[deck];
        const pileIndex = Math.floor(Math.random() * pile.length);
        const randomCard = pile[pileIndex];
        // Elimina la carta de la pila. Se espera que se agregue a algun otro lado despues
        this._decks[deck].splice(pileIndex, 1);
        return randomCard;
    }

    static getRandomWeaponFromPile() {
        return this.getRandomCardFromPile("weapons_pile");
    }

    static getRandomMaterialFromPile() {
        return this.getRandomCardFromPile("materials_pile");
    }
}
