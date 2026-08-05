import { StandarizedDocCreation } from "../display/standardDoc/standarizedDocCreation.js";
import { Player } from "../players/Player.js";
import { PlayerActions } from "../players/playerActions.js";

/*
    Esta clase se dedicara a trabajarle a los temas de la mejora de las armas
    Ella misma creara el boton para la mejora de las armas, saca el deck de materiales, y mejora el arma.
*/
export class WeaponUpgrade {
    // Crea el boton para mejorar el arma
    // Es similar al de crear el boton de ataque... Podemos pensar despues fusionar las dos
    static createUpgradeButton(player, zoneNumber, squareNumber, weaponSquare) {
        const currentPlayer = document.getElementById("deck").dataset.player;
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
        const materialDeck = PlayerActions.getDeckFromPlayer(player, "materials");
        const materialCount = PlayerActions.countMaterialsInDeck(materialDeck);

        console.log(materialCount);
    }
}