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

import { StateGame } from "../game/stateGame.js";
import { LoadConfig } from "../game/loadConfig.js";

const carCard = await CarCard.loadCarObjectFromJSON("category1", 0);
const weaponCard = await WeaponCard.loadWeaponObjectFromJSON("category1", 0);
const materialCard = await MaterialCard.loadMaterialObjectFromJSON("category1", 0);

export class Player1 {
    static #decks = {
        "cars": [carCard, carCard, carCard, carCard, carCard],
        "weapons": [weaponCard, weaponCard, weaponCard, weaponCard, weaponCard, weaponCard, weaponCard],
        "materials": [materialCard, materialCard, materialCard]
    };
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
}
