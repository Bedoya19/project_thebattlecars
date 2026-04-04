import { Player1 } from "../players/player1.js";
import { Player2 } from "../players/player2.js";
import { PlayerActions } from "../players/playerActions.js";
import { DisplayCardsInDeck } from "../display/deckDisplay.js";
import { DisplayCardInformation } from "../display/displayCardInformation.js";
import { GameNotesDisplay } from "../display/gameNotesDisplay.js";
import { Attack } from "../battle/attack.js";
import { AttackValues } from "../battle/attackValues.js";
import { DisplayMessageBoxes } from "../display/DisplayMessageBoxes.js";

import { MainGame } from "../game/mainGame.js";
import { WeaponCard } from "../models/cards/WeaponCard.js";

export class BoardClick {
    // Cuando se hace click en una casilla de carro
    static async clickOnCarSquare(event) {
        const carSquare = event.currentTarget;

        // Revisa si se va a atacar. Si es asi, hace la funcion de atacar, sino, sigue con el procedimeinto normal de revisar 
        // la colocacion de una carta y/o la informacion de esta
        if ((AttackValues.getPrepareAttack() === true) && (carSquare.id.slice(0, 7) !== document.getElementById("deck").dataset.player)) {
            console.log("Se atacara!!!");
            await Attack.attack(carSquare);
        } else {
            BoardClick.createCarCard(carSquare);
        }
        
    }

    static createCarCard(carSquare) {
        // Saco de aqui mismo los datos necesarios
        const cardGeneralInformation = document.getElementById("card-selected-general-information");
        //const squarePlayer = this.createImgInBoard(carSquare);
        const squarePlayer = GetDataFromSquare.getPlayerFromSquare(carSquare);
        const cardInformation = document.getElementById("card-selected-information");
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
            //const validPower = MainGame.calculatePowerForAction(currentPlayer);
            const checkCarValidation = checkBoard.checkCarSquareAvailability(carBoardPlayer, currentPlayer, carSquare, cardGeneralInformation);
            if (checkCarValidation[0]) {

                // El resto de los datos
                const currentDeck = document.getElementById("deck-icon-current");
                const deckCards = document.getElementById("deck-cards")
                const cardObj = JSON.parse(cardGeneralInformation.dataset.card);

                // Agrega la carta al tablero
                this.putCarOnBoard(carSquare, cardObj);
                // Elimina la carta del deck
                const deckIndex = cardGeneralInformation.dataset.cardId.slice(10);
                //Player1.deleteFromDeck("cars", deckIndex);
                PlayerActions.removeCardInDeck(squarePlayer, "cars", deckIndex);
                // Reinicia el mazo si se esta mostrando el deck de carros
                if (currentDeck.dataset.deck === "cars") {
                    console.log("reiniciar mazo...");
                    deckCards.innerHTML = "";
                    // Player1.getCards() tendra que cambiar cuando se agrege el jugador 2.
                    DisplayCardsInDeck.showDeckOfCards(deckCards, PlayerActions.getDeckFromPlayer(squarePlayer, "cars"), cardInformation);
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
                GameNotesDisplay.carOnBoardTurnNotes(squarePlayer, carSquare.id.slice(23), cardObj.name);
                this.removeValidCarSquare();
            } else {
                console.log("Error en poner la carta");
                console.log(checkCarValidation);
                
                // Condicion para mostrar el mensaje
                // (Si lo hago en general, rompo algo)
                if (checkCarValidation[2] === "lack_of_power") {
                    DisplayMessageBoxes.createTemporalText(carSquare, checkCarValidation[1]);
                    this.removeValidCarSquare();
                    //DisplayCardInformation.displayEmptyCarSquare(cardInformation, carSquare, squarePlayer);
                    // Este return evita errores raros (no entendi muy bien porque, pero lo evita)
                    return;
                }
                // Yo de pendejo, tengo que mostrar la informacion de la carta, sin importar de que jugador sea
                // Igualmente toca revisar si esta vacio cuando esta en las cartas del otro jugador
                if (carSquare.dataset.name !== "undefined") {
                    console.log("Esta es una casilla vacia de carro del otro jugador.");
                }
                //console.log(checkBoard.checkCarSquareAvailability(carBoardPlayer, currentPlayer, carSquare)[1]);

                //console.log(carSquare.firstElementChild.src);
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
            //console.log(e);
            this.removeAllSelectors();
            //DisplayMessageBoxes.createTemporalText(carSquare, "Ninguna cara seleccionada!");
            DisplayCardInformation.displayEmptyCarSquare(cardInformation, carSquare, squarePlayer);
        }
    }

    // Cuando se hace click a una casilla de arma
    static clickOnWeaponSquare(event) {
        //console.log("hola");
        const weaponSquare = event.currentTarget;

        const cardGeneralInformation = document.getElementById("card-selected-general-information");

        const squarePlayerAndZone = BoardClick.getPlayerAndZoneFromWeaponSquare(weaponSquare);
        const cardInformation = document.getElementById("card-selected-information");

        console.log(`${squarePlayerAndZone["squarePlayer"]}, zona ${squarePlayerAndZone["squareZone"]}`);

        BoardClick.removeValidWeaponSquare();
        // Despues agregar lo de eliminar la estetica esta
        //console.log(checkBoard.checkForCarCapacity(squarePlayer, squareZone));
        try {
            const currentPlayer = document.getElementById("deck").dataset.player;
            //const weaponBoardPlayer = weaponSquare.classList[0];
            if (checkBoard.checkWeaponSquareAvailability(weaponSquare, weaponSquare.id, currentPlayer, cardGeneralInformation)[0]) {
                
                // Datos generales
                // (Tal vez fusionar en algun momento con la otra funcion de arriba...?)
                // A final de todo, es bastante parecido al codigo de arriba, yo creo que se puede resumir ciertos temas.
                // Pero primero tiene que funcionar lo de poner armas
                const currentDeck = document.getElementById("deck-icon-current");
                const deckCards = document.getElementById("deck-cards");
                const cardObj = JSON.parse(cardGeneralInformation.dataset.card);

                BoardClick.putWeaponOnBoard(weaponSquare, cardObj);

                const deckIndex = cardGeneralInformation.dataset.cardId.slice(10);
                //Player1.deleteFromDeck("weapons", deckIndex)
                PlayerActions.removeCardInDeck(squarePlayerAndZone["squarePlayer"], "weapons", deckIndex);

                if (currentDeck.dataset.deck === "weapons") {
                    console.log("reiniciar mazo...");
                    deckCards.innerHTML = "";

                    DisplayCardsInDeck.showDeckOfCards(deckCards, PlayerActions.getDeckFromPlayer(squarePlayerAndZone["squarePlayer"], "weapons"), cardInformation);
                }

                // Edita carSquare para quitarle capacidad al carro
                //console.log(`${squarePlayer}-zone${squareZone}-card-car-${squareZone}`);
                const carSquare = BoardClick.getCarSquareFromWeapon(squarePlayerAndZone["squarePlayer"], squarePlayerAndZone["squareZone"]);
                //const carSquare = document.getElementById(`${squarePlayer}-zone${squareZone}-card-car-${squareZone}`);
                console.log(carSquare);
                carSquare.dataset.capacity = parseInt(carSquare.dataset.capacity) - 1;

                console.log("carta de arma agregada exitosamente!");

                DisplayCardInformation.displayWeaponCardInformationBoard(
                    cardInformation,
                    weaponSquare,
                    squarePlayerAndZone["squarePlayer"],
                    cardObj.image,
                    cardObj.name,
                    cardObj.description
                );

                GameNotesDisplay.weaponOnBoardTurnNotes(squarePlayerAndZone["squarePlayer"], carSquare.dataset.name, cardObj.name);
            } else {
                // Despues se muestra la informacion del arma aqui
                
                DisplayCardInformation.displayWeaponCardInformationBoard(
                    cardInformation,
                    weaponSquare,
                    squarePlayerAndZone["squarePlayer"],
                    weaponSquare.firstElementChild.src,
                    weaponSquare.dataset.name,
                    weaponSquare.dataset.description
                );
            }
        }
        catch (e) {
            // Si hubo un error, una vez mas, es probable que fuera el JSON de la carta estuviera indefinida. 
            console.log("Error", e);
            //console.log("hola");
            BoardClick.removeAllSelectors();
            DisplayCardInformation.displayEmptyWeaponSquare(cardInformation, weaponSquare, squarePlayerAndZone["squarePlayer"]);
        }
    }

    // Consigue el jugador y zona del id de una casilla de arma
    static getPlayerAndZoneFromWeaponSquare(weaponSquare) {
        return {
            "squarePlayer": weaponSquare.id.slice(0, 7),
            "squareZone": weaponSquare.id.slice(12,13)
        }
    };
    static getCarSquareFromWeapon(squarePlayer, squareZone) {
        return document.getElementById(`${squarePlayer}-zone${squareZone}-card-car-${squareZone}`);
    }
    // Fusiona los anteriores dos metodos. Consigue la casilla de carro de una casilla de arma
    // (Tal vez refractorize algo despues)
    static getCarSquareFromWeaponSquare(weaponSqure) {
        const weaponData = this.getPlayerAndZoneFromWeaponSquare(weaponSqure);
        return this.getCarSquareFromWeapon(weaponData["squarePlayer"], weaponData["squareZone"]);
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

        // Data del carro
        this.changeCarDataOnBoard(carSquare,
            carObj.name,
            carObj.health,
            carObj.capacity,
            carObj.nitro[0],
            carObj.nitro[1],
            carObj.nitroBuff[0],
            carObj.nitroBuff[1],
            carObj.attBuff,
            carObj.description
        )
    }
    
    // Quitar una carta de carro del tablero
    // Se va a usar cuando cuando la carta sea destruida
    static removeCarOnBoard(carSquare) {
        carSquare.innerHTML = "";

        // La data se va volver undefined
        this.changeCarDataOnBoard(carSquare,
            "undefined",
            "undefined",
            "undefined",
            "undefined",
            "undefined",
            "undefined",
            "undefined",
            "undefined",
            "undefined"
        );

        
        // Elimina todas las armas del tablero que estan adjuntas al carro
        // (No se si despues devolverselas al jugador afectado)
        const weaponSquares = this.getWeaponSquaresFromCarSquare(carSquare);
        // Igualmente toca sacar el jugador por los siguientes temas
        const player = GetDataFromSquare.getPlayerFromSquare(carSquare);
        //console.log(weaponSquares);
        for (const weaponSquare of weaponSquares) {
            //console.log(weaponSquare.dataset.name);
            console.log(PlayerActions.getWeaponFromStorageFromPlayer(player, weaponSquare.dataset.name));
            //Player2.getWeaponFromStorage(weaponSquare.dataset.name);
            this.removeWeaponOnBoard(weaponSquare);
        }
    }
    // Consigue todas las armas de una zona en especifico
    // Esta funcion simplemente solo existe para simplicidad
    // Tambien, filtra las casillas vacias para no poner undefined casillas que ya estan undefined
    static getWeaponSquaresFromCarSquare(carSquare) {
        const player = GetDataFromSquare.getPlayerFromSquare(carSquare);
        const zone = GetDataFromSquare.getZoneFromCarSquare(carSquare);
        // For loop que filta las casillas que no estan vacias, es decir, que tienen un arma
        var nonEmptySquares = [];
        const squares = document.getElementsByClassName(`card-board-weapon-${player}-${zone}`);
        for (var i = 0; i < squares.length; i++) {
            if (squares[i].dataset.name !== "undefined") {
                console.log("Casilla no vacia");
                nonEmptySquares.push(squares[i]);
            }
        }
        return nonEmptySquares;
    }
     
    // Cambiar la data del carro
    static changeCarDataOnBoard(carSquare, name, health, capacity, nitroQuantity, nitroDuration, nitroResistance, nitroAttack, attackBuff, description) {
        // Lo peor es que esto fue una buena idea, si es necesario agregar un dato mas, aqui se agrega con minima 
        // interferencia de algo.
        carSquare.dataset.name = name;
        carSquare.dataset.health = health;
        carSquare.dataset.maxHealth = health;
        carSquare.dataset.capacity = capacity;
        carSquare.dataset.maxCapacity = capacity;
        /* 
        Este valor en especifico (data-nitro) es el que determina si el nitro esta activado o no.
        Si esta en 0, es que esta desactivado, si esta en otro numero, significa que esta activado y es cuantas rondas faltan para desactivarse
        */
        carSquare.dataset.nitro = 0;
        carSquare.dataset.nitroQuantity = nitroQuantity;
        carSquare.dataset.nitroDuration = nitroDuration;
        carSquare.dataset.nitroResistance = nitroResistance;
        carSquare.dataset.nitroAttack = nitroAttack;
        carSquare.dataset.attBuff = attackBuff;
        carSquare.dataset.description = description;
        /*
            Esta funcion nisiquiera esta para ahorrar codigo, es solo para no ser tan muralla de codigo clickOnCarSquare(), que en acciones
            ni siquiera es una funcion complicada
        */
    }

    // Poner una carta de arma en el tablero, con sus respectivos
    // (LO MISMO CON EL ANTERIOR, solo permite la version JSON de los datos, no el objeto cardWeapon)
    static putWeaponOnBoard(weaponSquare, weaponObj) {
        // Aunque se ve chistoso, es la mejor forma que se me ocurre hacer esto.
        // Agrega la imagen en el div
        weaponSquare.appendChild(this.createImgInBoard(weaponObj));

        // Cambia la data del div para la respectiva arma
        this.changeWeaponDataOnBoard(
            weaponSquare,
            weaponObj.name,
            weaponObj.description,
            weaponObj.energy,
            JSON.stringify(weaponObj.attacks),
            JSON.stringify(weaponObj.materials)
        )
    }

    // Quita una carta de arma del tablero
    static removeWeaponOnBoard(weaponSquare) {
        // Deja la casilla vacia
        weaponSquare.innerHTML = "";
        // Deja toda la data del carro en "undefined"
        this.changeWeaponDataOnBoard(
            weaponSquare,
            "undefined",
            "undefined",
            "undefined",
            "undefined",
            "undefined"
        );
        // Agrega capacidad al carro ya que ya se descarto un arma  
        const weaponPlayerAndZone = this.getPlayerAndZoneFromWeaponSquare(weaponSquare);
        const carSquare = this.getCarSquareFromWeapon(weaponPlayerAndZone["squarePlayer"], weaponPlayerAndZone["squareZone"]);
        ++carSquare.dataset.capacity;
    }

    // Cambiar la data del div de arma
    static changeWeaponDataOnBoard(weaponSquare, name, description, energy, attacks, materials) {
        // Datos de la carta
        weaponSquare.dataset.name = name;
        weaponSquare.dataset.description = description;
        // No existe maxEnergy porque tengo pensado que gracias a poderes pueda facilmente incrementar al valor original.
        // (Aunque me tocara probar como sera que me va con eso)
        weaponSquare.dataset.energy = energy;
        weaponSquare.dataset.attacks = attacks;
        weaponSquare.dataset.materials = materials;
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

    // Quita la seleccion de casillas validas para carros
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

    // Quita la seleccion de casillas validas para armas
    static removeValidWeaponSquare() {
        // Muy probablemente lo puedo fusionar con el de remover la de los carros...
        document.querySelectorAll(".weapon-square-valid").forEach(weaponSquare => weaponSquare.classList.remove("weapon-square-valid"));
    }
    // Siempre se me olvida el numero del .slice(), entonces esto se estandariza
    // (lamento informar de que esta funcion por alguna razon hace que explote algo del codigo, y no tengo ni idea porque)
    /*
    static getPlayerFromId(divPlayer) {
        return divPlayer.id.slice(0, 7);
    }
    */
    static removeAllSelectors() {
        this.removeValidCarSquare();
        this.removeValidWeaponSquare();
        AttackValues.resetAttackValues();
    }
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
        //DisplayMessageBoxes.createTemporalText(carSquare, "El espacio esta ocupado por otro carro!");
        console.log("Espacio ocupado");
        return false;
    }
    // Junta las dos anteriores, revisa si se puede poner una carta de carro en la casilla seleccionada del tablero
    // Devuelve el error exacto de lo que esta mal, si detecta que no puede colocar el carro
    static checkCarSquareAvailability(boardPlayer, currentPlayer, carSquare, cardGeneralInformation) {
        if (!this.checkPlayer(boardPlayer, currentPlayer)) {
            console.log("Casilla de otro carro");
            //DisplayMessageBoxes.createTemporalText(carSquare, "La casilla es del otro jugador!");
            return [false, "La casilla es del otro jugador!", "other_player"];
        }
        if (!this.checkCarSpace(carSquare)) {
            console.log("Ocupada por otro carro");
            //DisplayMessageBoxes.createTemporalText(carSquare, "El espacio esta ocupado por otro carro!");
            return [false, "La casilla ya esta ocupada por otro carro", "occupied_space"];
        }
        if (cardGeneralInformation.dataset.type !== "car") {
            console.log("Otro tipo de carta");
            //DisplayMessageBoxes.createTemporalText(carSquare, "Se va a poner otro tipo de carta en una casilla de carro!");
            return [false, "se va a poner otro tipo de carta en una casilla de carro", "other_card_type"];
        }
        // Devuelve false si no puede poner la carta por falta de poder. Si se puede poner, ya gasto el poder necesario
        if (!MainGame.calculatePowerForAction(currentPlayer)) {
            //DisplayMessageBoxes.createTemporalText(carSquare, "Ya no se tiene poder suficiente para un carro!");
            console.log("Falta de poder");
            return [false, "Ya no se tiene poder!", "lack_of_power"];
        }
        return [true, "La casilla esta disponible para colocar una carta de carro", "available"];
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
    static checkWeaponSquareAvailability(weaponSquare, boardPlayer, currentPlayer, cardGeneralInformation) {
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
        if (cardGeneralInformation.dataset.type !== "weapon") {
            return [false, "se va a poner otro tipo de carta en una casilla de arma"];
        }
        // Devuelve false si no puede poner la carta por falta de poder. Si se puede poner, ya gasta el poder necesario en la funcion
        if (!MainGame.calculatePowerForAction(currentPlayer)) {
            return [false, "Ya no se tiene poder!"];
        }

        // Si todo sale bien, la carta se puede colocar en la casilla
        return [true, "La casilla esta disponible para colocar una carta de arma"]
    }
}

// Clase que consigue algunos datos especificos de las casillas
// Furiosa refractorizacion se aproxima, pero por ahora estare con esto
export class GetDataFromSquare {
    // Consigue el jugador de cualquier casilla
    static getPlayerFromSquare(square) {
        // De la manera que desarrolle el HTML, es constante que los primeros 8 caracteres sean del jugador en cuestion
        return square.id.slice(0, 7);
    }

    // Consigue la zona de una casilla de carro
    static getZoneFromCarSquare(carSquare) {
        // Esto devuelve el string completo (Ej: "zone2")
        // Esto es porque es generalmente usado el string junto en vez de usar el numero
        // en si
        // (Puedo crear un metodo que consigue el numero tho, seria despues)
        return carSquare.classList[3].slice(11);
    }
} 