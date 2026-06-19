// Guarda las notas del juego en una lista, todo ordenadito
// Nada afuera de lo ordinario
// ESTO NO ES UNA CLASE ESTATICA. Sera manejando usando solo algunas cuantas funciones con una variable de lista
// Esto sera principalmente por temas de simplicidad y hacer mas facil pasar la informacion de las notas de un lado a otro

import { StateGame } from "../game/stateGame.js";


const notes = {

}
const gameNotesWindow = document.getElementById("dialog-gamenotes");
const gameNotesContent = document.getElementsByClassName("dialog-gamenotes-body");

export function addNote(note) {
    //console.log(notes1[StateGame.getTurn()]);
    const turn = StateGame.getTurn();
    notes[turn] = notes[turn] ?? [];
    notes[turn].push({
        player: document.getElementById("deck").dataset.player,
        round: StateGame.getRound(),
        message: note
    })
    console.log(notesPerTurn);
}

export function getNotes() {
    return notesPerTurn;
}
