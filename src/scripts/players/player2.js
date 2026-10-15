// Clase de player 2
import { CarCard } from "../models/cards/CarCard.js";
import { WeaponCard } from "../models/cards/WeaponCard.js";
import { MaterialCard } from "../models/cards/MaterialCard.js";

import { Player } from "./Player.js";

const carCard = await CarCard.loadCarObjectFromJSON("category1", 0);

const weaponCard1 = await WeaponCard.loadWeaponObjectFromJSON("category1", 0);
const weaponCard2 = await WeaponCard.loadWeaponObjectFromJSON("category1", 1);
const weaponCard3 = await WeaponCard.loadWeaponObjectFromJSON("category1", 2);

const materialCard1 = await MaterialCard.loadMaterialObjectFromJSON("category1", 0);
const materialCard2 = await MaterialCard.loadMaterialObjectFromJSON("category1", 1);
const materialCard3 = await MaterialCard.loadMaterialObjectFromJSON("category1", 2);
const materialCard4 = await MaterialCard.loadMaterialObjectFromJSON("category1", 3);
const materialCard5 = await MaterialCard.loadMaterialObjectFromJSON("category1", 4);
const materialCard6 = await MaterialCard.loadMaterialObjectFromJSON("category1", 5);
const materialCard7 = await MaterialCard.loadMaterialObjectFromJSON("category1", 6);


// Tal vez en un futuro fusionar con Player1? Pero esta es mi unica solucion
export class Player2 extends Player {
    static _decks = {
        "cars": [carCard, carCard, carCard, carCard, carCard],
        "weapons": [weaponCard1, weaponCard2, weaponCard3],
        "weapons_pile": [
            weaponCard1, weaponCard1, weaponCard1, weaponCard1, weaponCard1, weaponCard1, weaponCard1, weaponCard1, weaponCard1, weaponCard1,
            weaponCard1, weaponCard1, weaponCard1, weaponCard1, weaponCard1,
            weaponCard2, weaponCard2, weaponCard2, weaponCard2, weaponCard2, weaponCard2, weaponCard2, weaponCard2, weaponCard2, weaponCard2, 
            weaponCard3, weaponCard3, weaponCard3, weaponCard3, weaponCard3, weaponCard3, weaponCard3, weaponCard3, weaponCard3, weaponCard3
        ],
        "weapons_storage": [
            weaponCard1, weaponCard1, weaponCard1, weaponCard1, weaponCard1, weaponCard1, weaponCard1, weaponCard1, weaponCard1, weaponCard1,
            weaponCard1, weaponCard1, weaponCard1, weaponCard1, weaponCard1,
            weaponCard2, weaponCard2, weaponCard2, weaponCard2, weaponCard2, weaponCard2, weaponCard2, weaponCard2, weaponCard2, weaponCard2, 
            weaponCard3, weaponCard3, weaponCard3, weaponCard3, weaponCard3, weaponCard3, weaponCard3, weaponCard3, weaponCard3, weaponCard3
        ],
        "materials": [],
        "materials_pile": [
            materialCard1, materialCard1, materialCard1, materialCard1, materialCard1, materialCard1, materialCard1, materialCard1, materialCard1, materialCard1, materialCard1, materialCard1, materialCard1, materialCard1, materialCard1,
            materialCard2, materialCard2, materialCard2, materialCard2, materialCard2, materialCard2, materialCard2, materialCard2, materialCard2, materialCard2, materialCard2,
            materialCard3, materialCard3, materialCard3, materialCard3, materialCard3, materialCard3, materialCard3, materialCard3, materialCard3, materialCard3, materialCard3,
            materialCard4, materialCard4, materialCard4, materialCard4, materialCard4, materialCard4, materialCard4, materialCard4, materialCard4, materialCard4, materialCard4,
            materialCard5, materialCard5, materialCard5, materialCard5, materialCard5, materialCard5, materialCard5, materialCard5, materialCard5, materialCard5, materialCard5,
            materialCard6
        ],
        "materials_storage": [
            materialCard1, materialCard1, materialCard1, materialCard1, materialCard1, materialCard1, materialCard1, materialCard1, materialCard1, materialCard1, materialCard1, materialCard1, materialCard1, materialCard1, materialCard1,
            materialCard2, materialCard2, materialCard2, materialCard2, materialCard2, materialCard2, materialCard2, materialCard2, materialCard2, materialCard2, materialCard2,
            materialCard3, materialCard3, materialCard3, materialCard3, materialCard3, materialCard3, materialCard3, materialCard3, materialCard3, materialCard3, materialCard3,
            materialCard4, materialCard4, materialCard4, materialCard4, materialCard4, materialCard4, materialCard4, materialCard4, materialCard4, materialCard4, materialCard4,
            materialCard5, materialCard5, materialCard5, materialCard5, materialCard5, materialCard5, materialCard5, materialCard5, materialCard5, materialCard5, materialCard5,
            materialCard6
        ]
    };
    static _nitro = 0;
    static _power = 1;
    static _charge = 1;
}