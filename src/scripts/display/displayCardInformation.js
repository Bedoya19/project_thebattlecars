import { DataConversor } from "../models/constants/enums.js";

export class DisplayCardInformation {
    static displayInformation(divElement, card) {
        switch (DataConversor.enumToString(card.type)) {
            case "car":
                DisplayCardInformation.displayCarCardInformation(divElement, card);
                break;
            case "weapon":
                break;
            case "material":
                break;
            case "power":
                break;
        }
    }

    static displayCarCardInformation(divElement, card) {
        //console.log(divElement);
        // Esto es solo para mostrar la informacion de la carta en el deck.
        const carInformationFormat = `
            <h2 id="card-selected-player" class="card-selected-information">Jugador 1</h2>
            <div id="card-selected-main-information">
                <div id="card-selected-image-div"><img id="card-selected-image" src="${card.image}" alt="${card.name}"></div>
            </div>
            <div id="card-selected-general-information">
                <!-- Esta informacion cambiara dependiendo del tipo de carta que es -->
                <p id="car-selected-health" class="card-selected-information">Vida: <span>${card.health}</span></p>
                <p id="car-selected-capacity" class="card-selected-information">Capacidad <span>${card.capacity}</span></p>
                <p id="car-selected-attackbuff" class="card-selected-information">Aumento de ataque: <span>${card.attBuff}</span></p>
                <div id="car-selected-nitro">
                    <p id="nitro-quantity" class="card-selected-information">Capacidad de nitro: <span>${card.nitro[0]}</span></p>
                    <p id="nitro-duration" class="card-selected-information">Duracion de nitro: <span>${card.nitro[1]}</span></p>
                </div>
                <hr id="card-selected-bar">
                <p id="car-selected-description" class="card-selected-information">"El carro mas basico, todo el mundo lo tiene"</p>
            </div>
        `;
        divElement.innerHTML = carInformationFormat;
    }
}