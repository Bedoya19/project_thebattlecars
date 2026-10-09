/*

    Data de las cartas del jugador 1

*/

import { CarCard } from "../models/cards/CarCard.js";
import { WeaponCard } from "../models/cards/WeaponCard.js";
import { MaterialCard } from "../models/cards/MaterialCard.js";

import { DisplayCardsInDeck } from "../display/deckDisplay.js";

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
//const materialCard7 = await MaterialCard.loadMaterialObjectFromJSON("category1", 6);

const materialCard1_3 = await MaterialCard.loadMaterialObjectFromJSON("category1", 7);

export const decksP2 = {
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
        materialCard1, materialCard1, materialCard1, materialCard1, materialCard1, materialCard1, materialCard1, materialCard1, materialCard1, materialCard1, materialCard1_3, materialCard1_3, materialCard1_3, materialCard1_3, materialCard1_3, materialCard1_3, materialCard1_3, materialCard1_3, materialCard1_3,
        materialCard2, materialCard2, materialCard2, materialCard2, materialCard2, materialCard2, materialCard2, materialCard2, materialCard2, materialCard2,
        materialCard3, materialCard3, materialCard3, materialCard3, materialCard3, materialCard3, materialCard3, materialCard3, materialCard3, materialCard3,
        materialCard4, materialCard4, materialCard4, materialCard4, materialCard4, materialCard4, materialCard4, materialCard4, materialCard4, materialCard4,
        materialCard5, materialCard5, materialCard5, materialCard5, materialCard5, materialCard5, materialCard5, materialCard5, materialCard5, materialCard5,
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
