/*
    Clase de las casillas de carros
    Almacena la carta de carro, junto con valores extra como vida y nitro
*/

import { BoardSquare } from "../boardSquare.js";
import { MainBoardSquare } from "./mainBoardSquare.js";

export class CarSquare extends MainBoardSquare {
    #health;
    #maxHealth;
    #maxCapacity;
    #currentNitro;

    constructor(card, player, zone) {
        super(card, player, zone);
        this.#health = card.health;
        this.#maxHealth = card.health;
        this.#maxCapacity = card.capacity;
        this.#currentNitro = 0;
    }

    // Los getters de los datos de las cartas de carros
    get health() { return this.#health };
    get maxHealth() { return this.#maxHealth };
    get currentNitro() { return this.#currentNitro };
    get maxCapacity() { return this.#maxCapacity };

    get capacity() { return this.card.capacity };
    get attBuff() { return this.card.attBuff };
    // Consigue los valores de nitro (que no es necesario cambiarlas)
    get nitroQuantity() { return this.card.nitro[0] };
    get nitroDuration() { return this.card.nitro[1] };
    get nitroResistance() { return this.card.nitroBuff[0] };
    get nitroAttack() { return this.card.nitroBuff[1] };

    setCurrentNitro() { this.#currentNitro = this.nitroDuration + 1 };

    // --- Temas del manejo de la vida y la capacidad del carro ---
    takeDamage(damage) {
        this.#health -= damage;
    }
    isDestroyed() {
        return (this.#health <= 0) ? true : false;
    }

    isCarCapacityFull() {
        return (this.card.capacity <= 0) ? true : false;
    }

    reduceCapacity() {
        this.card.capacity--;
    }
    // Este metodo en particular es especifico cuando se quita una carta de arma
    // Tal vez sea necesario otro metodo cuando lleguen los poderes
    increaseCapacity() {
        if (this.card.capacity < this.#maxCapacity) {
            this.card.capacity++;
        }
    }

    // --- Temas del manejo del nitro ---
    activateNitro() {
        this.setCurrentNitro();
        // No se si pongo mas cosas
    }

    reduceCapacity() {
        this.card.capacity -= 1;
        console.log(this.card.capacity);
    }

    // Restarle nitro (usado en el paso de ronda)
    reduceNitro() {
        if (this.#currentNitro > 0) {
            this.#currentNitro--;
        }
        if (this.#currentNitro === 0) {
            console.log("Nitro desactivado");
            // No se si agregar mas cosas....
        }
    }

    isNitroActive() {
        return Boolean(this.#currentNitro);
    }

    toJSON() {
        return { ...super.toJSON(), health: this.#health, maxHealth: this.#maxHealth, currentNitro: this.#currentNitro, maxCapacity: this.#maxCapacity };
    }
}
