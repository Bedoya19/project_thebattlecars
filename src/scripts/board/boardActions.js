import { Player1 } from "../players/player1.js";
import { DisplayCardsInDeck } from "../display/deckDisplay.js";
import { DisplayCardInformation } from "../display/displayCardInformation.js";
export class BoardClick {
    static clickOnCarSquare(carSquare) {
        // Saco de aqui mismo los datos necesarios
        const cardGeneralInformation = document.getElementById("card-selected-general-information");
        try {
            // Consigue un guevo de valores del Document para hacer los cambios respectivos en la pagina
            // (no supe hacer algo mejor, para bien y para mal).
            // Primero se consigue los datos necesarios para revisar la disponiblidad de la casilla
            const currentPlayer = document.getElementById("deck").dataset.player;
            const carBoardPlayer = carSquare.classList[2];
            
            //console.log("Zone " + carSquare.id.slice(23));

            // Revisa que se pueda poner la carta:
            if (checkBoard.checkCarSquareAvailability(carBoardPlayer, currentPlayer, carSquare)[0]) {

                // El resto de los datos
                const currentDeck = document.getElementById("deck-icon-current");
                const deckCards = document.getElementById("deck-cards")
                const cardInformation = document.getElementById("card-selected-information");
                const cardObj = JSON.parse(cardGeneralInformation.dataset.card);
                //

                // Agrega la carta al tablero
                this.putCarOnBoard(carSquare, cardObj);
                // Elimina la carta del deck
                const deckIndex = cardGeneralInformation.dataset.cardId.slice(10);
                Player1.deleteFromDeck("cars", deckIndex);
                // Reinicia el mazo si se esta mostrando el deck de carros
                if (currentDeck.dataset.deck === "cars") {
                    console.log("reiniciar mazo...");
                    deckCards.innerHTML = "";
                    DisplayCardsInDeck.showDeckOfCards(deckCards, Player1.getCars(), cardInformation);
                }
                console.log("carta agregada exitosamente!");
                DisplayCardInformation.displayCarCardInformationBoard(cardInformation, carSquare, currentPlayer, cardObj.image, cardObj.name, cardObj.description)
            } else {
                // Yo de pendejo, tengo que mostrar la informacion de la carta, sin importar de que jugador sea
                // Igualmente toca revisar si esta vacio cuando esta en las cartas del otro jugador
                if (carSquare.dataset.name !== "undefined") {
                    console.log("Esta es una casilla vacia de carro del otro jugador.");
                }
                //console.log(checkBoard.checkCarSquareAvailability(carBoardPlayer, currentPlayer, carSquare)[1]);

                const cardInformation = document.getElementById("card-selected-information");
                console.log(carSquare.firstElementChild.src);
                DisplayCardInformation.displayCarCardInformationBoard(
                    cardInformation, 
                    carSquare, 
                    currentPlayer, 
                    carSquare.firstElementChild.src, 
                    carSquare.dataset.name, 
                    carSquare.dataset.description
                );
            }
        }
        catch (e) {
            // Si hubo un error, lo mas probable es que fuera que el JSON estuviera undefined, entonces esto se muestra
            // (Esto en algun momento tambien se tendra que mostrar al usuario)
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

    // Poner una carta de carro en el tablero, con sus respecitvos valores
    // (!OJO!, esta funcion solo permite la version JSON de los datos del carro, NO un objeto de la clase)
    static putCarOnBoard(carSquare, carObj) {
        carSquare.appendChild(this.createImgInBoard(carObj));
        carSquare.dataset.name = carObj.name;
        carSquare.dataset.health = carObj.health;
        carSquare.dataset.maxHealth = carObj.health;
        carSquare.dataset.capacity = carObj.capacity;
        carSquare.dataset.maxCapacity = carObj.capacity;
        /* 
        Este valor en especifico (data-nitro) es el que determina si el nitro esta activado o no.
        Si esta en 0, es que esta desactivado, si esta en otro numero, significa que esta activado y es cuantas rondas faltan para desactivarse
        */
        carSquare.dataset.nitro = 0;
        carSquare.dataset.nitroQuantity = carObj.nitro[0];
        carSquare.dataset.nitroDuration = carObj.nitro[1];
        carSquare.dataset.nitroResistance = carObj.nitroBuff[0];
        carSquare.dataset.nitroAttack = carObj.nitroBuff[1];
        carSquare.dataset.attBuff = carObj.attBuff;
        /*
            Esta funcion nisiquiera esta para ahorrar codigo, es solo para no ser tan muralla de codigo clickOnCarSquare(), que en acciones
            ni siquiera es una funcion complicada
        */
    }
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