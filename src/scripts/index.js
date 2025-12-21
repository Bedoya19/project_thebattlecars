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
// Clase de acciones del tablero 
import { BoardClick } from "./board/boardActions.js";
//import { image } from "./../images/default_icons/default_cars.png";
import { Player1 } from "./players/player1.js";


// Display del mazo
const deckCards = document.getElementById("deck-cards");
const deckIcon = document.getElementById("deck-icon-current");
// Display de la informacion de una carta
const cardInformation = document.getElementById("card-selected-information");
const carsSquares = document.getElementsByClassName("card-board-car");

console.log(cardInformation);

// Imagenes default del deck
const deckDefaultIconsDir = {
    "cars": "src/images/default_icons/default_cars.png",
    "weapons": "src/images/default_icons/default_weapons.png",
    "materials": "src/images/default_icons/default_material.png"
    //"powers": "../images/default_icons/default_power.png"
}

// Creacion de las cartas de prueba
const carCard = await CarCard.loadCarObjectFromJSON("category1", 0);
const weaponCard = await WeaponCard.loadWeaponObjectFromJSON("category1", 0);
const materialCard = await MaterialCard.loadMaterialObjectFromJSON("category1", 0);
//const cards = [carCard, weaponCard, materialCard];
const decks = {
    "cars": [carCard, carCard, carCard],
    "weapons": [weaponCard, weaponCard, weaponCard],
    "materials": [materialCard, materialCard, materialCard]
}


DisplayCardsInDeck.showDeckOfCards(deckCards, decks["cars"], cardInformation);

deckIcon.addEventListener("click", () => { DisplayCardsInDeck.changeDeck(deckIcon, deckDefaultIconsDir, decks, deckCards, cardInformation) });

// Agrega funcionalidad a las casillas de carro
for (const carSquare of carsSquares) {
    //console.log(carsSquare);
    carSquare.addEventListener("click", () => { BoardClick.clickOnCarSquare(carSquare) });
}

//console.log(Player1.getCars());
//console.log(Player1.deleteFromDeck("cars", 1));
//console.log(Player1.getCars());
