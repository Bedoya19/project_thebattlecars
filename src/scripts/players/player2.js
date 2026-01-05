// Clase de player 2
import { CarCard } from "../models/cards/CarCard.js";
import { WeaponCard } from "../models/cards/WeaponCard.js";
import { MaterialCard } from "../models/cards/MaterialCard.js";

const carCard = await CarCard.loadCarObjectFromJSON("category1", 0);
const weaponCard = await WeaponCard.loadWeaponObjectFromJSON("category1", 0);
const materialCard = await MaterialCard.loadMaterialObjectFromJSON("category1", 0);

// Tal vez en un futuro fusionar con Player1? Pero esta es mi unica solucion
export class Player2 {
    static #decks = {
        "cars": [carCard, carCard, carCard, carCard, carCard],
        "weapons": [weaponCard, weaponCard, weaponCard, weaponCard, weaponCard, weaponCard, weaponCard],
        "materials": [materialCard, materialCard, materialCard]
    }
    static #nitro = 0;
    static #power = 1;
     
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

    // Metodos de modificacion de poder
    // Este da poder. Esto depende del modo que esta en el json de la configuracion
    static async givePower() {
        const res = await fetch("src/configs/config.json");
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);

        const data = await res.json();
        // Modo normal, solo 1 de poder por turno para cada jugador
        if (data["gamemode"] === "normal") {
            this.#power = 1;
        // Modo poderes, se da dependiendo del turno que se esta
        } else if (data["gamemode"] === "powers") {
            this.#power = StateGame.getTurn();
        }
    }

    static subtractPower(amountPower) {
        this.#power = this.#power - amountPower;
    }
}