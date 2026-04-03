// Script que es el equivalente al loadConfig, pero un poco menos completa
// Solo devuelve la data de los JSON de las cartas, y eso seria basicamente todo. Nada del otro mundo. 

export class LoadCardsJSON {
    static async loadCardJSON(jsonFile) {
        try {
            // Deberia de tener el jsonfile el .json
            const res = await fetch(`src/scripts/cardsData/${jsonFile}`);
            if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
            return await res.json();
        } catch (e) {
            console.error(`Error ${e}`);
        }
    }
    // Funciones que devuelven la data de los jsons individual
    static async loadCarsFromJSON() {
        return await this.loadCardJSON("cars.json");
    }

    static async loadWeaponsFromJSON() {
        return await this.loadCardJSON('weapons.json');
    }

    static async loadMaterialsFromJSON() {
        return await this.loadCardJSON('materials.json');
    }
}