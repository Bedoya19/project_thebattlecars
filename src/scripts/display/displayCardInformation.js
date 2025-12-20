import { DataConversor } from "../models/constants/enums.js";

export class DisplayCardInformation {
    static displayInformationOnDeck(divElement, card) {
        switch (DataConversor.enumToString(card.type)) {
            case "car":
                DisplayCardInformation.displayCarCardInformationDeck(divElement, card);
                break;
            case "weapon":
                DisplayCardInformation.displayWeaponCardInformationDeck(divElement, card);
                break;
            case "material":
                DisplayCardInformation.displayMaterialCardInformationDeck(divElement, card);
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
    static descriptionCardInformation(card) {
        return `
            <hr id="card-selected-bar">
            <p id="card-selected-description" class="card-selected-information">"${card.description}"</p>
        `
    }

    // Mostrar la informacion de una carta de carro del deck
    static displayCarCardInformationDeck(divElement, card) {
        //console.log(card);
        // Esto es solo para mostrar la informacion de la carta en el deck.
        const carInformationFormat = `
            ${this.mainCardInformation("Jugador 1", card.image, card.name)}
            <div id="card-selected-general-information">
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
    
    // Mostrar la informacion de una carta de weapon del deck
    static displayWeaponCardInformationDeck(divElement, card) {
        const weaponInformationFormat = `
            ${this.mainCardInformation("Jugador 1", card.image, card.name)}
            <div id="card-selected-general-information">
                <div id="card-selected-attacks">
                    <p class="card-selected-information">Ataques:</p>
                    <div id="card-selected-attacks">
                        ${WeaponListStatsDisplay.displayWeaponAttacks(card)}
                    </div>
                </div>
                <p id="card-selected-energy" class="card-selected-information">Energia: <span>${card.energy}</span></p>
                <div>
                    <p id="card-selected-upgrade" class="card-selected-information">Materiales para mejorar:</p>
                    <div id="card-selected-materials">
                        ${WeaponListStatsDisplay.displayWeaponMaterials(card)}
                    </div>
                </div>
                ${this.descriptionCardInformation(card)}
            </div>
        `
        divElement.innerHTML = weaponInformationFormat;
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

    // Poner la informacion respectiva en las datas del div de informacion para que sepa de donde vino
    // data-card: La informacion JSON de la carta (si esta viene del deck)
    // data-origin: De donde vino la informacion de la carta. Del deck o del tablero
    // data-player: El dueño de la carta del jugador
}

// Clase de las funciones de mostrar los ataques y los materiales de cada arma respectiva en un formato de lista, ya preparado para adjuntarlo a cualquier HTML
// Esta separada de DisplayCardInformation ya que no quiero se exportada por ahora al main.js
class WeaponListStatsDisplay {
    // Devolver los ataques de una arma en formato HTML
    // En todo esto se asume que se da una carta de arma, por ahora no veo factible revisar
    static displayWeaponAttacks(weaponCard) {
        const attackList = this.createUlElementForWeapon("attacks");

        for (let i = 0; i < weaponCard.attacks.length ; i++) {
            // Crea una string bonita de cada elemento de attackValues
            const attackValues = weaponCard.attacks[i].join(", ");
        
            // Creacion de cada elemento de la lista
            const attackListLi = this.createListElementInWeapon("card-selected-attack");
            attackListLi.innerHTML = `Nivel ${i + 1}: (${attackValues})`;
            attackList.appendChild(attackListLi);
        }
        return attackList.outerHTML;
    }
    // Devolver los materiales de un arma en un formato HTML
    // Una vez mas, se asumo que se da una carta de arma.
    static displayWeaponMaterials(weaponCard) {
        const materialList = this.createUlElementForWeapon("materials");

        // Lo mismo que el anterior, creacion de cada elemento de la lista, esta vez con un formato distinto
        for (const material of weaponCard.materials) {
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