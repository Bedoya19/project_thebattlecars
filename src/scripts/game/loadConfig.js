// Script (por ahora sencillo) que solo lee la informacion del config
// Despues refractorizar para usar estos metodos en todo lado

import config from "../../configs/config.json" with { type: "json" };

export class LoadConfig {
    // Clase general que devuelve el JSON del config
    static loadConfig() {
        return config;
    }

    // Devuelve el nitro dado por turn
    static async loadNitroPerTurn() {
        const data = await this.loadConfig();
        return data["nitro_per_turn"];
    }

    // Devuelve el nitro dado por cada carro destrozado
    static async loadNitroPerCar() {
        const data = await this.loadConfig();
        return data["nitro_per_car"];
    }

    // Devuelve el modo de juego
    static loadGamemode() {
        const data = this.loadConfig();
        return data["gamemode"];
    }
}