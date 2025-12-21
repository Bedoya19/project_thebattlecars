import { DisplayCardInformation } from "./displayCardInformation.js";
import { CarCard } from "../models/cards/CarCard.js";

// Script de mostrar las cartas en el deck.

// Funcion de lo que hace cuando se hace click en una carta (temporal para pruebas)
const clickOnDeckCard = (divInformation, card) => {
    //console.log(`Clicked on ${card.name}`)
    DisplayCardInformation.displayInformationOnDeck(divInformation, card);
}

export class BoardClick {
    static clickOnCarSquare(carSquare) {
        // Saco de aqui mismo los datos necesarios
        const cardGeneralInformation = document.getElementById("card-selected-general-information");
        try{
            const cardObj = JSON.parse(cardGeneralInformation.dataset.card);
            console.log(cardObj.type);
        }
        catch (e) {
            // Si hubo un error, lo mas probable es que fuera que el JSON estuviera undefined, entonces esto se muestra
            console.log("Ninguna carta seleccionada! Mostrar aqui que la casilla es del jugador X de la zona Y");
        }
        //console.log(carSquare.classList);
    }
}


// Case de mostrar las cartas en el Display y todo lo que hace
export class DisplayCardsInDeck {
    // Mostrar la carta en el deck, y le agrega funcionalidad
    static displayCardOnDeck(divDeck, card, divInformation) {
        let quantityCardsInDeck = document.querySelectorAll(".deck-card").length;

        // Crea un div de la carta
        const divCardInDeck = document.createElement("div");
        divCardInDeck.setAttribute("id", `deck-card-${quantityCardsInDeck}`);
        divCardInDeck.setAttribute("class", "deck-card")
        divCardInDeck.insertAdjacentHTML("beforeend", 
            `<img src="${card.image}" alt="card-${quantityCardsInDeck}">`
        )
        divCardInDeck.addEventListener("click", () => {clickOnDeckCard(divInformation, card)});

        // La agrega al mazo.
        divDeck.appendChild(divCardInDeck);
    }

    // Muestra todas las cartas de un arreglo de cartas
    static showDeckOfCards(divDeck, cards, divInformation) {
        if (cards.length !== 0) {
            for (const card of cards) {
                DisplayCardsInDeck.displayCardOnDeck(divDeck, card, divInformation);
            }
        } else {
            // Esto tendra que avisarle al usuario en pantalla, pero eso vendra despues
            console.log("No existen cartas en este mazo!");
        }
    }

    static changeDeck(deckIconImage, decksDefaultIcons, decks, divDeck, cardInformation) {
        // Consigue el index actual del deck que se esta actualmente
        const decksTypeList = Object.keys(decksDefaultIcons);
        console.log(deckIconImage.dataset.deck);
        let deckTypeIndex = decksTypeList.indexOf(deckIconImage.dataset.deck);

        // Si el index del tipo del deck llega a la longitud maxima permitida, le da vuelta
        console.log(deckTypeIndex);
        if (deckTypeIndex === decksTypeList.length - 1) {
            deckTypeIndex = 0;
        } else {
            ++deckTypeIndex;
        }
        console.log(deckTypeIndex);

        // Reinicia el deck de cartas
        divDeck.innerHTML = "";
        // Muestra el deck resultante
        // Uso mucho esto, y es mucho mas sencillo de entender que "decksTypeList[deckTypeIndex]"
        const newDeck = decksTypeList[deckTypeIndex];
        //console.log(newDeck);
        this.showDeckOfCards(divDeck, decks[newDeck], cardInformation);
        // Cambia la informacion en el icono
        deckIconImage.dataset.deck = newDeck;
        console.log(decksDefaultIcons[newDeck]);
        deckIconImage.setAttribute("src", decksDefaultIcons[newDeck]);
    }
}