/*
Clase general sobre algunos controles/acciones en especifico del mazo que no necesariamente deben de estar incluidos en
PlayerActions.
*/

export class DeckUtils {
    // Cuenta la cantidad de cartas en un mazo.
    static countCardsInDeck(deck) {
        const countCards = {}

        for (const card of deck) {
            if (card.name in countCards) {
                countCards[card.name] += 1;
            } else {
                countCards[card.name] = 1;
            }
        }
        return countCards
    }
    // Funcion del conteo de materiales
    // OJO! Que esto usa el deck de materiales
    // (Todavia no esta hecha para materiales infinitos, eso vendra despues)
    static countMaterialsInDeck(materialDeck) {
        const countCards = {};

        for (const card of materialDeck) {
            if (card.materialInQuestion in countCards) {
                countCards[card.materialInQuestion] += (1 * card.quantity);
            } else {
                countCards[card.materialInQuestion] = (1 * card.quantity);
            }
        }
        return countCards;
    }
}