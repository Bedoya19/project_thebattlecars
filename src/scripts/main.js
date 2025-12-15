// THE BATTLE CARS
// Proyecto de pratica de programacion en la web
// Hecho por Bedoya1905
// Alpha v0.0.01

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

// Clase de carta de carro
class CarCard {
    static #nextId = 1;

    constructor(category, name, description, health, capacity, attBuff, nitro, longDescription, imagen) {
        this.id = `car-${CarCard.#nextId++}`;
        this.category = ValidateEnums(category, Category, "Categoria invalida");
        this.type = TypeCard.CAR
        this.name = name;
        this.description = description;
        this.health = health;
        this.capacity = capacity;
        this.attBuff = attBuff;
        this.nitro = nitro;
        this.longDescription = longDescription;
        this.imagen = imagen;
    }

}

class WeaponCard {
    static #nextId = 1;

    constructor(category, name, description, attacks, energy, materials, longDescription) {
        this.id = `weapon-${WeaponCard.#nextId++}`;
        this.category = ValidateEnums(category, Category, "Categoria invalidad");
        this.type = TypeCard.WEAPON;
        this.name = name;
        this.description = description;
        // Toca revisar que la informacion este correcta
        this.attacks = attacks;
        this.energy = energy;
        this.materials = materials;
        this.longDescription = longDescription;
    }
}