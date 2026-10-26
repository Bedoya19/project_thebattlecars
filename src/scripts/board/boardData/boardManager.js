/*
    Esta clase se encarga de basicamente tener guardado todos los datos del tablero
    Veremos como nos va, en los proximos días solo se haran algunas pruebas sencillas.
    Creo que por ahora voy a hacer un JSON, separado por los jugadores y zonas.
*/

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

createZonesToPlayer("player1");
createZonesToPlayer("player2");
