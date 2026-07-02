// Clase de player 2
import { CarCard } from "../models/cards/CarCard.js";
import { WeaponCard } from "../models/cards/WeaponCard.js";
import { MaterialCard } from "../models/cards/MaterialCard.js";

import { Player } from "./Player.js";

const carCard = await CarCard.loadCarObjectFromJSON("category1", 0);
const weaponCard = await WeaponCard.loadWeaponObjectFromJSON("category1", 0);
const materialCard = await MaterialCard.loadMaterialObjectFromJSON("category1", 0);

// Tal vez en un futuro fusionar con Player1? Pero esta es mi unica solucion
export class Player2 extends Player {
    static _decks = {
        "cars": [carCard, carCard, carCard, carCard, carCard],
        "weapons": [],
        "weapons_pile": [weaponCard, weaponCard, weaponCard, weaponCard, weaponCard, weaponCard, weaponCard],
        "weapons_storage": [weaponCard, weaponCard, weaponCard, weaponCard, weaponCard, weaponCard, weaponCard],
        "materials": [],
        "materials_pile": [materialCard, materialCard, materialCard],
        "materials_storage": [materialCard, materialCard, materialCard]
    };
    static _nitro = 0;
    static _power = 1;
    static _charge = 1;
}