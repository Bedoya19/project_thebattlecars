// El script en donde tendra el ciclo del juego principal.
// Ahora los objetivos son los siguientes:
// * Que se cambie de un jugador a otro
// * Que limite la cantidad de acciones con respecto al poder de cada jugador
// * El ciclo del juego. Es decir, que siga indefinidamente el cambio de turnos

// Como lo ha sido siempre en este proyecto, se va a crear una clase
// En general ha sido asi en todo el proyecto para facilitar la importacion y exportacion de funciones hacia
// otros documentos JS.
export class MainGame {
    // Cambia de jugadores
    static changePlayers() {
        // Cambia el data del deck para que sea del otro jugador
        const currentPlayer = document.getElementById("deck").dataset.player;
        document.getElementById("deck").dataset.player = (currentPlayer === "player1") ? "player2" : "player1";
        
    }
}