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
        console.log(`Validar ${enumObj}`)
        const set = new Set(Object.values(enumObj));
        if (!set.has(value)) throw new Error(msg);
        return value;
    }
}