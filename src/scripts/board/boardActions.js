export class BoardClick {
    static clickOnCarSquare(carSquare) {
        // Saco de aqui mismo los datos necesarios
        const cardGeneralInformation = document.getElementById("card-selected-general-information");
        try{
            const cardObj = JSON.parse(cardGeneralInformation.dataset.card);
            const currentPlayer = document.getElementById("deck").dataset.player;
            console.log(cardObj.type);

            const carBoardPlayer = carSquare.classList[2];
            const carBoardZone = carSquare.classList[3];

            console.log(carBoardPlayer, carBoardZone, currentPlayer);
            console.log(checkBoard.checkCarSquareAvailability(carBoardPlayer, currentPlayer, carSquare));
        }
        catch (e) {
            // Si hubo un error, lo mas probable es que fuera que el JSON estuviera undefined, entonces esto se muestra
            console.log("Ninguna carta seleccionada! Mostrar aqui que la casilla es del jugador X de la zona Y");
        }
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