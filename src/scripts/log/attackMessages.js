// Script para la generacion de mensajes de ataque 
// No solo para tenerlos en un ambiente mas estandar y ser reutilizado en otros lugares. Quien sabe para que mas lo podria usar.

export class AttackMessages {
    // Genera lo que le pasa al carro al ser destruido
    static carDestroyedMessage(carAttackedElement, carDestroyed, charge, attack) {
        return [
            `${carAttackedElement.dataset.name} fue atacado por un ataque de carga ${charge}, que cause un daño de ${attack}. ¡Suficiente para destruirlo!`,
            `Le quedarian al ${this.convertPlayerString(carAttackedElement.id.slice(0,7))} ${StateGame.geCarsFromPlayer(carAttackedElement.id.slice(0,7)) - 1} carros restantes`,
        ]
    }
}