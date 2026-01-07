/*
    Metodos del ataque de carro
    Se va a desarrollar la version funcional con la version que yo diseñe el juego desde un principio: 
    La carga es avisada desde un principio
*/

export class Attack {
    // Agrgega el boton de ataque a la informacion si es del jugador indicado
    static createAttackButton(player, zoneNumber, squareNumber) {
        const currentPlayer = document.getElementById("deck").dataset.player;
        console.log(player, currentPlayer);
        if (currentPlayer === player) {
            return `<button id="attack-${zoneNumber}-${squareNumber}">Atacar</button>`
        } else {
            return "";
        }
    }

    // Prepara todo para atacar
    static prepareForAttack() {
        
    }
}