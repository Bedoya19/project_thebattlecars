/*
En este script se va a manejar todo lo que tiene que ver con mostrar la informacion en el div de las estadisticas
del juego
Este script lo unico que va a hacer es actualizar el contenido de las notas del juego. Es decir las acciones que se hicieron durante el juego
*/
import { DisplayCardInformation } from "./displayCardInformation.js";
import { MainGame } from "../game/mainGame.js";
import { StateGame } from "../game/stateGame.js";
import { LoadConfig } from "../game/loadConfig.js";

//export class GameStatsDisplay {
export class GameNotesDisplay{
    // Reinicia el contenido de las notas de los turnos
    static restartTurnNotes() {
        document.getElementById("turn-notes-content").innerHTML = "";
    }
    static restartCurrentTurnNotes() {
        document.getElementById("current-turn").innerHTML = "";
    }
    static restartAllTurnNotes() {
        this.restartTurnNotes();
        this.restartCurrentTurnNotes();
    }

    // Metodo generico para agregar una anotacion en las notas del turno
    static addNote(message, selector) {
        const turnContent = document.getElementById(selector);
        const text = this.createStatsText();
        console.log(text);
        text.innerHTML = message;
        turnContent.appendChild(text);
    }

    // Agrega notas al contenido de las notas
    static addTurnNote(message) {
        this.addNote(message, "turn-notes-content");
    }
    // Agrega notas a la informacion del turno actual
    static addCurrentTurnNote(message) {
        this.addNote(message, "current-notes");
    }

    // Agrega en las notas del turno la colocacion de una carta de carro
    static carOnBoardTurnNotes(player, zone, carName) {
        this.addTurnNote(`${DisplayCardInformation.convertPlayerString(player)} coloco "${carName}" en la zona ${zone}`);
    }

    // Agrega en las notas del turno la colocaccion de una carta de arma
    static weaponOnBoardTurnNotes(player, carName, weaponName) {
        this.addTurnNote(`${DisplayCardInformation.convertPlayerString(player)} coloco "${weaponName}" en el carro "${carName}"`);
    }

    // Crear un elemento P. Esto es para evitar escribir la clase del elemento P cada rato
    static createStatsText() {
        const pElement = document.createElement('li');
        pElement.classList.add("game-stat-text", "turn-note");
        return pElement;
        // Genuinamente no se porque esto no funciona...
        //return document.createElement("p").classList.add("game-stat-text");
    }

    // Modifica las notas del turno actual
    static async createCurrentTurnNotes() {
        this.addNote(`
            ${this.newTurnNote()}
            ${await this.noteNitroAndPowerNormal()}
            `, "current-turn");
    }


    // Nota sobre la nueva ronda
    static newTurnNote() {
        return `Empieza el Turno ${StateGame.getTurn()}`;
    }

    // Nota sobre la cantidad de nitro y poder dado en modo normal
    static async noteNitroAndPowerNormal() {
        return `Se le otorga a cada jugador su respectivo poder y ${await LoadConfig.loadNitroPerTurn()} de nitro. Usenlos bien!`;
    }
}