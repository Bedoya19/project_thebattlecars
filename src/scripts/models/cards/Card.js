import { Category } from "../constants/enums.js";
import { TypeCard } from "../constants/enums.js";
import { ValidateEnums } from "../constants/enums.js";

export class Card {
    constructor(category, type, name, descripcion, longDescription, image) {
        ValidateEnums.isValidEnum(category, Category, "Categoria invalida")
        ValidateEnums.isValidEnum(type, TypeCard, "Tipo de carta invalido")
        this.category = category;
        this.type = type;
        this.name = name;
        this.descripcion = descripcion;
        this.longDescription = longDescription;
        this.image = image;
    }
}