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
        "cars": [carCard, carCard, carCard],
        "weapons": [weaponCard, weaponCard, weaponCard],
        "materials": [materialCard, materialCard, materialCard]
    }
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
}