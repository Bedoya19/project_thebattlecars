/*
    Este Script lo que hace es mostrar mensajes en pantalla temporales a una poscicion en especifico
    Estos mensajes pueden ser de cualquier cosa. Como por ejemplo, avisar la falta de poder, o descarga de un arma. Cosas de ese estilo
    Este script es generalmente de WarmUp, NO es fundamental para el funcionamiento de battle-phantasm. Pero si requiere algo de trabajo.
*/

export class DisplayMessageBoxes {
    // Agrega un pequeño mensaje que no hay poder suficiente
    static lackOfPower(square) {
        
        const weaponPosData = square.getBoundingClientRect().toJSON();
        console.log(weaponPosData);
        const textElement = document.createElement("p");
        // Estilos del elemento
        textElement.classList.add("temporal-message-text");
        textElement.style.setProperty("top", weaponPosData.top);
        textElement.style.setProperty("right", weaponPosData.right);
        textElement.style.setProperty("bottom", weaponPosData.bottom);
        textElement.style.setProperty("left", weaponPosData.left);

        textElement.textContent = "No tienes poder para atacar!";
        
        square.appendChild(textElement);

        // Elimina el elemento poco tiempo despues
        setTimeout(() => {
            textElement.remove();
        }, 3000)
    }
}