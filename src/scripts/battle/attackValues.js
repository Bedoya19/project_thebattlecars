// Clase sencilla de una clase que solo guarda temporalmente las medidas de un ataque

export class AttackValues {
    static #charge = 0;
    static #attack = 0;

    // Getters
    static getCharge() {
        return this.#charge;
    }
    static getAttack() {
        return this.#attack;
    }

    // Define los valores de carga y ataque
    static resetAttackValues() {
        this.#charge = 0;
        this.#attack = 0;
    }
    static setAttackValues(charge, attack) {
        this.#charge = charge;
        this.#attack = attack;
    }
}