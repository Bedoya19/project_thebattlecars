// Script de mostrar las cartas en el deck.

// Funcion de lo que hace cuando se hace click en una carta (temporal para pruebas)
const clickOnDeckCard = (card) => {
    console.log(`Clicked on ${card.name}`)
}


// Case de mostrar las cartas en el Display y todo lo que hace
export class DisplayCardsInDeck {
    // Mostrar la carta en el deck, y le agrega funcionalidad
    static displayCardOnDeck(divDeck, card) {
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

    // Muestra todas las cartas de un arreglo de cartas
    static showDeckOfCards(divDeck, cards) {
        if (cards.length !== 0) {
            for (const card of cards) {
                DisplayCardsInDeck.displayCardOnDeck(divDeck, card);
            }
        } else {
            // Esto tendra que avisarle al usuario en pantalla, pero eso vendra despues
            console.log("No existen cartas en este mazo!");
        }
    }
}