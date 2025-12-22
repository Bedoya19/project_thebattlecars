// Esta clase va a estandarizar la creacion de documentos HTML.
const element = {
    "element": "div",
    "id": "hola",
    "classes": ["hola-div", "hola-subdiv"],
    "otherAttributes": {
        "alt": "prueba de div"
    }
}

class StandarizedDocCreation {
    // Crear un elemento
    static elementCreator(elementObj) {
        const element = document.createElement(elementObj["element"]);
        element.id = elementObj["id"];
        for (classElement of elementObj["classes"]) {
            element.classlist.add(classElement);
        }
        if (elementObj["otherAttributes"] !== undefined) {
            for (const [key, value] of Object.entries(elementObj)) {
                element.setAttribute(key, value);
            }
        }
        return element;
    }
}