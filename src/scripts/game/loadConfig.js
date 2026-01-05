// Script (por ahora sencillo) que solo lee la informacion del config
// Despues refractorizar para usar estos metodos en todo lado

export class LoadConfig {
    // Clase general que devuelve el JSON del config
    static async loadConfig() {
        try {
            const res = await fetch("src/configs/config.json");
            if (!res.ok) throw new Error(`HTTP Error ${res.status}`);

            return await res.json();
        } catch (e) {
            console.error(`Error: ${e}`);
        }
    }

    // Devuelve el nitro dado por turn
    static async loadNitroPerTurn() {
        const data = await this.loadConfig();
        return data["nitro_per_turn"];
    }
}