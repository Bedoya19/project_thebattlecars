/* 
Genuinamente no tengo ni idea como hacer para eliminar de forma permanente las cartas que son usadas.
Si hago que se elimine la carta del deck asi no mas, lo unico que terminaria haciendo es que se elimine la carta temporalmente del tablero. Cuando
cambie de tablero volvera a aparecer.
Si se va al array actual a eliminarlo usando el index guardado, tecnicamente funciona, pero si se cambia de deck, terminarian pasando cosas raras

La unica solucion que se me ocurre es crear una clase para cada jugador, y que en esa clase se pueda modificar las arrays por cualquier funcion
que lo requiera
*/
import { CarCard } from "../models/cards/CarCard.js";
import { WeaponCard } from "../models/cards/WeaponCard.js";
import { MaterialCard } from "../models/cards/MaterialCard.js";

import { DisplayCardsInDeck } from "../display/deckDisplay.js";

import { StateGame } from "../game/stateGame.js";
import { LoadConfig } from "../game/loadConfig.js";

const carCard = await CarCard.loadCarObjectFromJSON("category1", 0);
const weaponCard = await WeaponCard.loadWeaponObjectFromJSON("category1", 0);
const materialCard = await MaterialCard.loadMaterialObjectFromJSON("category1", 0);

export class Player1 {
    static #decks = {
        "cars": [carCard, carCard, carCard, carCard, carCard],
        //"weapons": [weaponCard, weaponCard, weaponCard, weaponCard, weaponCard, weaponCard, weaponCard],
        "weapons": [],
        // Este atributo de bodega esta hecho para ciertas comparaciones con las cartas para evitar perderlas al ponerlas en el tablero. Por ahora, solo es usado para devolverle algunas cartas necesarias al jugador
        "weapons_pile": [weaponCard, weaponCard, weaponCard, weaponCard, weaponCard, weaponCard, weaponCard],
        "weapons_storage": [weaponCard, weaponCard, weaponCard, weaponCard, weaponCard, weaponCard, weaponCard],
        "materials": [materialCard, materialCard, materialCard],
        "materials_storage": [materialCard, materialCard, materialCard]
    };
    static #nitro = 0;
    static #power = 1;
    static #charge = 1;

    // Getters de todo tipo
    static getDecks() {
        return this.#decks;
    }

    static getCars() {
        return this.#decks["cars"];
    }

    static getWeapons() {
        return this.#decks["weapons"];
    }

    static getMaterials() {
        return this.#decks["materials"];
    }

    static deleteFromDeck(deck, index) {
        this.#decks[deck].splice(index, 1);
    }

    // Getters de nitro y poder
    static getNitro() {
        return this.#nitro;
    }
    static getPower() {
        return this.#power;
    }
    // Getter de carga
    static getCharge() {
        return this.#charge;
    }
    // Getter para la bodega de armas
    static getWeaponsStorage() {
        return this.#decks["weapons_storage"];
    }

    static getWeaponsPile() {
        return this.#decks["weapons_pile"]
    }

    // Metodos de modificacion de poder
    // Este da poder. Esto depende del modo que esta en el json de la configuracion
    static async givePower() {
        try {
            // Conseguir la informacion del json de la configuracion
            const res = await fetch("src/configs/config.json");
            if (!res.ok) throw new Error(`HTTP Error ${res.status}`);

            const data = await res.json();
            // Modo normal, solo 1 de poder por turno para cada jugador
            if (data["gamemode"] === "normal") {
                this.#power = 1;
            } else if (data["gamemode"] === "powers") {
                // Modo poderes, se da dependiendo del turno que se esta
                this.#power += StateGame.getTurn();
            }
        } catch (e) {
            console.error(`Error: ${e}`);
        }
        
    }
    // Restar poder
    // Generalmente va a ser 1 por una accion normal, o mas si se usa un poder.
    static subtractPower(amountPower) {
        this.#power = this.#power - amountPower;
    }

    // Modificacion de nitro
    // Se da nitro dependiendo de lo que esta marcado en la configuracion
    static async giveNitro() {
       this.#nitro += await LoadConfig.loadNitroPerTurn();
    }

    // Dar nitro por carro destruido
    static async giveNitroForDestroyedCar() {
        this.#nitro += await LoadConfig.loadNitroPerCar();
    }

    // Quitar nitro
    static removeNitro(quantity) {
        this.#nitro -= quantity;
    }

    // Generar una carga de manera aleatoria:
    static generateRandomCharge() {
        this.#charge = Math.floor(Math.random() * 6) + 1;
    }

    // Agrega una carta de arma al jugador
    // Preparar este codigo para la agregacion de cartas
    // (Se asume que el objeto es un arma)
    // (Tambien, si se van a agregar varias cartas, un for loop sale)
    // ((Aunque podria devolverselo a la pila, por ahora se devuelve al deck como tal))
    static addWeaponToDeck(weaponCard) {
        this.#decks["weapons"].push(weaponCard);
    }

    // Saca la informacion de una carta de arma de la bodega sacandola del nombre
    // Esta funcion es para regresarle el arma cuando el carro sea destruido
    static getWeaponFromStorage(weaponName) {
        return this.getWeaponsStorage().find(weapon => weapon.name === weaponName);
    }

    // Saca una arma aleatoria de la pila del mazo, y se agrega al deck en pantalla
    static getRandomWeaponFromPile() {
        try {
            const weaponsPile = this.#decks["weapons_pile"];
            const weaponsPileIndex = Math.floor(Math.random() * weaponsPile.length);
            const randomWeapon = weaponsPile[weaponsPileIndex];
            // Elimina la carta de la pila. Se espera
            this.#decks["weapons_pile"].splice(weaponsPileIndex, 1);
            this.addWeaponToDeck(randomWeapon);

            // Actualiza el deck
            const currentDeck = document.getElementById("deck-icon-current").dataset.deck;
            if (currentDeck === "weapons") {
                const deckCards = document.getElementById("deck-cards");
                const cardInformation = document.getElementById("card-selected-information");
                deckCards.innerHTML = "";
                DisplayCardsInDeck.showDeckOfCards(deckCards, this.#decks["weapons"], cardInformation);
            }
            
            //return randomWeapon;
        } catch (e) {
            // Muy probablemente se acabaron las cartas en la pila.
            console.log("Se acabaron las cartas de arma!");
        }
        
    }
}
