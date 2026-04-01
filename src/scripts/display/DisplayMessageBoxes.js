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
        textElement.style.setProperty("top", (posData.top - 10));
        textElement.style.setProperty("right", posData.right);
        textElement.style.setProperty("bottom", posData.bottom);
        textElement.style.setProperty("left", posData.left);

        textElement.textContent = text;

        return textElement
    }

    // Agrega un pequeño mensaje que no hay poder suficiente
    static lackOfPower(square) {
        
        const weaponPosData = square.getBoundingClientRect().toJSON();
        //console.log(weaponPosData);
        /*
        const textElement = document.createElement("p");
        // Estilos del elemento
        textElement.classList.add("temporal-message-text");
        // Animaciones
        textElement.classList.add("text-message-slide");
        textElement.style.setProperty("top", (weaponPosData.top - 10));
        textElement.style.setProperty("right", weaponPosData.right);
        textElement.style.setProperty("bottom", weaponPosData.bottom);
        textElement.style.setProperty("left", weaponPosData.left);

        textElement.textContent = "No tienes poder para atacar!";
        */
        const textElement = this.temporalText("No tienes poder para atacar!", weaponPosData);

        square.appendChild(textElement);

        // Elimina el elemento poco tiempo despues
        setTimeout(() => {
            textElement.remove();
        }, 3000)
    }
}