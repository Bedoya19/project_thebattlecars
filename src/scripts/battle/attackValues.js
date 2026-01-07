// Clase sencilla de una clase que solo guarda temporalmente las medidas de un ataque

export class AttackValues {
    static #prepareAttack = false;
    static #charge = 0;
    static #attack = 0;

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

    // Define los valores de carga y ataque
    static resetAttackValues() {
        this.#prepareAttack = false;
        this.#charge = 0;
        this.#attack = 0;
    }
    static setAttackValues(charge, attack) {
        this.#prepareAttack = true;
        this.#charge = charge;
        this.#attack = attack;
    }
}