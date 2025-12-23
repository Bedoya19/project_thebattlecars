
const element = {
    "element": "div",
    "id": "hola",
    "classes": ["hola-div", "hola-subdiv"],
    "otherAttributes": {
        "alt": "prueba de div"
    },
    "content": "hola"
}
const element1 = {
    "element": "div",
    "attribute1": "value1"
}
// Esta clase va a estandarizar la creacion de documentos HTML
// tal vez ahorre algunas lineas de codigo y ayude a solucionar ciertos errores especificos en partes del codigo
export class StandarizedDocCreation {
    // Crear un elemento con id, clases, y atributos opcionales
    static elementCreator(elementObj) {
        const element = document.createElement(elementObj["element"]);
        element.id = elementObj["id"];
        for (const classElement of elementObj["classes"]) {
            element.classList.add(classElement);
        }
        if (elementObj?.["otherAttributes"] !== undefined) {
            for (const [key, value] of Object.entries(elementObj["otherAttributes"])) {
                element.setAttribute(key, value);
            }
        }
        if (elementObj?.["content"] !== undefined) {
            element.innerHTML = elementObj["content"];
        }
        
        return element;
    }
    // Crea un elemento sin id o classes, solo con algunos atributos personalizados
    // (Tecnicamente si puede crear elementos con ID y classes, pero es mejor el anterior)
    static customElementCreator(elementObj) {
        const element = document.createElement(elementObj["element"]);
        for (const [key, value] of Object.entries(elementObj)) {
            element.setAttribute(key, value);
        }
        return element;
    }
}