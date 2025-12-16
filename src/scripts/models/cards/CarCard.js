import { Category } from "../constants/enums";
import { TypeCard } from "../constants/enums";
import { Card } from "./Card";

export class CarCard extends Card{
    static #nextId = 1;

    constructor(category, name, description, health, capacity, attBuff, nitro, longDescription, image) {
        super(category, TypeCard.CAR, name, description, longDescription, image);

        this.health = health;
        this.capacity = capacity;
        this.attBuff = attBuff;
        this.nitro = nitro;
        this.id = `car-${CarCard.#nextId++}`
    }

    // Esta funcion es para duplicar las cartas sin modificar la original
    clone() {
        return new CarCard(
            this.category,
            this.name,
            this.descripcion,
            this.health,
            this.capacity,
            this.attBuff,
            [...this.nitro],
            this.image
        );
    }
}