import { DataConversor } from "../models/constants/enums.js";

class DisplayCardInformation {
    static displayInformation(divClass, card) {
        switch (DataConversor.enumToString(card.type)) {
            case "car":
                break;
            case "weapon":
                break;
            case "material":
                break;
            case "power":
                break;
        }
    }
}