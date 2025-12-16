import { Category } from "../constants/enums.js";
import { TypeCard } from "../constants/enums.js";
import { Card } from "./Card.js";
import { DataConversor } from "../constants/enums.js";

export class CarCard extends Card{
    static #nextId = 1;

    constructor(category, name, description, health, capacity, attBuff, nitro, longDescription, image) {
        super(category, TypeCard.CAR, name, description, longDescription, image);

        this.health = health;
        this.capacity = capacity;
        this.attBuff = attBuff;
        this.nitro = nitro;
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
    static async loadCarFromJSON(category, index) {
        const res = await fetch("src/scripts/cardsData/cars.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        //console.log(data["category1"]);
        const car = data?.[category]?.[index];

        if (!car) throw new Error(`No existe data[${category}][${index}]`);
        return car;
    }
    static convertCarJSON(carData) {
        return new CarCard(
            DataConversor.stringToEnum("category", carData.category),
            carData.name,
            carData.descripcion,
            carData.health,
            carData.capacity,
            carData.attBuff,
            carData.nitro,
            carData.longDescription
        )
    }
}