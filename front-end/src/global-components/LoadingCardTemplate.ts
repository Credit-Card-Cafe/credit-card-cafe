import { type CardObject, CardNetwork, CardRedemption } from "$lib/types";

export const loadingCard:CardObject = {
    card_id: "null",
    card_url: "null",
    card_name: "the ultimate credit card research tool",
    card_bank: "CreditCardDB",
    card_network: "Loading..." as CardNetwork.None,
    card_color: "",
    card_redemption: CardRedemption.None,
}