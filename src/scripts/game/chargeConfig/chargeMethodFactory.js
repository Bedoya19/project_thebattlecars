/*
    Clase que funciona como fabrica de las clases de Strategy para la logica
    del config de como debe ser tratado la configuracion
*/

import { LoadConfig } from "../loadConfig.js";
import { ChargerProvider } from "./chargerProvider.js";
import { IndividualCharge } from "./chargeStrategy/individualCharge.js";
import { RandomCharge } from "./chargeStrategy/randomCharge.js";

// Para este caso, voy a hacerlo con funciones para evitar problemas porque no se si esto seria correcto con clases estaticas
const informedIndividual = new IndividualCharge();
const random = new RandomCharge();
const chargerConfigs = {
    "random": random,
    "informed_individual": informedIndividual
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

export function chargeToNextRound(player) {
    const chargeMethod = getChargeMethodConfig();

    chargerConfigs[chargeMethod].onRoundEnd(player);
}