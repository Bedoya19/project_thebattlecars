// THE BATTLE CARS
// Proyecto de pratica de programacion en la web
// Hecho por Bedoya1905
// Alpha v0.0.01


// Display del mazo
const deckCards = document.getElementById("deck-cards");


// Todos estos enums (especialmente el de los materiales) iran despues a otro script.
// Enum de categoria
const Category = Object.freeze({
    CATEGORY1: Symbol.for("category 1"),
    CATEGORY2: Symbol.for("category 2"),
    CATEGORY3: Symbol.for("category 3"),
    CATEGORY4: Symbol.for("category 4"),
    CATEGORY5: Symbol.for("category 5"),
    CATEGORY6: Symbol.for("category 6")
});
// Enum de tipos de cartas
const TypeCard = Object.freeze({
    CAR:      Symbol.for("car"),
    WEAPON:   Symbol.for("weapon"),
    MATERIAL: Symbol.for("material"),
    POWER:    Symbol.for("power")
});

// (Despues reviso por internet) Enum de materiales de la categoria 1
const MaterialsCat1 = Object.freeze({
    CARDBOARD: Object.freeze(["cardboard", 1]),
    RUBBERBAND: Object.freeze(["rubberband", 2]),
    RUBBER_KIT: Object.freeze(["rubber kit", 2]),
    FOAM: Object.freeze(["foam", 2]),
    GLUE: Object.freeze(["glue", 2]),
    GUNPOWDER: Object.freeze(["gunpowder", 3]),
    VEGETABLE_OIL: Object.freeze(["vegetable oil", 3])
});


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
        console.log("Validar")
        const set = new Set(Object.values(enumObj));
        if (!set.has(value)) throw new Error(msg);
        return value;
    }
}

// Clase padre de Cartas
class Card {
    constructor(category, type, name, descripcion, longDescription, image) {
        ValidateEnums.isValidEnum(category, Category, "Categoria invalida")
        ValidateEnums.isValidEnum(type, TypeCard, "Tipo de carta invalido")
        this.category = category;
        this.type = type;
        this.name = name;
        this.descripcion = descripcion;
        this.longDescription = longDescription;
        this.image = image;
    }
}

// (sub)clase de carta de carro
// La subdivision funciona correctamente!
class CarCard extends Card{
    static #nextId = 1;

    constructor(category, name, description, health, capacity, attBuff, nitro, longDescription, image) {
        super(category, TypeCard.CAR, name, description, longDescription, image);

        this.health = health;
        this.capacity = capacity;
        this.attBuff = attBuff;
        this.nitro = nitro;
        this.id = `car-${CarCard.#nextId++}`
    }

}
// (sub)clase de carta de arma
class WeaponCard extends Card {
    static #nextId = 1;

    constructor(category, name, description, attacks, energy, materials, longDescription, image) {
        super(category, TypeCard.WEAPON, name, description, longDescription, image);
        // Toca revisar que la informacion este correcta
        this.attacks = attacks;
        this.energy = energy;
        // Esto tambien tiene que tener algun diseño en especifico.
        this.materials = materials;
    }
}
// (sub)clase de carta de material
class MaterialCard extends Material {
    static #nextId = 1;

    constructor(category, name, description, longDescription, image, materialInQuestion, quantity) {
        super(category, TypeCard.MATERIAL, name, description, longDescription, image);
        this.materialInQuestion = ValidateEnums.isValidEnum(materialInQuestion, MaterialsCat1, "Material de Categoria 1 invalido");
        this.quantity = quantity;
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
const cards = [carCard, weaponCard];

// Funcion de lo que hace cuando se hace click en una carta (temporal para pruebas)
const clickOnDeckCard = (card) => {
    console.log(`Clicked on ${card.name}`)
}

// Este va a ser un display general, mientras se prueban cosas.
const displayCardOnDeck = (card) => {
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

//displayCardOnDeck(carCard);
//displayCardOnDeck(weaponCard);

// Mostrar todas las cartas de un array al div del deck.
const showDeckOfCards = (cards) => {
    if (cards.length !== 0) {
        for (const card of cards) {
            displayCardOnDeck(card);
        }
    } else {
        // Esto tendra que avisarle al usuario en pantalla, pero eso vendra despues
        console.log("No existen cartas en este mazo!");
    }
    
}
showDeckOfCards(cards);

