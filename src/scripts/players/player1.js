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

const carCard = await CarCard.loadCarObjectFromJSON("category1", 0);
const weaponCard = await WeaponCard.loadWeaponObjectFromJSON("category1", 0);
const materialCard = await MaterialCard.loadMaterialObjectFromJSON("category1", 0);

export class Player1 {
    static #decks = {
        "cars": [carCard, carCard, carCard],
        "weapons": [weaponCard, weaponCard, weaponCard],
        "materials": [materialCard, materialCard, materialCard]
    };

    // Getters de todo tipo
    static getDeck() {
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
