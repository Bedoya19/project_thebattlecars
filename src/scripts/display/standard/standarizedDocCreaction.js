// Esta clase va a estandarizar la creacion de documentos HTML.
const element = {
    "element": "div",
    "id": "hola",
    "classes": ["hola-div", "hola-subdiv"],
    "otherAttributes": {
        "alt": "prueba de div"
    }
}

export class StandarizedDocCreation {
    // Crear un elemento con id, clases, y atributos opcionales
    static elementCreator(elementObj) {
        const element = document.createElement(elementObj["element"]);
        element.id = elementObj["id"];
        for (const classElement of elementObj["classes"]) {
            element.classList.add(classElement);
        }
        if (elementObj?.["otherAttributes"] !== undefined) {
            for (const [key, value] of Object.entries(elementObj)) {
                element.setAttribute(key, value);
            }
        }
        return element;
    }
}