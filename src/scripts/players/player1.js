/* 
    Genuinamente no tengo ni idea como hacer para eliminar de forma permanente las cartas que son usadas.
    Si hago que se elimine la carta del deck asi no mas, lo unico que terminaria haciendo es que se elimine la carta temporalmente del tablero. Cuando
    cambie de tablero volvera a aparecer.
    Si se va al array actual a eliminarlo usando el index guardado, tecnicamente funciona, pero si se cambia de deck, terminarian pasando cosas raras

    La unica solucion que se me ocurre es crear una clase para cada jugador, y que en esa clase se pueda modificar las arrays por cualquier funcion
    que lo requiera
*/
import { CarCard } from "../models/cards/CarCard.js";
import { WeaponCard } from "../models/cards/WeaponCard.js";
import { MaterialCard } from "../models/cards/MaterialCard.js";

import { DisplayCardsInDeck } from "../display/deckDisplay.js";

import { Player } from "./Player.js";

const carCard = await CarCard.loadCarObjectFromJSON("category1", 0);
const weaponCard = await WeaponCard.loadWeaponObjectFromJSON("category1", 0);
const materialCard = await MaterialCard.loadMaterialObjectFromJSON("category1", 0);

export class Player1 extends Player {
    static _decks = {
        "cars": [carCard, carCard, carCard, carCard, carCard],
        "weapons": [],
        "weapons_pile": [weaponCard, weaponCard, weaponCard, weaponCard, weaponCard, weaponCard, weaponCard],
        // Este atributo de bodega esta hecho para ciertas comparaciones con las cartas para evitar perderlas al ponerlas en el tablero. Por ahora, solo es usado para devolverle algunas cartas necesarias al jugador
        "weapons_storage": [weaponCard, weaponCard, weaponCard, weaponCard, weaponCard, weaponCard, weaponCard],
        "materials": [],
        "materials_pile": [materialCard, materialCard, materialCard],
        "materials_storage": [materialCard, materialCard, materialCard]
    };
    static _nitro = 0;
    static _power = 1;
    static _charge = 1;
}