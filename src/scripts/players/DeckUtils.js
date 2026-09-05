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

    // Devuelve un array de las cartas de material ordenadas por cantidad
    static orderMaterialsByQuantity(materialDeck) {
        const highestToLowestCards = materialDeck.toSorted((card1, card2) =>  card2.quantity - card1.quantity);
        return highestToLowestCards;
    }

    static selectMaterialCardsToRemove(deck, material, needed) {
        const candidates = deck
        .map((card, index) => ({ card, index }))
        .filter(({ card }) => card.materialInQuestion === material)
        .sort((a, b) => b.card.quantity - a.card.quantity);

        const indicesToRemove = [];
        let accumulated = 0;

        for (const { card, index } of candidates) {
            if (accumulated >= needed) break;
            indicesToRemove.push(index);
            accumulated += card.quantity;
        }

        return indicesToRemove;
    }
}