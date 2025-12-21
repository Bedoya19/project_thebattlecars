export class BoardClick {
    static clickOnCarSquare(carSquare) {
        // Saco de aqui mismo los datos necesarios
        const cardGeneralInformation = document.getElementById("card-selected-general-information");
        try{
            const cardObj = JSON.parse(cardGeneralInformation.dataset.card);
            console.log(cardObj.type);

            const carBoardPlayer = carSquare.classList[2];
            const carBoardZone = carSquare.classList[3];

            console.log(carBoardPlayer, carBoardZone);
        }
        catch (e) {
            // Si hubo un error, lo mas probable es que fuera que el JSON estuviera undefined, entonces esto se muestra
            console.log("Ninguna carta seleccionada! Mostrar aqui que la casilla es del jugador X de la zona Y");
        }
        
    }
}