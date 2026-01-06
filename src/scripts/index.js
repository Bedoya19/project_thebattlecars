// THE BATTLE CARS
// Proyecto de pratica de programacion en la web
// Hecho por Bedoya1905
// Alpha v0.0.01

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
//import { image } from "./../images/default_icons/default_cars.png";
import { Player1 } from "./players/player1.js";
import { GameNotesDisplay } from "./display/gameNotesDisplay.js";
// Clase de las operaciones del juego
import { MainGame } from "./game/mainGame.js";

// Clase que muesta en pantalla la informacion general del juego
import { GameInformationDisplay } from "./display/gameInformationDisplay.js";
import { GameValuesDisplay } from "./display/gameValuesDisplay.js";


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
console.log(cardInformation);

// Imagenes default del deck
const deck = document.getElementById("deck");

// Creacion de las cartas de prueba
const carCard = await CarCard.loadCarObjectFromJSON("category1", 0);
const weaponCard = await WeaponCard.loadWeaponObjectFromJSON("category1", 0);
const materialCard = await MaterialCard.loadMaterialObjectFromJSON("category1", 0);
//const cards = [carCard, weaponCard, materialCard];
//const decks = Player1.getDecks();


//DisplayCardsInDeck.showDeckOfCards(deckCards, decks["cars"], cardInformation);

//deckIcon.addEventListener("click", () => { DisplayCardsInDeck.changeDeck(deckIcon, deckDefaultIconsDir, decks, deckCards, cardInformation) });
deckIcon.addEventListener("click", () => { DisplayCardsInDeck.changeDeckPlayer(deckIcon, deck.dataset.player, deckCards, cardInformation) });

// Agrega funcionalidad a las casillas de carro
for (const carSquare of carsSquares) {
    //console.log(carsSquare);
    carSquare.addEventListener("click", () => { BoardClick.clickOnCarSquare(carSquare) });
}

// Agrega funcionalidad a casillas de arma
for (const weaponSquare of weaponSquares) {
    //console.log(weaponSquare);
    weaponSquare.addEventListener("click", () => { BoardClick.clickOnWeaponSquare(weaponSquare) });
}

deselectButton.addEventListener("click", () => { DisplayCardInformation.deselectCardInformation(cardInformation) })
GameNotesDisplay.restartTurnNotes();

nextRoundButton.addEventListener("click", () => { MainGame.goToNextRound()});

GameInformationDisplay.updateAllInformation();
GameValuesDisplay.updateAllValues("player1");

//console.log(Player1.getCars());
//console.log(Player1.deleteFromDeck("cars", 1));
//console.log(Player1.getCars());
