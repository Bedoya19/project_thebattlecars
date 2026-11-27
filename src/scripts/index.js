// THE BATTLE CARS
// Proyecto de pratica de programacion en la web
// Hecho por Bedoya1905
// Alpha v0.3: Battle Extra

// Importar Enumso de Categoria, TypeCard y ValidateEnums
import { Category } from "./models/constants/enums.js";
import { TypeCard } from "./models/constants/enums.js";
import { ValidateEnums } from "./models/constants/enums.js";
// Importar subclases de cartas
import { Card } from "./models/cards/Card.js" // Clase madre de Carta
import { CarCard } from "./models/cards/CarCard.js"; // Subclase de Car
import { WeaponCard } from "./models/cards/WeaponCard.js" // Subclase de Weapon
import { MaterialCard } from "./models/cards/MaterialCard.js"; // Subclase de Material
// Clase de display en el mazo
import { DisplayCardsInDeck } from "./display/deckDisplay.js";
import { DisplayCardInformation } from "./display/displayCardInformation.js";
// Clase de acciones del tablero
import { BoardClick } from "./board/boardActions.js";
import { board } from "./board/boardData/boardManager.js";
//import { image } from "./../images/default_icons/default_cars.png";

import { GameNotesDisplay } from "./display/gameNotesDisplay.js";
// Clase de las operaciones del juego
import { MainGame } from "./game/mainGame.js";

// Clase que muesta en pantalla la informacion general del juego
import { GameInformationDisplay } from "./display/gameInformationDisplay.js";
import { GameValuesDisplay } from "./display/gameValuesDisplay.js";
import { PlayerActions } from "./players/playerActions.js";

// Funcion sobre las notas del juego
import { getNotes } from "./log/gameNotesLog.js";
import { StateGame } from "./game/stateGame.js";
import { chargeToNextRound } from "./game/chargeConfig/chargeMethodFactory.js";


// Display del mazo
const deckCards = document.getElementById("deck-cards");
const deckIcon = document.getElementById("deck-icon-current");
// Display de la informacion de una carta
const cardInformation = document.getElementById("card-selected-information");
// Todas las casillas de carro en el tablero, sin importar jugador
const carsSquares = document.getElementsByClassName("card-board-car");
const weaponSquares = document.getElementsByClassName("card-board-weapon");

// Botones del juego
const deselectButton = document.getElementById("deselect-button");
const nextRoundButton = document.getElementById("next-round-button");
const addCardButton = document.getElementById("button-add-card-to-deck");
const deckInformationButton = document.getElementById("button-deck-info");
console.log(cardInformation);

// Imagenes default del deck
const deck = document.getElementById("deck");

// Creacion de las cartas de prueba
const carCard = await CarCard.loadCarObjectFromJSON("category1", 0);
const weaponCard = await WeaponCard.loadWeaponObjectFromJSON("category1", 0);
const materialCard = await MaterialCard.loadMaterialObjectFromJSON("category1", 0);
//const cards = [carCard, weaponCard, materialCard];

// Mostrar las cartas del deck actual al puro principio de todo
DisplayCardsInDeck.showDeckOfCards(deckCards, PlayerActions.getDeckFromPlayer("player1", "cars"), cardInformation);

//deckIcon.addEventListener("click", () => { DisplayCardsInDeck.changeDeck(deckIcon, deckDefaultIconsDir, decks, deckCards, cardInformation) });
deckIcon.addEventListener("click", () => { DisplayCardsInDeck.changeDeckPlayer(deckIcon, StateGame.getCurrentPlayer(), deckCards, cardInformation) });

// Montar funcionalidad a la ventana propia de las notas
// Ventana y botones
const gameNotesWindows = document.getElementById("dialog-gamenotes");
const gameNotesButton = document.getElementById("see-notes-button");
const gameNotesCloseButton = document.getElementById("dialog-gamenotes-close");
// De verdad no tengo ni idea como carajos esto paso de largo de parte mia y de tantas IAs que han visto el codebase
// Esto es logica de funcionamiento EN EL INDEX, como sucedio esto ??? Porque nadie lo corigio ???
// Todo el codigo que estaba en este addEventListiener fue movido a otro lado
gameNotesButton.addEventListener("click", () => {
    GameNotesDisplay.clickAllGameNotesButton(gameNotesWindows);
});

// Funciones de animacion de cerrar la ventana
// (porque carajos esto estaba en el index???)
/*
function closeAnimationExecute() {
    gameNotesWindows.classList.add("closing");
}*/

gameNotesCloseButton.addEventListener("click", () => {
    GameNotesDisplay.closeAnimationExecute(gameNotesWindows);
});
gameNotesWindows.addEventListener("cancel", (e) => {
    GameNotesDisplay.cancelGameNotes(e, gameNotesWindows);
})
gameNotesWindows.addEventListener("animationend", (e) => {
    if (e.animationName === "dialogDisappear") {
        gameNotesWindows.classList.remove("closing");
        gameNotesWindows.close();
    }
})

// Agrega funcionalidad a las casillas de carro
for (const carSquare of carsSquares) {
    //console.log(carsSquare);
    //carSquare.addEventListener("click", () => { BoardClick.clickOnCarSquare(carSquare) });
    carSquare.addEventListener("click", await BoardClick.clickOnCarSquare);
}

// Agrega funcionalidad a casillas de arma
for (const weaponSquare of weaponSquares) {
    //console.log(weaponSquare);
    weaponSquare.addEventListener("click", BoardClick.clickOnWeaponSquare);
}

deselectButton.addEventListener("click", () => { DisplayCardInformation.deselectCardInformation(cardInformation) })
GameNotesDisplay.restartTurnNotes();

nextRoundButton.addEventListener("click", () => { MainGame.goToNextRound()});

//PlayerActions.generateChargeForPlayer("player1");
chargeToNextRound("player1");
GameInformationDisplay.updateAllInformation();
GameValuesDisplay.updateAllValues("player1");

addCardButton.addEventListener("click", () => {
    PlayerActions.getCardFromPile();
})

deckInformationButton.addEventListener("click", () => {
    DisplayCardInformation.getCurrentDeckInformation();
})

console.log(board);

//console.log(Player1.getCars());
//console.log(Player1.deleteFromDeck("cars", 1));
//console.log(Player1.getCars());
