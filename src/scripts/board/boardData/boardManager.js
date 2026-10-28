/*
    Esta clase se encarga de basicamente tener guardado todos los datos del tablero
    Veremos como nos va, en los proximos días solo se haran algunas pruebas sencillas.
    Creo que por ahora voy a hacer un JSON, separado por los jugadores y zonas.
*/

import { BoardSquareFactory } from "./boardSquareFactory.js";
import { CarSquare } from "./boardSquares/mainSquares/carSquare.js";
import { WeaponSquare } from "./boardSquares/mainSquares/weaponSquare.js";
import { PowerSquare } from "./boardSquares/powerSquares/powerSquare.js";


export const board = {
    "player1": {
        "zone": []
    },
    "player2": {
        "zone": []
    }
};

// Functiones que crean la zonas
function createZone() {
    return {
        carSquare: null,
        weaponSquares: Array(8).fill(null)
    };
}

function createZonesToPlayer(player) {
    for (let i = 0; i < 3; i++) {
        board[player]["zone"].push(createZone());
    }
}

function readCarSquare(player, zone) { // zone de 0 - 2

}

// Consigue un carSquare del jugador y la zona
export function getCarSquareInst(player, zone) { // zone de 0 - 2
    console.log(player, zone);
    return board[player]["zone"][zone].carSquare;
}

// Consigue los carSquares que tienen carros
export function getCarSquaresFromBoard(player) {
    const carSquares = [];
    for (let i = 0; i < 3; i++) {
        const carSquare = board[player]["zone"][i].carSquare;
        if (carSquare !== null) {
            carSquares.push(carSquare);
        }
    }
    return carSquares;
}

export function removeCarSquareFromBoard(player, zone) { // zone de 0 - 2
    board[player]["zone"][zone].carSquare = null;
}

// Funciones de los weaponSquares
// (todos los zones de 0 - 2, todos los weaponNumbers de 0 - 7, se tendra que restar por 1 antes de pasarlo a estas funciones)
// Consigue el weaponSquare
export function getWeaponSquareInst(player, zone, weaponNumber) {
    return board[player]["zone"][zone].weaponSquares[weaponNumber];
}

// Crea un weaponSquare mediante la Factory
export function setWeaponSquareInst(player, zone, weaponNumber, weaponCard) {
    board[player]["zone"][zone].weaponSquares[weaponNumber] = BoardSquareFactory.createWeaponSquare(weaponCard, player, zone, weaponNumber);
}

// Elimina el weaponSquare
export function removeWeaponSquareFromBoard(player, zone, weaponNumber) {
    board[player]["zone"][zone].weaponSquares[weaponNumber] = null;
}

// Consigue todos los weaponSquares de una zona en especifico
export function getAllWeaponSquaresFromZone(player, zone) {
    const weaponSquares = [];
    for (let i = 0; i < 8; i++) {
        const weaponSquare = getWeaponSquareInst(player, zone, i);
        if (weaponSquare !== null) {
            weaponSquares.push(weaponSquare);
        }
    }
    return weaponSquares;
}


createZonesToPlayer("player1");
createZonesToPlayer("player2");
