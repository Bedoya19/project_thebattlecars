// Hace algunas revisiones extra, que no necesariamente se incluyen en la logica cruda en si de la mejora de las armas

export class CheckWeaponUpgrades {
    // Esta funcion solo esta para hacer el calculo de la comparacion mas sencilla
    // (Por ahora por lo menos) no se tiene chiste cambiarlo 
    static convertMaterialArrayToObject(materialsWeaponArray) {
        materialsWeaponArray = JSON.parse(materialsWeaponArray);
        const materialsCountObj = {};
        for (const materialReq of materialsWeaponArray) {
            materialsCountObj[materialReq[0]] = materialReq[1]
        }
        return materialsCountObj;
    }

    static checkIfEnoughMaterials(materialsCount, materialsWeapon) {
        
    }
}