// THE BATTLE CARS
// Proyecto de pratica de programacion en la web
// Hecho por Bedoya1905
// Alpha v0.0.01


// Display del mazo
const deckCards = document.getElementById("deck-cards");

// Enum de categoria
const Category = Object.freeze({
    CATEGORY1: Symbol("category 1"),
    CATEGORY2: Symbol("category 2"),
    CATEGORY3: Symbol("category 3"),
    CATEGORY4: Symbol("category 4"),
    CATEGORY5: Symbol("category 5"),
    CATEGORY6: Symbol("category 6")
});
// Enum de tipos de cartas
const TypeCard = Object.freeze({
    CAR: Symbol("car"),
    WEAPON: Symbol("weapon"),
    MATERIAL: Symbol("material"),
    POWER: Symbol("power")
});


// Objetos de guia temporal
const card = {
    category: 1,
    //type: types[0],
    name: "Dodge Dart GT",
    description: "El carro mas basico, todo el mundo lo tiene",
    health: 10,
    capacity: 4,
    attBuff: 0,
    nitro: [3, 3],
    longDescription: "El Dodge Dart GT es la carta de carro mas basica y comun de todas. Que sea basica y comun no significa que sea una mala carta, ya que es bastante balanceada, estable en lo que se espera, y combina con muchas estrategias."
}
const card1 = {
    category: 1,
    name: "Lanzacohetes de carton",
    description: "¿Un lanzacohetes de carto? ¿Y eso como se supone que debe funcionar?",
    attacksLv1: [1, 2, 3, 4, 5, 6],
    attacksLv2: [2, 3, 4, 5, 6, 7],
    attacksLv3: [3, 4, 5, 6, 7, 8],
    energy: 4,
    // Cambiar esto despues.
    materials: [["cardboard", 4], ["rubberband", 2], ["gunpowder", 1]],
    longDescription: "Por mas que parezca una mala idea, este lanzacohetes de carton es una de las armas mas basicas, pero la mismo tiempo mas robustas de la categoria. Tiene una progresion estable en su ataque, sus mejoras son creibles y lineales, y no es muy caro de mejorar."
}
const card2 = {
    category: 1,
    type: "material",
    name: "Carton",
    materialInQuestion: "cardboard",
    quantity: 1,
    description: "Este simple pedazo de carton te puede ayudar a mejorar todas las armas de la categoria 1 a un nivel mayor, mejorando sus habilidades y rellenando su poder en el proceso." 
}

// Validar categorias y tipos correctos para evitar problemas a futuro
class ValidateEnums {
    static isValidEnum(value, enumObj, msg = "Valor invalido") {
        const set = new Set(Object.values(enumObj));
        if (!set.has(value)) throw new Error(msg);
        return value;
    }
}

// Clase padre de Cartas
class Card {
    constructor(category, type, name, descripcion) {
        this.category = ValidateEnums.isValidEnum(category, Category, "Categoria invalida");
        this.type = ValidateEnums.isValidEnum(type, TypeCard, "Tipo de carta invalido");
        this.name = name;
        this.descripcion = descripcion;
    }
}

// Clase de carta de carro
class CarCard {
    static #nextId = 1;

    constructor(category, name, description, health, capacity, attBuff, nitro, longDescription, image) {
        this.id = `car-${CarCard.#nextId++}`;
        this.category = ValidateEnums.isValidEnum(category, Category, "Categoria invalida");
        this.type = TypeCard.CAR
        this.name = name;
        this.description = description;
        this.health = health;
        this.capacity = capacity;
        this.attBuff = attBuff;
        this.nitro = nitro;
        this.longDescription = longDescription;
        this.image = image;
    }

}

class WeaponCard {
    static #nextId = 1;

    constructor(category, name, description, attacks, energy, materials, longDescription, image) {
        this.id = `weapon-${WeaponCard.#nextId++}`;
        this.category = ValidateEnums.isValidEnum(category, Category, "Categoria invalidad");
        this.type = TypeCard.WEAPON;
        this.name = name;
        this.description = description;
        // Toca revisar que la informacion este correcta
        this.attacks = attacks;
        this.energy = energy;
        // Esto tambien tiene que tener algun diseño en especifico.
        this.materials = materials;
        this.longDescription = longDescription;
        this.image = image;
    }
}


const carCard = new CarCard(
    Category.CATEGORY1, 
    "Dodge Dart GT", 
    "El carro mas basico, todo el mundo lo tiene", 
    10, 
    4, 
    0, 
    [3, 3], 
    "El Dodge Dart GT es la carta de carro mas basica y comun de todas. Que sea basica y comun no significa que sea una mala carta, ya que es bastante balanceada, estable en lo que se espera, y combina con muchas estrategias.",
    "./src/images/dodgedartgt.png"
);
const weaponCard = new WeaponCard(
    Category.CATEGORY1, 
    "Lanzacohetes de carton", 
    "¿Un lanzacohetes de carto? ¿Y eso como se supone que debe funcionar?",
    [[1, 2, 3, 4, 5, 6],
    [2, 3, 4, 5, 6, 7], 
    [3, 4, 5, 6, 7, 8]],
    4,
    [["cardboard", 4],
    ["rubberband", 2],
    ["gunpowder", 1]],
    "Por mas que parezca una mala idea, este lanzacohetes de carton es una de las armas mas basicas, pero la mismo tiempo mas robustas de la categoria. Tiene una progresion estable en su ataque, sus mejoras son creibles y lineales, y no es muy caro de mejorar.",
    "./src/images/cohete_carton.png"
);

// Funcion de lo que hace cuando se hace click en una carta (temporal para pruebas)
const clickOnDeckCard = (card) => {
    console.log(`Clicked on ${card.name}`)
}

// Este va a ser un display general, mientras se prueban cosas.
const displayCard = (card) => {
    let quantityCardsInDeck = document.querySelectorAll(".deck-card").length;

    // Crea un div de la carta
    const divCardInDeck = document.createElement("div");
    divCardInDeck.setAttribute("id", `deck-card-${quantityCardsInDeck}`);
    divCardInDeck.setAttribute("class", "deck-card")
    divCardInDeck.insertAdjacentHTML("beforeend", 
        `<img src="${card.image}" alt="card-${quantityCardsInDeck}">`
    )
    divCardInDeck.addEventListener("click", () => {clickOnDeckCard(card)});

    // La agrega al mazo.
    deckCards.appendChild(divCardInDeck);
}

displayCard(carCard);
displayCard(weaponCard);

// La siguiente funcion que voy a hacer es que mediante un array de clases de cartas