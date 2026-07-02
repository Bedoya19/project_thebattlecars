/*
    Este Script lo que hace es mostrar mensajes en pantalla temporales a una poscicion en especifico
    Estos mensajes pueden ser de cualquier cosa. Como por ejemplo, avisar la falta de poder, o descarga de un arma. Cosas de ese estilo
    Este script es generalmente de WarmUp, NO es fundamental para el funcionamiento de battle-phantasm. Pero si requiere algo de trabajo.
*/

export class DisplayMessageBoxes {
    // Mensaje temporal con solo texto
    // posData se asume que es un JSON con top, right, bottom y left
    static temporalText(text, posData) {
        const textElement = document.createElement("p");
        // Estilos del elemento
        textElement.classList.add("temporal-message-text");
        // Animaciones
        textElement.classList.add("text-message-slide");
        textElement.style.setProperty("top", `${posData.top}px`);
        textElement.style.setProperty("right", `${posData.right}px`);
        textElement.style.setProperty("bottom", `${posData.bottom}px`);
        textElement.style.setProperty("left", `${posData.left}px`);

        textElement.textContent = text;

        return textElement
    }
    // Funcion de crear el elemento en el elemento respecitvo, y despues eliminarlo
    // Esta funcion existe para dividir la funcion, y para poner este texto en literal todo lado posible
    static createTemporalText(square, text) {
        const posData = square.getBoundingClientRect().toJSON();
        
        const textElement = this.temporalText(text, posData);

        square.appendChild(textElement);

        // Elimina el elemento poco tiempo despues
        setTimeout(() => {
            textElement.remove();
        }, 3000)
    }
    /*
    static lackOfPower(square) {
        this.createTemporalText(square, "No tienes poder para atacar!");
    }
    */
}