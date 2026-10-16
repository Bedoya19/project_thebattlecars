// Pseudo interfaz para la implementacion de los distintos modos de lectura de la carga

class ChargerProvider {
    constructor() {
        if (new.target === ChargerProvider) {
            throw new Error("Shape es abstracta, no se instancia");
        }
    }

    peekCharge(player) {
        throw new Error(`${this.constructor.name} debe implementar peekCharge()`);
    }

    consumeCharge(player) {
        throw new Error(`${this.constructor.name} debe implementar consumeCharge()`);
    }

    onRoundEnd(player) {
        console.log("No va a pasar nada...");
    }
}