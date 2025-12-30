/*
Este script va a hacer todos los calculos de los jugadores
Que van a ser estos calculos? Generalmente de hacerle mostrar al jugador correcta el mazo respectivo, 
quitarle o agregarle cartas a cierto jugador, etc etc.
Por ahora lo unico que tendra es que revisa si es del jugador 1 o jugador 2, y si es asi elimina una carta de su
mazo
*/
// Importar jugadores
import { Player1 } from "./player1.js";
import { Player2 } from "./player2.js";

// Clase que va a hacer todo
export class PlayerActions {
    // Remueve una carta del deck
    static removeCardInDeck(player, deck, index) {
        (player === "player1") ? Player1.deleteFromDeck(deck, index) : Player2.deleteFromDeck(deck, index);
    }
}