// Clase sencilla de una clase que solo guarda temporalmente las medidas de un ataque

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
        this.setValues(0, 0, 0, 0, 0, 0);
    }
    static setAttackValues(charge, attack, zone, squareNumber, attackIncrease) {
        this.#prepareAttack = true;
        this.setValues(charge, attack, zone, squareNumber, attackIncrease);
    }
    // Para hacer esto un poco mas estandar
    static setValues(charge, attack, zone, squareNumber, attackIncrease) {
        this.#charge = charge;
        this.#attack = attack;
        this.#zone = zone;
        this.#squareNumber = squareNumber;
        this.#attackIncrease = attackIncrease;
    }
}