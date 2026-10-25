/*
    El refracor mas grande de la pagina hasta ahora
    La data de los carros ahora no sera en el DOM, sino estara ahora en estas clases
    Para el refractor, se va a hacer lo siguiente:
    - Almacenar los datos de los carros y armas que estan en la partida. Se almacenan usando el objeto de carta y datos extra que sean necesarios
    - Lee y escribe los datos de estas cartas
    - BoardClick solo se encargara de llamar esta clase para algunas de sus operaciones
    - DisplayCardInformation ahora usara los datos que salen de aqui, NO del DOM
    El refractor es intenso, pero es necesario para hacer mas sencillo el desarrollo de los nuevos tipos de carros y ataques
    Y ademas este cambio vuelve mucho mas factible los bots, y en un futuro lejano, un multijugador
*/

export class BoardSquare {
    constructor(card, player) {
        this.card = card;
        this.player = player;
    }

    // Los getters de todos los elementos de una carta generica
    // El resto de propiedades es manejado por sus respectivas sub clases
    get category() { return this.card.category; }
    get type() { return this.card.type; }
    get name() { return this.card.name; }
    get description() { return this.card.description; }
    get longDescription() { return this.card.longDescription; }
    get image() { return this.card.image; }
}