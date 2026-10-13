import { DisplayCardInformation } from "../display/displayCardInformation.js";
import { GameValuesDisplay } from "../display/gameValuesDisplay.js";
import { StandarizedDocCreation } from "../display/standardDoc/standarizedDocCreation.js";
import { StateGame } from "../game/stateGame.js";
import { DeckUtils } from "../players/DeckUtils.js";
import { Player } from "../players/Player.js";
import { PlayerActions } from "../players/playerActions.js";
import { CheckWeaponUpgrades } from "./checkWeaponUpgrades.js";

/*
    Esta clase se dedicara a trabajarle a los temas de la mejora de las armas
    Ella misma creara el boton para la mejora de las armas, saca el deck de materiales, y mejora el arma.
*/
export class WeaponUpgrade {
    // Crea el boton para mejorar el arma
    // Es similar al de crear el boton de ataque... Podemos pensar despues fusionar las dos
    static createUpgradeButton(player, zoneNumber, squareNumber, weaponSquare) {
        const currentPlayer = StateGame.getCurrentPlayer();
        if (currentPlayer === player) {
            const button = StandarizedDocCreation.customElementCreator(
                {
                    "element": "button",
                    "id": `upgrade-${zoneNumber}-${squareNumber}`,
                    "class": "upgrade-button"
                }
            );
            // Cuando se confirma que el boton funciona, hacemos lo mismo que en el de nitro que si no esta disponible, simplemente no se activa el boton.
            button.innerText = "Mejorar";
            button.addEventListener("click", () => { this.upgradeWeapon(weaponSquare, player) })
            return button;
        } else {
            return document.createElement("div");
        }
    }

    // Mejora el arma (si se puede)
    static upgradeWeapon(weaponSquare, player) {
        //console.log(PlayerActions.getPowerFromPlayer(player));
        if (!PlayerActions.spendPower(player)) return;

        //if (PlayerActions.getPowerFromPlayer(player) > 0) {
        const materialDeck = PlayerActions.getDeckFromPlayer(player, "materials");
        const materialCount = DeckUtils.countMaterialsInDeck(materialDeck);

        const necesaryMaterials = CheckWeaponUpgrades.convertMaterialArrayToObject(weaponSquare.dataset.materials);
        console.log(necesaryMaterials);
        console.log(materialCount);

        const canUpgrade = CheckWeaponUpgrades.checkIfEnoughMaterials(materialCount, necesaryMaterials);
        if (canUpgrade) {
            console.log("Se puede mejorar!");
            console.log(DeckUtils.orderMaterialsByQuantity(materialDeck));
            const attacksLevels = JSON.parse(weaponSquare.dataset.attacks).length;
            // Convertimos explícitamente a número para evitar coerciones raras en la comparación
            const currentLevel = Number(weaponSquare.dataset.level);
            
            if (currentLevel < attacksLevels - 1) {
                console.log("Se va a mejorar!");
                // Asignamos el nuevo valor a la propiedad, JS lo convierte a string automáticamente
                weaponSquare.dataset.level = currentLevel + 1;
                // Se recarga de energia el arma en el proceso
                if (weaponSquare.dataset.energy <= weaponSquare.dataset.maxEnergy) {
                    console.log("Recargar energia...");
                    const cardInformation = document.getElementById("card-selected-information");
                    weaponSquare.dataset.energy = weaponSquare.dataset.maxEnergy;
                    DisplayCardInformation.displayWeaponCardInformationBoard(cardInformation, weaponSquare, player);
                }
                // - Esta parte
                this.applyUpgradeCost(player, materialDeck, necesaryMaterials);
            }
        }
        //} else {
        //    console.log("No hay poder suficiente!");
        //    console.log(PlayerActions.getPowerFromPlayer(player));
        //}
    }

    static applyUpgradeCost(player, deck, upgradeRequirements) {
        for (const [material, needed] of Object.entries(upgradeRequirements)) {
            PlayerActions.removeMaterialsForUpgrade(player, deck, material, needed);
        }
    }
}