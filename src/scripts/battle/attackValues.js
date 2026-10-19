// Clase sencilla de una clase que solo guarda temporalmente las medidas de un ataque
// Puedo dar una propuesta en la que este codigo seria totalmente hecho desde 0 para hacer un poco mas
// estandar el ataque, pero siento que eso no es 100% necesario, al menos por ahora.
export class AttackValues {
    static #prepareAttack = false;
    static #charge = 0;
    static #attack = 0;
    static #zone = 0;
    static #squareNumber = 0;
    static #attackIncrease = 0;
    static #attackNitroIncrease = 0;

    // Getters
    static getCharge() {
        return this.#charge;
    }
    static getAttack() {
        return this.#attack;
    }
    static getPrepareAttack() {
        return this.#prepareAttack;
    }
    static getZone() {
        return this.#zone;
    }
    static getSquareNumber() {
        return this.#squareNumber;
    }
    static getAttackIncrease() {
        console.log(this.#attackIncrease);
        return this.#attackIncrease;
    }
    static getAttackNitroIncrease() {
        return this.#attackNitroIncrease;
    }

    // Define los valores de carga y ataque
    static resetAttackValues() {
        this.#prepareAttack = false;
        this.setValues(0, 0, 0, 0, 0, 0, 0);
    }
    static setAttackValues(charge, attack, zone, squareNumber, attackIncrease, attackNitroIncrease) {
        this.#prepareAttack = true;
        this.setValues(charge, attack, zone, squareNumber, attackIncrease, attackNitroIncrease);
    }

    // Devuelve el valor crudo para el ataque
    // La verdad no tengo ni idea porque no hice esto antes
    static getSumOfAllAttackValues() {
        return parseInt(this.getAttack() + this.getAttackIncrease() + this.getAttackNitroIncrease());
    }
    // Para hacer esto un poco mas estandar
    static setValues(charge, attack, zone, squareNumber, attackIncrease, attackNitroIncrease) {
        this.#charge = charge;
        this.#attack = attack;
        this.#zone = zone;
        this.#squareNumber = squareNumber;
        this.#attackIncrease = attackIncrease;
        this.#attackNitroIncrease = attackNitroIncrease;
    }
}
