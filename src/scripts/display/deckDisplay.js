// Script de mostrar las cartas en el deck.

// Funcion de lo que hace cuando se hace click en una carta (temporal para pruebas)
const clickOnDeckCard = (card) => {
    console.log(`Clicked on ${card.name}`)
}


// Este va a ser un display general, mientras se prueban cosas.
export const displayCardOnDeck = (divDeck, card) => {
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
    divDeck.appendChild(divCardInDeck);
}

// Mostrar todas las cartas de un array al div del deck.
export const showDeckOfCards = (divDeck, cards) => {
    if (cards.length !== 0) {
        for (const card of cards) {
            displayCardOnDeck(divDeck, card);
        }
    } else {
        // Esto tendra que avisarle al usuario en pantalla, pero eso vendra despues
        console.log("No existen cartas en este mazo!");
    }
    
}