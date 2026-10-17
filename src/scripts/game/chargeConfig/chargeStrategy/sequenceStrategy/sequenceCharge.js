/*
    Clase madre de las clases en donde la carga es de, de alguna forma u otra, "secuencial"
    Es decir, la base de "informed_dual" y "scripted"
*/

import { PlayerActions } from "../../../../players/playerActions.js";
import { ChargerProvider } from "../../chargerProvider.js";

export class SequenceCharge extends ChargerProvider {
    constructor(charges) {
        super();
        // El conteo de los ataques, esto va a cambiar la manera que es manejado por parte de las siguientes clases
        this.attacksCount = { "player1": 0, "player2": 0 }
        // Se espera que esto de "cargas" sea un array
        this.charges = charges;
    }

    // Algunos getters
    get getPlayer1AttackCount() {
        return this.attacksCount["player1"];
    }
    get getPlayer2AttackCount() {
        return this.attacksCount["player2"];
    }

    peekCharge(player) {
        console.log(player);
        console.log(this.charges);
        console.log(this.attacksCount);

        return this.charges[this.attacksCount[player] % this.charges.length];
    }

    consumeCharge(player) {
        const charge = this.peekCharge(player);
        this.attacksCount[player]++;
        return charge;
    }
    // La generacion de la lista se deja para DualCharge
}