import { Category } from "../constants/enums.js";
import { TypeCard } from "../constants/enums.js";
import { Card } from "./Card.js";
import { DataConversor } from "../constants/enums.js";


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

    static async loadWeaponFromJSON(category, index) {
        const res = await fetch("src/scripts/cardsData/weapons.json");
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);

        const data = await res.json();

        const weapon = data?.[category]?.[index];
        if (!weapon) throw new Error(`No existe arma en categoria ${category} con index ${index} en la base de datos`);
        return weapon;
    }
    static convertWeaponFromJSON(weaponData) {
        return new WeaponCard(
            DataConversor.stringToEnum("category", weaponData.category),
            weaponData.name,
            weaponData.descripcion,
            weaponData.longDescription,
            weaponData.image,
            weaponData.attacks,
            weaponData.energy,
            weaponData.materials
        )
    }
    static async loadWeaponObjectFromJSON(category, index) {
        const weaponData = await WeaponCard.loadWeaponFromJSON(category, index);
        return WeaponCard.convertWeaponFromJSON(weaponData);
    }
}