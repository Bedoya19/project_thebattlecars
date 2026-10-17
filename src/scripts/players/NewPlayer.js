/* 
    Clase madre de Player1 y Player2.
    Contiene toda la logica compartida entre ambos jugadores.
*/

import { StateGame } from "../game/stateGame.js";
import { LoadConfig } from "../game/loadConfig.js";

export class Player {
    /* 
        Esta vez ya no sera static, sino que se pueden crear objetos de Players
        Esto en teoria deberia de simplificar PlayerActions, evitar ciertos bugs, y ya para una mayor
        flexibilidad cuando lleguen los bots y el multijugador en linea (que eso sera muy a futuro)
    */
    constructor(decks) { this.decks = decks; this.nitro = 0; this.power = 1; this.charge = 1; }

    // Getters de decks
    
    getDecks() {
        return this.decks;
    }

    getCars() {
        return this.decks["cars"];
    }

    getWeapons() {
        return this.decks["weapons"];
    }

    getMaterials() {
        return this.decks["materials"];
    }

    // Getter para la bodega de armas
    getWeaponsStorage() {
        return this.decks["weapons_storage"];
    }

    getWeaponsPile() {
        return this.decks["weapons_pile"];
    }

    // Getters de nitro, poder y carga

    getNitro() {
        return this.nitro;
    }

    getPower() {
        return this.power;
    }

    getCharge() {
        return this.charge;
    }

    // Modificacion de decks

    deleteFromDeck(deck, index) {
        //console.log(deck);
        this.decks[deck].splice(index, 1);
    }

    // Agrega una carta de arma al jugador
    // (Si se van a agregar varias cartas, un for loop sale)
    // ((Aunque podria devolverselo a la pila, por ahora se devuelve al deck como tal))
    addWeaponToDeck(weaponCard) {
        this.decks["weapons"].push(weaponCard);
    }

    addMaterialToDeck(materialCard) {
        this.decks["materials"].push(materialCard);
    }

    // Saca la informacion de una carta de arma de la bodega sacandola del nombre
    // Esta funcion es para regresarle el arma cuando el carro sea destruido
    getWeaponFromStorage(weaponName) {
        return this.getWeaponsStorage().find(weapon => weapon.name === weaponName);
    }

    // Modificacion de poder

    // Este da poder. Esto depende del modo que esta en el json de la configuracion
    async givePower() {
        try {
            const res = await fetch("src/configs/config.json");
            if (!res.ok) throw new Error(`HTTP Error ${res.status}`);

            const data = await res.json();
            // Modo normal, solo 1 de poder por turno para cada jugador
            if (data["gamemode"] === "normal") {
                this.power = 1;
            } else if (data["gamemode"] === "powers") {
                // Modo poderes, se da dependiendo del turno que se esta
                this.power += StateGame.getTurn();
            }
        } catch (e) {
            console.error(`Error: ${e}`);
        }
    }

    // Restar poder
    // Generalmente va a ser 1 por una accion normal, o mas si se usa un poder.
    subtractPower(amountPower) {
        this.power -= amountPower;
    }

    // Modificacion de nitro

    // Se da nitro dependiendo de lo que esta marcado en la configuracion
    async giveNitro() {
        this.nitro += await LoadConfig.loadNitroPerTurn();
    }

    // Dar nitro por carro destruido
    async giveNitroForDestroyedCar() {
        this.nitro += await LoadConfig.loadNitroPerCar();
    }

    // Quitar nitro
    removeNitro(quantity) {
        this.nitro -= quantity;
    }

    // Modificacion de carga

    // Generar una carga de manera aleatoria
    generateRandomCharge() {
        this.charge = Math.floor(Math.random() * 6) + 1;
    }

    // Define una carga en especifico
    // (util para los modos de carga secuencial)
    set setCharge(charge) {
        this.charge = parseInt(charge);
    }

    // Pila de cartas (pile)

    // Saca una carta de manera aleatoria de la pila
    // ESTAS FUNCIONES LA ELIMINAN DE LA PILA
    getRandomCardFromPile(deck) {
        console.log(deck);
        const pile = this.decks[deck];

        console.log("Deck completo: " + this.decks[deck]);
        console.log("Pila: " + pile);
        console.log("Longitud: " + pile.length);

        const pileIndex = Math.floor(Math.random() * pile.length);
        const randomCard = pile[pileIndex];
        // Elimina la carta de la pila. Se espera que se agregue a algun otro lado despues
        this.decks[deck].splice(pileIndex, 1);

        

        return randomCard;
    }

    getRandomWeaponFromPile() {
        return this.getRandomCardFromPile("weapons_pile");
    }

    getRandomMaterialFromPile() {
        return this.getRandomCardFromPile("materials_pile");
    }

    // Esta funcion esta mayormente hecha para materiales, pero puede ser tambien implementado para armas y carros. Voy viendo como se hace eso.
    getDeckSummary() {
        // Sabes que podemos hacer esto mas estandar...
        const currentDeck = document.getElementById("deck-icon-current");
    }

    // Gasta poder
    trySpendPower(power) {
        if (this.power < power) {
            return false;
        } else {
            this.subtractPower(power);
            return true;
        }
    }
}