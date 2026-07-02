// Esta clase estandariza la creacion de documentos HTML
/* 
NO TODOS, en ciertas situaciones es simplemente mas sencillo tanto para mi como para el futuro del mantenimiento 
de la pagina simplemente usar retornos de HTML que ponerme a reinventar la rueda cada vez que quiera agregar un 
simple div.
Yo recomendaria solo usar estos dos metodos si el elemento HTML es lo suficientemente sencillo para hacerlo por 
este medio, y que alla una ganancia de ser mas entendible y en ocaciones, ahorrar lineas de codigo.
*/
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
    // (Tecnicamente si puede crear elementos con ID y classes, pero es mejor el anterior para elementos con id Y clases)
    static customElementCreator(elementObj) {
        const element = document.createElement(elementObj["element"]);
        for (const [key, value] of Object.entries(elementObj)) {
            element.setAttribute(key, value);
        }
        return element;
    }
}