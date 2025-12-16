import { Category } from "../constants/enums.js";
import { TypeCard } from "../constants/enums.js";
import { Card } from "./Card.js";


export class WeaponCard extends Card {
    static #nextId = 1;

    constructor(category, name, description, attacks, energy, materials, longDescription, image) {
        super(category, TypeCard.WEAPON, name, description, longDescription, image);
        // Toca revisar que la informacion este correcta
        this.attacks = attacks;
        this.energy = energy;
        // Esto tambien tiene que tener algun diseño en especifico.
        this.materials = materials;
        this.id = `weapon-${WeaponCard.#nextId++}`;
    }

    clone() {
        return new WeaponCard(
            this.category,
            this.name,
            this.descripcion,
            this.longDescription,
            this.image,
            structuredClone(attacks),
            this.energy,
            structuredClone(this.materials)
        )
    }
}