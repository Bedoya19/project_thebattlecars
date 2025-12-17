// THE BATTLE CARS
// Proyecto de pratica de programacion en la web
// Hecho por Bedoya1905
// Alpha v0.0.01

// Importar Enumso de Categoria, TypeCard y ValidateEnums
import { Category } from "./models/constants/enums.js";
import { TypeCard } from "./models/constants/enums.js";
import { ValidateEnums } from "./models/constants/enums.js";


//console.log(Symbol.keyFor(Category.CATEGORY1));

// Importar cartas
// Clase madre de Carta
import { Card } from "./models/cards/Card.js"
// Subclase de Car
import { CarCard } from "./models/cards/CarCard.js";
// Subclase de Weapon
import { WeaponCard } from "./models/cards/WeaponCard.js"
// Subclase de Material
import { MaterialCard } from "./models/cards/MaterialCard.js";

// Display del mazo
const deckCards = document.getElementById("deck-cards");


// Creacion de las cartas de prueba
const carCard = await CarCard.loadCarObjectFromJSON("category1", 0);
const weaponCard = await WeaponCard.loadWeaponObjectFromJSON("category1", 0);
const materialCard = await MaterialCard.loadMaterialObjectFromJSON("category1", 0);
const cards = [carCard, weaponCard, materialCard];

// Funcion de lo que hace cuando se hace click en una carta (temporal para pruebas)
const clickOnDeckCard = (card) => {
    console.log(`Clicked on ${card.name}`)
}

// Este va a ser un display general, mientras se prueban cosas.
const displayCardOnDeck = (card) => {
    let quantityCardsInDeck = document.querySelectorAll(".deck-card").length;

    // Crea un div de la carta
    const divCardInDeck = document.createElement("div");
    divCardInDeck.setAttribute("id", `deck-card-${quantityCardsInDeck}`);
    divCardInDeck.setAttribute("class", "deck-card")
    divCardInDeck.insertAdjacentHTML("beforeend", 
        `<img src="${card.image}" alt="card-${quantityCardsInDeck}">`
    )
    divCardInDeck.addEventListener("click", () => {clickOnDeckCard(card)});

    // La agrega al mazo.
    deckCards.appendChild(divCardInDeck);
}

//displayCardOnDeck(carCard);
//displayCardOnDeck(weaponCard);

// Mostrar todas las cartas de un array al div del deck.
const showDeckOfCards = (cards) => {
    if (cards.length !== 0) {
        for (const card of cards) {
            displayCardOnDeck(card);
        }
    } else {
        // Esto tendra que avisarle al usuario en pantalla, pero eso vendra despues
        console.log("No existen cartas en este mazo!");
    }
    
}
showDeckOfCards(cards);

