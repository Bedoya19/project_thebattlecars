/*
    El repositorio en donde esta todo lo que tiene que ver con los jugadores, ya que ahora son
    objetos y no clases estaticas.
    Con ya la implementacion de jugadores como objetos, ya es mucho mas sencillo poder hacer ciertas
    con mucha mayor facilidad.
*/

import { Player } from "./NewPlayer.js";

import { decksP1 } from "./player1Data.js";
import { decksP2 } from "./player2Data.js";

export const players = {
    player1: new Player(decksP1),
    player2: new Player(decksP2)
}