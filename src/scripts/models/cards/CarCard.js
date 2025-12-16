import { Category } from "../constants/enums.js";
import { TypeCard } from "../constants/enums.js";
import { Card } from "./Card.js";

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
        fetch("src/scripts/cardsData/cars.json")
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching JSON:', error);
            });
        }
    
}