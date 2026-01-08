// Clase sencilla de una clase que solo guarda temporalmente las medidas de un ataque

export class AttackValues {
    static #prepareAttack = false;
    static #charge = 0;
    static #attack = 0;
    static #zone = 0;
    static #squareNumber = 0;

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

    // Define los valores de carga y ataque
    static resetAttackValues() {
        this.#prepareAttack = false;
        this.setValues(0, 0, 0, 0);
    }
    static setAttackValues(charge, attack, zone, squareNumber) {
        this.#prepareAttack = true;
        this.setValues(charge, attack, zone, squareNumber);
    }
    // Para hacer esto un poco mas estandar
    static setValues(charge, attack, zone, squareNumber) {
        this.#charge = charge;
        this.#attack = attack;
        this.#zone = zone;
        this.#squareNumber = squareNumber;
    }
}