/*
    Clase que funciona como fabrica de las clases de Strategy para la logica
    del config de como debe ser tratado la configuracion
*/

import { LoadConfig } from "../loadConfig.js";
import { ChargerProvider } from "./chargerProvider.js";
import { IndividualCharge } from "./chargeStrategy/individualCharge.js";
import { RandomCharge } from "./chargeStrategy/randomCharge.js";
import { DualCharge } from "./chargeStrategy/sequenceStrategy/dualCharge.js";

// Para este caso, voy a hacerlo con funciones para evitar problemas porque no se si esto seria correcto con clases estaticas
const informedIndividual = new IndividualCharge();
const random = new RandomCharge();
const informedDual = new DualCharge();

// Serie de los objetos de Strategy
const chargerConfigs = {
    "random": random,
    "informed_individual": informedIndividual,
    "informed_dual": informedDual
}

function getChargeMethodConfig() {
    return LoadConfig.loadChargeMethod();
}

export function getChargeForDisplay(player) {
    const chargeMethod = getChargeMethodConfig();
    if (chargeMethod === "random") {
        return "?";
    } else {
        return chargerConfigs[chargeMethod].peekCharge(player);
    }
}

export function consumeChargeWhenAttack(player) {
    const chargeMethod = getChargeMethodConfig();
    return chargerConfigs[chargeMethod].consumeCharge(player);
}

export function chargeToNextRound(player) {
    const chargeMethod = getChargeMethodConfig();

    chargerConfigs[chargeMethod].onRoundStart(player);
}

export function startNextTurn() {
    const chargeMethod = getChargeMethodConfig();
    chargerConfigs[chargeMethod].onTurnStart();
}