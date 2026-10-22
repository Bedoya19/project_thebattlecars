/*
    Esta clase se encarga de basicamente tener guardado todos los datos del tablero
    Veremos como nos va, en los proximos días solo se haran algunas pruebas sencillas.
    Creo que por ahora voy a hacer un JSON, separado por los jugadores y zonas.
*/

import { CarSquare } from "./boardSquares.js/mainSquares/carSquare.js";
import { WeaponSquare } from "./boardSquares.js/mainSquares/weaponSquare.js";
import { PowerSquare } from "./boardSquares.js/powerSquares/powerSquare.js";


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

createZonesToPlayer("player1");
createZonesToPlayer("player2");
