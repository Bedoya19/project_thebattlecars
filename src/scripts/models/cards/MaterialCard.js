import { Category } from "../constants/enums.js";
import { TypeCard } from "../constants/enums.js";
import { Card } from "../cards/Card.js";
import { DataConversor } from "../constants/enums.js";
import { LoadCardsJSON } from "./loadCardsJSON.js";

export class MaterialCard extends Card {
    static #nextId = 1;

    constructor(category, name, description, longDescription, image, materialInQuestion, quantity) {
        super(category, TypeCard.MATERIAL, name, description, longDescription, image);

        // Corregir esto despues. Hacerlo mas elegante
        this.materialInQuestion = materialInQuestion
        this.quantity = quantity;
    }

    static async loadMaterialFromJSON(category, index) {
        const data = await LoadCardsJSON.loadMaterialsFromJSON();
        const material = data?.[category]?.[index];

        if (!material) throw new Error(`No existe material en ${category} con index ${index}`);
        return material;
    }
    static convertMaterialFromJSON(materialData) {
        return new MaterialCard(
            DataConversor.stringToEnum("category", materialData.category),
            materialData.name,
            materialData.description,
            materialData.longDescription,
            materialData.image,
            materialData.materialInQuestion,
            materialData.quantity
        );
    }
    static async loadMaterialObjectFromJSON(category, index) {
        const materialData = await MaterialCard.loadMaterialFromJSON(category, index);
        return MaterialCard.convertMaterialFromJSON(materialData);
    }
}