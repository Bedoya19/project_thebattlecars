// THE BATTLE CARS
// Proyecto de pratica de programacion en la web
// Hecho por Bedoya1905
// Alpha v0.0.01

// Importar Enumso de Categoria, TypeCard y ValidateEnums
import { Category } from "./models/constants/enums.js";
import { TypeCard } from "./models/constants/enums.js";
import { ValidateEnums } from "./models/constants/enums.js";
// Importar subclases de cartas
import { Card } from "./models/cards/Card.js" // Clase madre de Carta
import { CarCard } from "./models/cards/CarCard.js"; // Subclase de Car
import { WeaponCard } from "./models/cards/WeaponCard.js" // Subclase de Weapon
import { MaterialCard } from "./models/cards/MaterialCard.js"; // Subclase de Material
// Clase de display en el mazo
import { DisplayCardsInDeck } from "./display/deckDisplay.js";



// Display del mazo
const deckCards = document.getElementById("deck-cards");


// Creacion de las cartas de prueba
const carCard = await CarCard.loadCarObjectFromJSON("category1", 0);
const weaponCard = await WeaponCard.loadWeaponObjectFromJSON("category1", 0);
const materialCard = await MaterialCard.loadMaterialObjectFromJSON("category1", 0);
const cards = [carCard, weaponCard, materialCard];

DisplayCardsInDeck.showDeckOfCards(deckCards, cards);

