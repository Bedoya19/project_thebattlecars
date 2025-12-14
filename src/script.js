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

// Temporal: Materiales en la Categoria 1
const materialsCategory1 = [
    ["cardboard", 1],
    ["rubberband", 2],
    ["rubber", 2],
    ["foam", 2],
    ["gunpowder", 3]
];
const materialsCategory2 = [
    ["stone tablet", 1],
    ["reinforced rubberband", 2],
    ["stone", 2],
    ["clay", 2],
    ["high-quality gunpowder", 3]
];
const materialsCategory3 = [
    ["steel", 1],
    ["silicon", 2],
    ["mechanic toolkit", 2]
    ["welding kit", 2],
    ["maximum-quality gunpowder", 3]
];


// Objeto de guia temporal
const card = {
    category: 1,
    //type: types[0],
    name: "Dodge Dart GT",
    description: "El carro mas basico, todo el mundo lo tiene",
    health: 10,
    capacity: 4,
    attBuff: 0,
    nitro: [3, 3],
    "descripcion larga": "El Dodge Dart GT es la carta de carro mas basica y comun de todas. Que sea basica y comun no significa que sea una mala carta, ya que es bastante balanceada, estable en lo que se espera, y combina con muchas estrategias"
}
const card1 = {
    category: 1,
    name: "Lanzacohetes de carton",
    description: "¿Un lanzacohetes de carto? ¿Y eso como se supone que debe funcionar?",
    attacksLv1: [1, 2, 3, 4, 5, 6],
    attacksLv2: [2, 3, 4, 5, 6, 7],
    attacksLv3: [3, 4, 5, 6, 7, 9]

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

    constructor(category, type, name, description, health, capacity, attBuff, nitro, largeDescription, imagen) {
        this.id = `car-${CarCard.#nextId++}`;
        this.category = ValidateEnums(category, Category, "Categoria invalida");
        this.type = ValidateEnums(type, TypeCard, "Tipo de carta invalida");
        this.name = name;
        this.description = description;
        this.health = health;
        this.capacity = capacity;
        this.attBuff = attBuff;
        this.nitro = nitro;
        this.largeDescription = largeDescription;
        this.imagen = imagen;
    }
}

class WeaponCard {
    static #nextId = 1;

}