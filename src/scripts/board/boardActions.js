import { Player1 } from "../players/player1.js";
import { DisplayCardsInDeck } from "../display/deckDisplay.js";
import { DisplayCardInformation } from "../display/displayCardInformation.js";
export class BoardClick {
    // Cuando se hace click en una casilla de carro
    static clickOnCarSquare(carSquare) {
        // Saco de aqui mismo los datos necesarios
        const cardGeneralInformation = document.getElementById("card-selected-general-information");
        //const squarePlayer = this.createImgInBoard(carSquare);
        const squarePlayer = carSquare.id.slice(0, 7);
        const cardInformation = document.getElementById("card-selected-information");
        this.removeValidCarSquare();
        try {
            // Consigue un guevo de valores del Document para hacer los cambios respectivos en la pagina
            // (no supe hacer algo mejor, para bien y para mal).
            // Primero se consigue los datos necesarios para revisar la disponiblidad de la casilla
            const currentPlayer = document.getElementById("deck").dataset.player;
            
            console.log(squarePlayer);
            const carBoardPlayer = carSquare.classList[2];
            console.log(carBoardPlayer);
            
            //console.log("Zone " + carSquare.id.slice(23));

            // Revisa que se pueda poner la carta:
            if (checkBoard.checkCarSquareAvailability(carBoardPlayer, currentPlayer, carSquare)[0]) {

                // El resto de los datos
                const currentDeck = document.getElementById("deck-icon-current");
                const deckCards = document.getElementById("deck-cards")
                const cardObj = JSON.parse(cardGeneralInformation.dataset.card);

                // Agrega la carta al tablero
                this.putCarOnBoard(carSquare, cardObj);
                // Elimina la carta del deck
                const deckIndex = cardGeneralInformation.dataset.cardId.slice(10);
                Player1.deleteFromDeck("cars", deckIndex);
                // Reinicia el mazo si se esta mostrando el deck de carros
                if (currentDeck.dataset.deck === "cars") {
                    console.log("reiniciar mazo...");
                    deckCards.innerHTML = "";
                    // Player1.getCards() tendra que cambiar cuando se agrege el jugador 2.
                    DisplayCardsInDeck.showDeckOfCards(deckCards, Player1.getCars(), cardInformation);
                }
                console.log("carta agregada exitosamente!");
                // Actualiza el div de informacion para mostrar la mas reciente carta puesta en el tablero
                DisplayCardInformation.displayCarCardInformationBoard(
                    cardInformation, 
                    carSquare, 
                    squarePlayer, 
                    cardObj.image, 
                    cardObj.name, 
                    cardObj.description
                );
            } else {
                // Yo de pendejo, tengo que mostrar la informacion de la carta, sin importar de que jugador sea
                // Igualmente toca revisar si esta vacio cuando esta en las cartas del otro jugador
                if (carSquare.dataset.name !== "undefined") {
                    console.log("Esta es una casilla vacia de carro del otro jugador.");
                }
                //console.log(checkBoard.checkCarSquareAvailability(carBoardPlayer, currentPlayer, carSquare)[1]);

                console.log(carSquare.firstElementChild.src);
                // Muestra la informacion del carro que se hizo clic
                // (Sorpresivamente funciona bien sin ninguna carta seleccionada)
                DisplayCardInformation.displayCarCardInformationBoard(
                    cardInformation, 
                    carSquare, 
                    squarePlayer, 
                    carSquare.firstElementChild.src, 
                    carSquare.dataset.name, 
                    carSquare.dataset.description
                );
            }
        }
        catch (e) {
            // Si hubo un error, lo mas probable es que fuera que el JSON estuviera undefined, entonces esto se muestra
            // (Esto en algun momento tambien se tendra que mostrar al usuario)
            //console.log(e, "Ninguna carta seleccionada! Mostrar aqui que la casilla es del jugador X de la zona Y");
            DisplayCardInformation.displayEmptyCarSquare(cardInformation, carSquare, squarePlayer);
        } 
    }

    // Cuando se hace click a una casilla de arma
    static clickOnWeaponSquare(weaponSquare) {
        const squarePlayer = weaponSquare.id.slice(0, 7);
        const squareZone = weaponSquare.id.slice(12,13);
        console.log(`${squarePlayer}, zona ${squareZone}`);
        //console.log(checkBoard.checkForCarCapacity(squarePlayer, squareZone));
        try {
            const currentPlayer = document.getElementById("deck").dataset.player;
            //const weaponBoardPlayer = weaponSquare.classList[0];
            console.log(checkBoard.checkWeaponSquareAvailability(weaponSquare, weaponSquare.id, currentPlayer));
        }
        catch (e) {
            // Si hubo un error, una vez mas, es probable que fuera el JSON de la carta estuviera indefinida. 
            console.log("Error", e);
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
        // Lo peor es que esto fue una buena idea, si es necesario agregar un dato mas, aqui se agrega con minima 
        // interferencia de algo.
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
        carSquare.dataset.description = carObj.description;
        /*
            Esta funcion nisiquiera esta para ahorrar codigo, es solo para no ser tan muralla de codigo clickOnCarSquare(), que en acciones
            ni siquiera es una funcion complicada
        */
    }
    // Muestra las casillas validas de carro para el jugador
    static showValidCarSquares(player, carSquares) {
        for (const carSquare of carSquares) {
            //console.log(carSquare);
            if ((carSquare.id.slice(0, 7) === player) && (carSquare.dataset.name === "undefined")) {
                //console.log(carSquare.dataset.name);
                console.log("Casilla permitida para el jugador");
                carSquare.classList.add("car-square-valid");
            }
        }
    }

    // Quita la seleccion de casillas validas
    static removeValidCarSquare() {
        // Sigue siendo una linea, pero TAL VEZ le tenga que agregar otras funciones.
        document.querySelectorAll(".car-square-valid").forEach(carSquare => carSquare.classList.remove("car-square-valid"));
    }

    // Muestra las casillas validas de arma para el jugador
    static showValidWeaponSquares(player) {
        // Consigue los carSquares con espacio
        const carSquares = document.getElementsByClassName("card-board-car")
        for (const carSquare of carSquares) {
            if ((carSquare.id.slice(0, 7) === player) && (carSquare.dataset.name !== "undefined")) {
                console.log(`Esta libre la zona ${carSquare.id.slice(23)}`);
                // Variables usados para showValidSquaresByZone()
                const squarePlayer = carSquare.id.slice(0, 7);
                const squareZone = carSquare.id.slice(23);
                const validZoneSquares = checkBoard.showValidSquaresByZone(carSquare, carSquare.id.slice(0, 7), carSquare.id.slice(23));
                if (!validZoneSquares) {
                    console.log("No tiene capacidad el carro!");
                    continue;
                }
                this.styleValidWeaponSquares(validZoneSquares);
            }
        }
        //console.log(carSquares);
    }

    // Pone el estilo de seleccion a las casillas de arma
    static styleValidWeaponSquares(weaponSquares) {
        weaponSquares.forEach(weaponSquare => weaponSquare.classList.add("weapon-square-valid"));
    }
    // Siempre se me olvida el numero del .slice(), entonces esto se estandariza
    // (lamento informar de que esta funcion por alguna razon hace que explote algo del codigo, y no tengo ni idea porque)
    /*
    static getPlayerFromId(divPlayer) {
        return divPlayer.id.slice(0, 7);
    }
    */
}

// Esta clase revisa si la carta seleccionada puede ser puesta en el tablero
// Las limitantes pueden incluir desde casilla de jugador incorrecta, a capacidad maxima del carro (tal vez vayan a haber otras despues)
class checkBoard {
    // Revisa que la casilla del jugador sea la correcta
    // Devuelve true si el jugador es el mismo que se menciona, false si no es asi
    static checkPlayer(boardPlayer, currentPlayer) {
        if (boardPlayer.indexOf(currentPlayer) !== -1) {
            return true;
        }
        return false;
    }
    // Revisa que la casilla de carro no este ocupada
    // Devuelve True si esta vacia la casilla, false si esta ocupada
    static checkCarSpace(carSquare) {
        console.log(carSquare);
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
        return [true, "La casilla esta disponible para colocar una carta de carro"];
    }

    // Revisa si la casilla de arma esta vacia
    // Devuelve true si esta vacia, false si esta ocupada
    static checkWeaponSpace(weaponSquare) {
        if (weaponSquare.dataset.name === "undefined") {
            return true;
        }
        return false;
    }
    // Revisa si existe por lo menos una carta de carro puesta en el tablero
    // Devuelve true si efectivamente hay una carta de arma en el tablero (independiente de su disponibilidad)
    // false si no existe ninguna carta puesta en el tablero
    static checkForExistingCarsForWeapon(player) {
        if (this.getCurrentCarsInBoard(player).length !== 0) {
            return true;
        } else {
            return false;
        }
        /*
        const carSquaresPlayer = document.getElementsByClassName(`card-board-car-${player}`);
        for (const carSquare of carSquaresPlayer) {
            if (!this.checkCarSpace(carSquare)) {
                // Por lo menos existe un carro en el jugador deseado, puede continuar
                return true;
            }
        }
        // Si llego a este punto es que no existe carro en el tablero, entonces debe de devolver false
        return false;*/
    }

    // Devuelve los carros actuales en el tablero
    // Esto sera usado para revisar disponiblidad para las armas, pero puede ser de gran ayuda para despues
    static getCurrentCarsInBoard(player) {
        const carSquaresPlayer = document.getElementsByClassName(`card-board-car-${player}`);
        return Array.from(carSquaresPlayer).filter(carSquare => {
            return carSquare.dataset.health !== "undefined";
        })
    }

    // Revisa si la zona con el carro puede tener mas armas
    // Si tiene casillas disponibles, las devuelve. Sino, devuelve un false
    static showValidSquaresByZone(carSquare, player, zone) {
        console.log(carSquare.dataset.capacity);
        if (!this.checkForCarCapacity(player, zone)) {
            // Se le tiene que decir al usuario
            return false;
        }
        /*
        if (carSquare.dataset.capacity <= 0) {
            // Esto se le tiene que avisar al usuario
            //console.log("No tiene capacidad el carro!");
            return false;
        }*/
        console.log(`El carro en la zona ${zone} tiene capacidad`);
        const weaponSquares = document.getElementsByClassName(`card-board-weapon-${player}-zone${zone}`);
        //console.log(Array.from(weaponSquares));
        // Devuelve las casillas que estan vacias.
        return Array.from(weaponSquares).filter(weaponSquare => {
            return weaponSquare.dataset.name === "undefined";
        });
        //console.log(weaponSquares);
    }

    // Solamente revisa si en donde se hizo click (en la casilla de arma) se puede colocar un arma
    static checkForCarCapacity(player, zone) {
        console.log(zone);
        // Conseguir el jugador y zona del id de weaponSquare
        const carSquare = document.getElementById(`${player}-zone${zone}-card-car-${zone}`);
        if (carSquare.dataset.capacity === "undefined") {
            // No existe carta de carro, igualmente no se puede poner
            return false;
        } else if (carSquare.dataset.capacity <= 0) {
            // Otra vez, se tiene que decir al usuario
            console.log("no tiene capacidad el carro!");
            return false;
        }
        // Irrelevante de la cantidad de capacidad faltante, por lo menos tiene.
        return true;
    }

    // Revisa que si se pueda poner una carta de arma en el tablero en una casilla en especifico
    static checkWeaponSquareAvailability(weaponSquare, boardPlayer, currentPlayer) {
        if (!this.checkPlayer(boardPlayer, currentPlayer)) {
            return [false, 'La casilla es del otro jugador'];
        }
        if (!this.checkWeaponSpace(weaponSquare)) {
            return [false, "La casilla ya esta ocupada por otro carro"];
        }
        // weaponSquare.id.slice(12, 13) = numero de la zona
        if (!this.checkForCarCapacity(currentPlayer, weaponSquare.id.slice(12, 13))) {
            return [false, "El carro no tiene suficiente capacidad para otra arma"];
        }
        // Si todo sale bien, la carta se puede colocar en la casilla
        return [true, "La casilla esta disponible para colocar una carta de arma"]
    }
}