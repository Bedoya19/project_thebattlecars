/*
    Clase que se encarga de guardar las cartas cuando se hacen click en la mano.
    Esto sera usado por BoardClick despues.
*/

export class CardSelection {
    // El atributo de la carta seleccionada, sera puesta y eliminada varias veces
    static #selected = null;

    // Solamente define la carta seleccionada
    static set(card) {
        this.#selected = card;
    }

    // Regresa la carta seleccionada
    static get() {
        return this.#selected;
    }

    // Elimina la carta seleccionada
    static clean() {
        this.#selected = null;
    }
}
