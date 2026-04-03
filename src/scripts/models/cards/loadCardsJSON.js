// Script que es el equivalente al loadConfig, pero un poco menos completa
// Solo devuelve la data de los JSON de las cartas, y eso seria basicamente todo. Nada del otro mundo. 

export class LoadCardsJSON {
    static async loadCardJSON(jsonFile) {
        try {
            const res = await fetch("src/scripts/cardsData/cars.json");
            if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
            return await res.json();
        } catch (e) {
            console.error(`Error ${e}`);
        }
    }
}