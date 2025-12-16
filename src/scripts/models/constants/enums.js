// Enums de categoria
export const Category = Object.freeze({
    CATEGORY1: Symbol.for("category 1"),
    CATEGORY2: Symbol.for("category 2"),
    CATEGORY3: Symbol.for("category 3"),
    CATEGORY4: Symbol.for("category 4"),
    CATEGORY5: Symbol.for("category 5"),
    CATEGORY6: Symbol.for("category 6")
});
// Enum de tipos de cartas
export const TypeCard = Object.freeze({
    CAR:      Symbol.for("car"),
    WEAPON:   Symbol.for("weapon"),
    MATERIAL: Symbol.for("material"),
    POWER:    Symbol.for("power")
});

// Validar enums correctos en inputs selectivos
export class ValidateEnums {
    static isValidEnum(value, enumObj, msg = "Valor invalido") {
        //console.log(`Validar ${enumObj}`)
        const set = new Set(Object.values(enumObj));
        if (!set.has(value)) throw new Error(msg);
        return value;
    }
}

// Clase de convertir strings a enums, y enums a strings.
export class DataConversor {
    static stringToEnum(enumObj, string) {
        let objectEnum;

        switch (enumObj) {
            case "category":
                objectEnum = stringToCategoryEnum(string);
                break;
            case "typecard":
                objectEnum = stringToTypeCardEnum(string);
                break;
            default:
                throw new Error("Objeto no valido")
        }

        if (objectEnum === null) throw new Error("Objeto no se pudo convertir");
        return objectEnum;
    }
    static enumToString(enumObj) {
        return Symbol.keyFor(enumObj);
    } 
}

const stringToCategoryEnum = (string) => {
    let category;
    switch (string) {
        case "category 1":
            category = Category.CATEGORY1;
            break;
        case "category 2":
            category = Category.CATEGORY2;
            break;
        case "category 3":
            category = Category.CATEGORY3;
            break;
        case "category 4":
            category = Category.CATEGORY4;
            break;
        case "cateogry 5":
            category = Category.CATEGORY5;
            break;
        case "category 6":
            category = Category.CATEGORY6;
            break;
        default:
            category = null;
    }
    return category;
}
const stringToTypeCardEnum = (string) => {
    let type;
    switch (string) {
        case "car":
            type = TypeCard.CAR;
            break;
        case "weapon":
            type = TypeCard.WEAPON;
            break;
        case "material":
            type = TypeCard.MATERIAL;
            break
        case "power":
            type = TypeCard.POWER;
            break;
        default:
            type = null;
    }
    return type;
}