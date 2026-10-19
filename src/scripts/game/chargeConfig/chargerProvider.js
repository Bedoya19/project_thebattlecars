// Pseudo interfaz para la implementacion de los distintos modos de lectura de la carga

export class ChargerProvider {
    constructor() {
        if (new.target === ChargerProvider) {
            throw new Error("Shape es abstracta, no se instancia");
        }
    }

    // Este metodo se encargara de mostrar el poder, que muy probablemente saldra de PlayerActions.getChargeFromPlayer()
    // 'random' devuelve "null", aunque esto ya lo procesa la Factory
    peekCharge(player) {
        throw new Error(`${this.constructor.name} debe implementar peekCharge()`);
    }

    // Cuando es usado la carga, este hace el cambio respectivo, que puede ser entre simplemente generar otra carga, o pasar a la siguiente carga de una lista,
    // esta se encarga de esto
    consumeCharge(player) {
        throw new Error(`${this.constructor.name} debe implementar consumeCharge()`);
    }

    // Devolver la carga SIN cambiarla.
    // NO debe ser usado para mostrarse en ningun lado este metodo, SOLO uso exclusivo para Attack y muy poco mas
    getCurrentCharge(player) {
        throw new Error(`${this.constructor.name} debe implementar getCurrentCharge()`);
    }

    // Si toca cambiar la carga despues de una ronda, esta es la que se encarga de eso.
    onRoundStart(player) {
        console.log("No va a pasar nada despues de una ronda...");
    }

    // Tambien, si toca cambiar algo despues de un turno
    onTurnStart() {
        console.log("No va a pasar nada despues de un turno...")
    }
}
