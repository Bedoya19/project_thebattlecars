import { Category } from "../constants/enums.js";
import { TypeCard } from "../constants/enums.js";
import { ValidateEnums } from "../constants/enums.js";
import { Card } from "../cards/Card.js";
import { materials } from "../constants/materials.js";

export class MaterialCard extends Card {
    static #nextId = 1;

    constructor(category, name, description, longDescription, image, materialInQuestion, quantity) {
        super(category, TypeCard.MATERIAL, name, description, longDescription, image);

        this.materialInQuestion = ValidateEnums.isValidEnum(materialInQuestion, MaterialsCat1, "Material de Categoria 1 invalido");
        this.quantity = quantity;
    }
}