// Script para la generacion de mensajes de ataque 
// No solo para tenerlos en un ambiente mas estandar y ser reutilizado en otros lugares. Quien sabe para que mas lo podria usar.
import { DisplayCardInformation } from "../display/displayCardInformation.js"
import { StateGame } from "../game/stateGame.js";

export class AttackMessages {
    // Genera un mensaje corto sobre que X carro ataco a Y carro
    static carAttacks(carAttackerSquare, carAttackedSquare, weaponSquare, charge, attack, previousCarHealth, afterCarHealth) {
        if (attack !== 0) {
            return `${DisplayCardInformation.convertPlayerString(carAttackerSquare.id.slice(0, 7))} ataca a "${carAttackedSquare.dataset.name}" usando su "${carAttackerSquare.dataset.name}" y el arma "${weaponSquare.dataset.name}" teniendo un ${charge}/6 de carga. El ataque es de ${attack}: (${previousCarHealth} > ${afterCarHealth})`;
        }
        // Si el ataque no logra ser mayor a 0
        return `${DisplayCardInformation.convertPlayerString(carAttackerSquare.id.slice(0, 7))} intento atacar a "${carAttackedSquare.dataset.name}" usando su "${carAttackerSquare.dataset.name}" y el arma "${weaponSquare.dataset.name}" teniendo un ${charge}/6 de carga. ¡Pero el ataque no le dio! ${carAttackedSquare.dataset.name} queda intacto`;
    }

    // Genera lo que le pasa al carro al ser destruido
    static carDestroyedMessage(carAttackedElement, charge, attack) {
        return [
            `${carAttackedElement.dataset.name} fue atacado por un ataque de carga ${charge}, que cause un daño de ${attack}. ¡Suficiente para destruirlo!\n`,
            `Le quedan  ${StateGame.geCarsFromPlayer(carAttackedElement.id.slice(0,7)) - 1} carros al ${DisplayCardInformation.convertPlayerString(carAttackedElement.id.slice(0,7))}`,
        ]
    }
}