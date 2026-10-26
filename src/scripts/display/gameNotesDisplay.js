/*
En este script se va a manejar todo lo que tiene que ver con mostrar la informacion en el div de las estadisticas
del juego
Este script lo unico que va a hacer es actualizar el contenido de las notas del juego. Es decir las acciones que se hicieron durante el juego
*/
import { DisplayCardInformation } from "./displayCardInformation.js";
import { MainGame } from "../game/mainGame.js";
import { StateGame } from "../game/stateGame.js";
import { LoadConfig } from "../game/loadConfig.js";
import { AttackMessages } from "../log/attackMessages.js";
import { NitroMessages } from "../log/nitroMessages.js";

// Importar las funciones del guardado de notas en un lugar establecido.
import { addNote } from "../log/gameNotesLog.js";
import { getNotes } from "../log/gameNotesLog.js";

//export class GameStatsDisplay {
export class GameNotesDisplay{
    // Estos metodos antes eran funciones en el index (por razones galaticas)
    static clickAllGameNotesButton(gameNotesWindows) {
        const gameNotesBody = document.querySelector(".dialog-gamenotes-body");
        const notas = getNotes();
        console.log(notas);

        gameNotesBody.innerHTML = (notas !== "" ? notas : "No existen notas para mostrar, eso significa que probablemente todavia no se ha hecho ninguna accion en la partida para anotar, y eso queire decir acaba de empezar la partida. ¡Para de perder el tiempo y hora de ir con todo lo que tienes!");
        gameNotesWindows.showModal();
    }

    static closeAnimationExecute(gameNotesWindows) {
        gameNotesWindows.classList.add("closing");
    }

    static cancelGameNotes(e, gameNotesWindows) {
        e.preventDefault();
        this.closeAnimationExecute(gameNotesWindows);
    }

    static closeGameNotesWindows(e, gameNotesWindows) {
        if (e.animationName === "dialogDisappear") {
            gameNotesWindows.classList.remove("closing");
            gameNotesWindows.close();
        }
    }

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
    static addTurnNote(message, save = true) {
        // Guarda la nota en lugar establecido.
        save ? addNote(message) : undefined;
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

    // Crea una nueva nota sobre un ataque
    static addAttackActionNote(carAttackerSquare, carAttackedSquare, weaponSquare, charge, attack, previousCarHealth, afterCarHealth) {
        if (afterCarHealth <= 0) {
            this.addTurnNote(AttackMessages.carDestroyedMessage(carAttackedSquare, charge, attack));
        } else {
            this.addTurnNote(AttackMessages.carAttacks(carAttackerSquare, carAttackedSquare, weaponSquare, charge, attack, previousCarHealth, afterCarHealth));
        }
    }

    // Crea una nota sobre la activacion del nitro
    static addNitroNote(player, carSquare, carSquareInst) {
        this.addTurnNote(NitroMessages.nitroActivated(player, carSquare, carSquareInst));
    }

    // Nota sobre carta de arma sacada
    static addDrawCard(player, cardType) {
        // Me da pereza por ahora traducir al español weapons y materials...
        this.addTurnNote(`${DisplayCardInformation.convertPlayerString(player)} saco una carta de ${cardType} de su pila`);
    }

    // Cuanto se sacan multiples cartas a la vez.
    static addDrawCards(player, cardType, quantity) {
        this.addTurnNote(`${DisplayCardInformation.convertPlayerString(player)} saco ${quantity} cartas de ${cardType} de su pila`);
    }

    // Nota sobre mejora de la carta
    static addWeaponUpgrade(player, weaponName, weaponLevel, carName) {
        this.addTurnNote(`${DisplayCardInformation.convertPlayerString(player)} mejoro su "${weaponName}" en el carro "${carName}" a nivel ${weaponLevel}`)
    }

    // Nota sobre ultimo turno
    static addLastTurn(isInTie) {
        console.log(isInTie);
        const message = `<strong>¡ULTIMO TURNO!</strong> ${isInTie ? "¡La partida va a acabar en empate! ¡Es ahora o nunca!" : ""}`;
        this.addTurnNote(message, false);
    }
}
