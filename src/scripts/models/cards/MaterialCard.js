import { Category } from "../constants/enums.js";
import { TypeCard } from "../constants/enums.js";
import { Card } from "../cards/Card.js";

export class MaterialCard extends Card {
    static #nextId = 1;

    constructor(category, name, description, longDescription, image, materialInQuestion, quantity) {
        super(category, TypeCard.MATERIAL, name, description, longDescription, image);

        // Corregir esto despues
        this.materialInQuestion = materialInQuestion
        this.quantity = quantity;
    }
}