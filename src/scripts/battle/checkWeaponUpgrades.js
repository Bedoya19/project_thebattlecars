// Hace algunas revisiones extra, que no necesariamente se incluyen en la logica cruda en si de la mejora de las armas

import { PlayerActions } from "../players/playerActions.js";
import { DeckUtils } from "../players/DeckUtils.js";

export class CheckWeaponUpgrades {
    // Convierte el array que esta en el dataset a un objeto
    // Mucho mas facil manejarlo con ese formato
    static convertMaterialArrayToObject(materialsWeaponArray) {
        materialsWeaponArray = JSON.parse(materialsWeaponArray);
        const materialsCountObj = {};
        for (const materialReq of materialsWeaponArray) {
            materialsCountObj[materialReq[0]] = materialReq[1]
        }
        return materialsCountObj;
    }

    // Ya hace la revision
    // Si no alcanza un material, simplemente devuelve false
    // (No se si despues puede avisar que materiales en especifico faltan, pero por ahora no es necesario)
    static checkIfEnoughMaterials(materialsCount, materialsWeapon) {
        console.log(materialsWeapon);
        let upgrade = true;
        for (const [key, value] of Object.entries(materialsWeapon)) {
            //console.log(key, value);
            // Convierte a 0 los materiales que no esten en el deck
            const currentMaterial = materialsCount[key] !== undefined ? materialsCount[key] : 0;
            if (materialsWeapon[key] > currentMaterial) {
                console.log("No hay material!");
                upgrade = false;
            }
        }
        return upgrade;
    }

    static hasEnoughMaterials(player, weaponSquare) {
        const materialDeck = PlayerActions.getDeckFromPlayer(player, "materials");
        const materialCount = DeckUtils.countMaterialsInDeck(materialDeck);
        const necesaryMaterials = CheckWeaponUpgrades.convertMaterialArrayToObject(weaponSquare.dataset.materials);
        return CheckWeaponUpgrades.checkIfEnoughMaterials(materialCount, necesaryMaterials);
    }
}