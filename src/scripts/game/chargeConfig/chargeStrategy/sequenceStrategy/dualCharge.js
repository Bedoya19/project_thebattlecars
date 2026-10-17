/*
    Strategy sobre la configuracion de "informed_individual"
*/

import { PlayerActions } from "../../../../players/playerActions.js";
import { ChargerProvider } from "../../chargerProvider.js";
import { SequenceCharge } from "./sequenceCharge.js";

// Variable que usa DualCharge para la generacion del array
// Tal vez puede ser una configuracion personalizable para despues, revisar y/o halar con Claude despues de eso
const chargesAmount = 8;

export class DualCharge extends SequenceCharge {
    constructor() {
        super(DualCharge.generateRandomCharges(chargesAmount));
    }

    // La verdad peekCharges y consumeCharge ya hace todo lo que tengo que hacer!
    // No es necesario sobreescribirlos ya que la logica esta en sequenceCharge.

    static generateRandomCharges(size) {
        const charges = [];
        for (let i = 0; i < size; i++) {
            // Que se esta repitiendo mucho este pequeño generador de numero, en algun momento lo creare como una funcion para facilidad mia, pero primero quiero definir que todo este funcionando correctamente
            charges.push(Math.floor(Math.random() * 6) + 1);
        }
        return charges;
    }

    onTurnStart() {
        console.log(this.attacksCount);
        this.attacksCount["player1"] = 0;
        this.attacksCount["player2"] = 0;
        this.charges = DualCharge.generateRandomCharges(chargesAmount);
    }
}