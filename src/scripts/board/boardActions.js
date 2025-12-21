import { Player1 } from "../players/player1.js";
import { DisplayCardsInDeck } from "../display/deckDisplay.js";

export class BoardClick {
    static clickOnCarSquare(carSquare) {
        // Saco de aqui mismo los datos necesarios
        const cardGeneralInformation = document.getElementById("card-selected-general-information");
        try{
            const cardObj = JSON.parse(cardGeneralInformation.dataset.card);
            const currentPlayer = document.getElementById("deck").dataset.player;
            const currentDeck = document.getElementById("deck-icon-current");
            const deckCards = document.getElementById("deck-cards")
            const cardInformation = document.getElementById("card-selected-information");
            console.log(cardObj.type);

            const carBoardPlayer = carSquare.classList[2];
            const carBoardZone = carSquare.classList[3];

            //console.log(carBoardPlayer, carBoardZone, currentPlayer);
            //console.log(checkBoard.checkCarSquareAvailability(carBoardPlayer, currentPlayer, carSquare));
            
            // Revisa que se pueda poner la carta:
            if (checkBoard.checkCarSquareAvailability(carBoardPlayer, currentPlayer, carSquare)[0]) {
                // Agrega la carta al tablero
                carSquare.appendChild(this.createImgInBoard(cardObj));
                carSquare.dataset.health = cardObj.health;
                carSquare.dataset.maxHealth = cardObj.health;
                carSquare.dataset.capacity = cardObj.capacity;
                carSquare.dataset.maxCapacity = cardObj.capacity;
                carSquare.dataset.nitro = 0;
                carSquare.dataset.nitroQuantity = cardObj.nitro[0];
                carSquare.dataset.nitroDuration = cardObj.nitro[1];
                carSquare.dataset.nitroResistance = cardObj.nitroBuff[0];
                carSquare.dataset.nitroAttack = cardObj.nitroBuff[1];

                console.log(cardGeneralInformation.dataset.cardId);
                const deckIndex = cardGeneralInformation.dataset.cardId.slice(10);
                Player1.deleteFromDeck("cars", deckIndex);
                if (currentDeck.dataset.deck === "car") {
                    deckCards.innerHTML = "";
                    DisplayCardsInDeck.showDeckOfCards(deckCards, Player1.getCars(), cardInformation);
                }
                console.log("carta agregada exitosamente!");
            } else {
                console.log(checkBoard.checkCarSquareAvailability(carBoardPlayer, currentPlayer, carSquare)[1]);
            }
        }
        catch (e) {
            // Si hubo un error, lo mas probable es que fuera que el JSON estuviera undefined, entonces esto se muestra
            console.log(e, "Ninguna carta seleccionada! Mostrar aqui que la casilla es del jugador X de la zona Y");
        }
    }

    // Pone una imagen en una casilla
    // (tal vez poner en una futura clase de estandarizar elementos HTML)
    static createImgInBoard(carObj) {
        const cardImage = document.createElement("img");
        // Lo mas probable es que esto cambie despues
        cardImage.src = `${carObj.image}`;
        cardImage.classList.add("image-board");
        return cardImage;
    }

    // 
}

// Esta clase revisa si la carta seleccionada puede ser puesta en el tablero
// Las limitantes pueden incluir desde casilla de jugador incorrecta, a capacidad maxima del carro (tal vez allan otras despues)
class checkBoard {
    // Revisa que la casilla del jugador sea la correcta
    static checkPlayer(boardPlayer, currentPlayer) {
        if (boardPlayer.indexOf(currentPlayer) !== -1) {
            return true;
        }
        return false;
    }
    // Revisa que la casilla de carro no este ocupada
    static checkCarSpace(carSquare) {
        if (carSquare.dataset.health === "undefined") {
            return true;
        }
        return false;
    }
    // Junta las dos anteriores, revisa si se puede poner una carta de carro en la casilla seleccionada del tablero
    // Devuelve el error exacto de lo que esta mal, si detecta que no puede colocar el carro
    static checkCarSquareAvailability(boardPlayer, currentPlayer, carSquare) {
        if (!this.checkPlayer(boardPlayer, currentPlayer)) {
            return [false, "La casilla es del otro jugador!"];
        }
        if (!this.checkCarSpace(carSquare)) {
            return [false, "La casilla ya esta ocupada por otro carro"];
        }
        return [true, "La casilla esta disponible para ser usada por una carta de carro"];
    }
}