/*
En este script se va a manejar todo lo que tiene que ver con mostrar la informacion en el div de las estadisticas
del juego
Esto incluye actualizar los datos del juego en general, como los turnos y las rondas. Tambien maneja los valores
personales del jugador, que es la cantidad de nitro, poder y "carga" (el ataque que va a hacer el poder), y las
acciones que se hacen en el tablero.
*/
import { DisplayCardInformation } from "./displayCardInformation.js";

export class GameStatsDisplay {
    // Reinicia el contenido de las notas de los turnos
    static restartTurnNotes() {
        document.getElementById("turn-notes-content").innerHTML = "";
    }

    // Metodo generico para agregar una anotacion en las notas del turno
    static addTurnNote(message) {
        const turnContent = document.getElementById("turn-notes-content");
        const text = this.createStatsText();
        console.log(text);
        text.innerHTML = message;
        turnContent.appendChild(text);
    }

    // Agrega en las notas del turno la colocacion de una carta de carro
    static carOnBoardTurnNotes(player, zone, carName) {
        this.addTurnNote(`${DisplayCardInformation.convertPlayerString(player)} coloco "${carName}" en la zona ${zone}`);
    }

    // Agrega en las notas del turno la colocaccion de una carta de arma
    static weaponOnBoardTurnNotes(player, carName, weaponName) {
        this.addTurnNote(`${DisplayCardInformation.convertPlayerString(player)} coloco "${weaponName}" en el carro ${carName}`);
    }

    // Crear un elemento P. Esto es para evitar escribir la clase del elemento P cada rato
    static createStatsText() {
        const pElement = document.createElement('p');
        pElement.classList.add("game-stat-text");
        return pElement;
        // Genuinamente no se porque esto no funciona...
        //return document.createElement("p").classList.add("game-stat-text");
    }
}