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
    static async loadCarDataFromJSON(category, index) {
        const res = await fetch("src/scripts/cardsData/cars.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        //console.log(data["category1"]);
        const car = data?.[category]?.[index];

        if (!car) throw new Error(`No existe carro en categoria ${category} con index ${index} en la base de datos`);
        return car;
    }
    static convertCarJSON(carData) {
        return new CarCard(
            DataConversor.stringToEnum("category", carData.category),
            carData.name,
            carData.description,
            carData.health,
            carData.capacity,
            carData.attBuff,
            carData.nitro,
            carData.longDescription,
            carData.image
        )
    }
    // Esta funcion basicamente hace lo que hice en prueba, pero junto
    static async loadCarObjectFromJSON(category, index) {
        const carData = await CarCard.loadCarDataFromJSON(category, index);
        return CarCard.convertCarJSON(carData);
    }
}