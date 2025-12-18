import { DataConversor } from "../models/constants/enums.js";

export class DisplayCardInformation {
    static displayInformationOnDeck(divElement, card) {
        switch (DataConversor.enumToString(card.type)) {
            case "car":
                DisplayCardInformation.displayCarCardInformationDeck(divElement, card);
                break;
            case "weapon":
                break;
            case "material":
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

    // Mostrar la informacion de una carta de carro del deck
    static displayCarCardInformationDeck(divElement, card) {
        console.log(card);
        // Esto es solo para mostrar la informacion de la carta en el deck.
        const carInformationFormat = `
            ${this.mainCardInformation("Jugador 1", card.image, card.name)}
            <div id="card-selected-general-information">
                <!-- Esta informacion cambiara dependiendo del tipo de carta que es -->
                <p id="car-selected-health" class="card-selected-information">Vida: <span>${card.health}</span></p>
                <p id="car-selected-capacity" class="card-selected-information">Capacidad <span>${card.capacity}</span></p>
                <p id="car-selected-attackbuff" class="card-selected-information">Aumento de ataque: <span>${card.attBuff}</span></p>
                <div id="car-selected-nitro">
                    <p id="nitro-quantity" class="card-selected-information">Capacidad de nitro: <span>${card.nitro[0]}</span></p>
                    <p id="nitro-duration" class="card-selected-information">Duracion de nitro: <span>${card.nitro[1]}</span></p>
                </div>
                ${this.descriptionCardInformation(card)}
            </div>
        `;
        divElement.innerHTML = carInformationFormat;
    }
    
    // Funcion de mostrar la desripcion de la carta
    static descriptionCardInformation(card) {
        return `
            <hr id="card-selected-bar">
            <p id="card-selected-description" class="card-selected-information">"${card.description}"</p>
        `
    }
}