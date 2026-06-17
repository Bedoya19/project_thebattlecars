// Guarda las notas del juego en una lista, todo ordenadito
// Nada afuera de lo ordinario
// ESTO NO ES UNA CLASE ESTATICA. Sera manejando usando solo algunas cuantas funciones con una variable de lista

import { StateGame } from "../game/stateGame.js";

const notes = [];

export function addNote(note) {
    notes.push({
        roud: StateGame.getRound(),
        turn: StateGame.getTurn(),
        message: note
    })
}

export function getNotes() {
    return notes
}

