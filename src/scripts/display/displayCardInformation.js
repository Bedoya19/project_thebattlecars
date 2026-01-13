import { DataConversor } from "../models/constants/enums.js";
import { CarCard } from "../models/cards/CarCard.js";
import { StandarizedDocCreation } from "./standardDoc/standarizedDocCreaction.js";
import { BoardClick } from "../board/boardActions.js";
import { Attack } from "../battle/attack.js";
import { PlayerActions } from "../players/playerActions.js";

export class DisplayCardInformation {
    static displayInformationOnDeck(divElement, card, cardId) {
        const player = document.getElementById("deck").dataset.player;
        switch (DataConversor.enumToString(card.type)) {
            case "car":
                const carJSON = card.convertCarCardToJSON();
                const carSquares = document.getElementsByClassName("card-board-car");
                //const player = document.getElementById("deck").dataset.player;
                BoardClick.showValidCarSquares(player, carSquares);
                this.displayCarCardInformationDeck(divElement, card, [carJSON, player], cardId);
                break;
            case "weapon":
                const weaponJSON = card.convertWeaponCardToJSON();
                const weaponSquares = document.getElementsByClassName("card-board-weapon");
                BoardClick.showValidWeaponSquares(player);
                this.displayWeaponCardInformationDeck(divElement, card, [weaponJSON, player], cardId);
                break;
            case "material":
                this.displayMaterialCardInformationDeck(divElement, card);
                break;
            case "power":
                break;
        }
    }

    // Formato base de la parte de arriba del display
    // Muy probablemente se termine usando para la inmensa mayoria de cosas para este display
    static mainCardInformation(player, image, name) {
        return `
            <div id="card-selected-main-information">
                <h2 id="card-selected-player" class="card-selected-information">${player}</h2>
                <div>
                    <h1 id="card-selected-name"></h1>
                </div>
                <div id="card-selected-image-div"><img id="card-selected-image" src="${image}" alt="${name}"></div>
            </div>
        `;
    }

    // Funcion de mostrar la desripcion de la carta
    static descriptionCardInformation(cardDescription) {
        return `
            <hr id="card-selected-bar">
            <p id="card-selected-description" class="card-selected-information">"${cardDescription}"</p>
        `
    }

    // Mostrar la informacion de una carta de carro del deck
    static displayCarCardInformationDeck(divElement, card, [json, player], cardId) {
        //console.log(card);
        // Esto es solo para mostrar la informacion de la carta en el deck.
        divElement.innerHTML = `
            ${this.mainCardInformation(this.convertPlayerString(player), card.image, card.name)}
            ${this.generalCarCardInformation(
                player,
                cardId,
                card.health,
                card.capacity,
                card.attBuff,
                card.nitro,
                card.nitroBuff,
                card.description,
                "deck",
                json
            )}
        `;
    }
    // Mostrar la informacion de una carta de carro del tablero
    static displayCarCardInformationBoard(divElement, carSquare, playerOriginal, cardImage, cardName, cardDescription) {
        // Es bastante parecido al anterior salvo que es lo que exactamente dicen los valores.
        divElement.innerHTML = `
            ${this.mainCardInformation(this.convertPlayerString(playerOriginal), cardImage, cardName)}
            ${this.generalCarCardInformation(
                playerOriginal, 
                carSquare.id.slice(23), 
                `<span>${carSquare.dataset.health}</span> / <span>${carSquare.dataset.maxHealth}</span>`,
                `<span>${carSquare.dataset.capacity}</span> / <span>${carSquare.dataset.maxCapacity}</span>`,
                carSquare.dataset.attBuff,
                [carSquare.dataset.nitroQuantity, carSquare.dataset.nitroDuration],
                [carSquare.dataset.nitroResistance, carSquare.dataset.nitroAttack],
                cardDescription,
                "board"
            )
            }
       `;
    }

    // Metodo general para el contenido general de la carta de carro (con esto se ahora bastantes lineas)
    // Anoto que "health" y "capacity" pueden llegar a ser o un numero, o una string (para mostrar el maximo de capacidad o vida).
    // Para, en mi vision, una mayor claridad, las estadisticas de nitro estaran divididas en 2 arrays, que son las siguientes
    // nitroStats[0]: nitroQuantity
    // nitroStats[1]: nitroDuration
    // nitroBuffs[0]: nitroResistance
    // nitroBuffs[1]: nitroAttack
    static generalCarCardInformation(player, carId, health, capacity, attBuff, nitroStats, nitroBuffs, cardDescription, origin, data) {
        console.log(player, carId, health, capacity, attBuff, nitroStats, nitroBuffs, cardDescription);
        return `
            <div id="card-selected-general-information" data-card='${data}' data-origin="${origin}" data-player="${player}" data-card-id="${carId}" data-type="car">
                <p id="car-selected-health" class="card-selected-information">
                    Vida: ${health}
                </p>
                <p id="car-selected-capacity" class="card-selected-information">
                    Capacidad: ${capacity}
                </p>
                <p id="car-selected-attackbuff" class="card-selected-information">
                    Aumento de ataque: ${attBuff}
                </p>
                <div id="car-selected-nitro">
                    <div id="car-selected-nitro-amount">
                        <p id="nitro-quantity" class="card-selected-information">Capacidad de nitro: <span>${nitroStats[0]}</span></p>
                        <p id="nitro-duration" class="card-selected-information">Duracion de nitro: <span>${nitroStats[1]}</span></p>
                    </div>
                    <div id="car-selected-nitro-buff">
                        <p class="card-selected-information">Cuando nitro activo:</p>
                        <ul class="card-selected-lists">
                            <li class="card-selected-information card-selected-list">Resistencia: ${nitroBuffs[0]}</li>
                            <li class="card-selected-information card-selected-list">Ataque: +${nitroBuffs[1]}</li>
                        </ul>
                    </div>
                </div>
                ${this.descriptionCardInformation(cardDescription)}
            </div>
        `;
    }
    
    // Mostrar la informacion de una carta de weapon del deck
    static displayWeaponCardInformationDeck(divElement, card, [json, player], cardId) {
        divElement.innerHTML = `
            ${this.mainCardInformation(this.convertPlayerString(player), card.image, card.name)}
            ${this.generalWeaponCardInformation(
                this.convertPlayerString(player),
                cardId,
                card.attacks,
                card.energy,
                card.materials,
                card.description,
                "deck",
                json
            )}
        `;
    }

    // Mostrar la informacion de una carta de arma del tablero
    static displayWeaponCardInformationBoard(divElement, weaponSquare, playerOriginal, cardImage, cardName, cardDescription) {
        //console.log("Casilla de arma: ", weaponSquare);
        const parts = weaponSquare.id.split('-');
        const zoneNumber = parts[1].slice(4); 
        const squareNumber =  weaponSquare.id.at(-1);
        console.log("Zona:", zoneNumber, "Casilla", squareNumber);
        // Muy probablemente, cuando ya tenga todo funcionando correctamente, puedo fusionar algunas funciones repetitivas
        divElement.innerHTML = `
            ${this.mainCardInformation(this.convertPlayerString(playerOriginal), cardImage, cardName)}
            ${this.generalWeaponCardInformation(
                this.convertPlayerString(playerOriginal),
                weaponSquare.id.slice(26),
                JSON.parse(weaponSquare.dataset.attacks),
                weaponSquare.dataset.energy,
                JSON.parse(weaponSquare.dataset.materials),
                cardDescription,
                "board"
            )}
        `;
        //${Attack.createAttackButton(playerOriginal, zoneNumber, squareNumber, weaponSquare)}
        divElement.appendChild(Attack.createAttackButton(playerOriginal, zoneNumber, squareNumber, weaponSquare));
    }

    // Mostrar la informacion general de una carta de arma
    // Toca tener en cuenta que las listas de ataques y materiales se pasan a JSON, entonces tener eso en cuenta.
    static generalWeaponCardInformation(player, cardId, attacks, energy, materials, cardDescription, origin, data) {
        console.log(cardDescription);
        return `
                <div id="card-selected-general-information" data-card='${data}' data-origin="${origin}" data-player="${player}" data-card-id="${cardId}" data-type="weapon">
                    <div id="card-selected-attacks">
                        <p class="card-selected-information">Ataques:</p>
                        <div id="card-selected-attacks">
                            ${WeaponListStatsDisplay.displayWeaponAttacks(attacks)}
                        </div>
                    </div>
                    <p id="card-selected-energy" class="card-selected-information">Energia: <span>${energy}</span></p>
                    <div>
                        <p id="card-selected-upgrade" class="card-selected-information">Materiales para mejorar:</p>
                        <div id="card-selected-materials">
                            ${WeaponListStatsDisplay.displayWeaponMaterials(materials)}
                        </div>
                    </div>
                    ${this.descriptionCardInformation(cardDescription)}
                </div>
        `;
    }

    // Mostrar la informacion de una carta de material del deck
    static displayMaterialCardInformationDeck(divElement, card) {
        // Es bastante sencillo, en teoria la descripcion dice lo que hace, pero tal vez cambie
        const materialInformationFormat = `
            ${this.mainCardInformation("Jugador 1", card.image, card.name)}
            <div id="card-selected-general-information">
                <p class="card-selected-information">${card.description}</p>
            </div>
        `
        divElement.innerHTML = materialInformationFormat;
    }

    // Funcion simple que lo unico que hace es reiniciar #card-selected-information para que no alla ninguna carta seleccionada
    static deselectCardInformation(divElement) {
        divElement.innerHTML = `
        <div id="card-selected-information">
            <h2 class="card-selected-information">Ninguna carta seleccionada</h2>
            <div id="card-selected-general-information" data.card="undefined" data-origin="undefined" data-player="undefined">
            </div>
        </div>
        `;
        // Si algo, quita la estetica de casillas validas
        BoardClick.removeAllSelectors();
    }

    // Avisa el ataque que se acaba de hacer
    // carAttackedElement es la casilla del carro. 
    // Va cambiar un poco cuando se pueda ya destruir un carro
    static attackInformation(divElement, carAttackedElement, charge, attack, carDestroyed, weaponDischarged) {
        divElement.innerHTML = `
        <div id="card-selected-information">
            <h2 class="card-selected-information">Se acaba de atacar!</h2>
            ${this.carAfterAttacked(carAttackedElement, carDestroyed, charge, attack)}
            ${this.weaponDischargedMessage(weaponDischarged)}
        </div>
        `
    }
    // Lo que le pasa al carro despues del ataque
    static carAfterAttacked(carAttackedElement, carDestroyed, charge, attack) {
        if (carDestroyed) {
            // Mensaje que devuelve el carro destruido
            // Despues se tendra que modificar para que muestre la cantidad de carros exactos en el jugador afectado
            return `
            <h2 class="card-selected-information">${carAttackedElement.dataset.name} fue atacado por un ataque de carga ${charge}, que cause un daño de ${attack}. ¡Suficiente para destruirlo!</h2>
            <h2 class="card-selected-information">Le quedarian al ${carAttackedElement.id.slice(0,7)} menos carros</h2>
            `;
        } else {
            // Mensaje normal que devuelve el carro
            return `
            <h2 class="card-selected-information">${carAttackedElement.dataset.name} fue atacado por un ataque de carga ${charge}, que cause un daño de ${attack}</h2>
            <h2 class="card-selected-information">Le queda ${carAttackedElement.dataset.health} de vida</h2>
            `;
        }
    }
    // Lo que le pasa al arma despues del ataque
    static weaponDischargedMessage(weaponDischarged) {
        if (weaponDischarged) {
            return `<h2 class="card-selected-information">El arma quedo descargada</h2>`
        } else {
            return "<h2></h2>";
        }
        
    }
    // Mostrar una casilla vacia de carro
    static displayEmptyCarSquare(divElement, carSquare, squarePlayer) {
        divElement.innerHTML = `
        <div id="card-selected-information">
            <h2 class="card-selected-information">Casilla vacia de carro del ${this.convertPlayerString(squarePlayer)} en la zona ${carSquare.id.slice(23)}</h2>
            <div id="card-selected-general-information" data.card="undefined" data-origin="undefined" data-player="undefined">
            </div>
        </div>
        `;
    }

    // Mostrar una casilla vacia de arma
    static displayEmptyWeaponSquare(divElement, weaponSquare, squarePlayer) {
        divElement.innerHTML = `
        <div id="card-selected-information">
            <h2 class="card-selected-information">Casilla vacia de arma del ${this.convertPlayerString(squarePlayer)} en la zona ${weaponSquare.id.slice(12, 13)}</h2>
            <div id="card-selected-general-information" data.card="undefined" data-origin="undefined" data-player="undefined">
        </div>
        `
    }

    // Poner la informacion respectiva en las datas del div de informacion para que sepa de donde vino
    // data-card: La informacion JSON de la carta (si esta viene del deck)
    // data-origin: De donde vino la informacion de la carta. Del deck o del tablero
    // data-player: El dueño de la carta del jugador

    // Si es necesario, convierte un "player1" o "player2" a "Jugador 1" o "Jugador 2"
    // (Solo se permiten esas inputs)
    static convertPlayerString(player) {
        if (player === "player1" || player === "player2") {
            return (player === "player1") ? "Jugador 1" : "Jugador 2"
        } else {
            return undefined;
        }
    }
}

// Clase de las funciones de mostrar los ataques y los materiales de cada arma respectiva en un formato de lista, ya preparado para adjuntarlo a cualquier HTML
// Esta separada de DisplayCardInformation ya que no quiero se exportada por ahora al main.js
class WeaponListStatsDisplay {
    // Devolver los ataques de una arma en formato HTML
    // Ahora, en vez de la carta, se recibe solamente la lista de ataques
    static displayWeaponAttacks(weaponAttacks) {
        const attackList = this.createUlElementForWeapon("attacks");

        for (let i = 0; i < weaponAttacks.length ; i++) {
            // Crea una string bonita de cada elemento de attackValues
            const attackValues = weaponAttacks[i].join(", ");
        
            // Creacion de cada elemento de la lista
            const attackListLi = this.createListElementInWeapon("card-selected-attack");
            attackListLi.innerHTML = `Nivel ${i + 1}: (${attackValues})`;
            attackList.appendChild(attackListLi);
        }
        return attackList.outerHTML;
    }
    // Devolver los materiales de un arma en un formato HTML
    // Ahora, en vez de la carta, se recibe solamente la lista de materiales
    static displayWeaponMaterials(weaponMaterials) {
        const materialList = this.createUlElementForWeapon("materials");

        // Lo mismo que el anterior, creacion de cada elemento de la lista, esta vez con un formato distinto
        for (const material of weaponMaterials) {
            //console.log(material);
            // Crea cada elemento de la lista
            const materialListLi = this.createListElementInWeapon("card-selected-material");
            materialListLi.innerHTML = `${material[0]}: ${material[1]}`;
            materialList.appendChild(materialListLi);
        }
        return materialList.outerHTML;
    }

    // Las siguientes funciones son mas internas de las anteriores dos para evitar repetir tanto codigo
    // Un chingo de funciones estoy haciendo...
    // Crea de forma mas flexible un elemento li para las listas que usa la informacion de 
    static createListElementInWeapon(customClass) {
        const liElement = document.createElement("li");
        liElement.classList.add("card-selected-information");
        liElement.classList.add("card-selected-list");
        liElement.classList.add(customClass);
        return liElement;
    }
    // Crea lo basico del elemento <ul> base para la lista
    static createUlElementForWeapon(useInList) {
        const ulElement = document.createElement("ul");
        ulElement.id = `card-selected-${useInList}-list`;
        ulElement.classList.add("card-selected-lists");
        return ulElement;
    }
}

// Estandarizar la agregacion de elementos HTML (todo)