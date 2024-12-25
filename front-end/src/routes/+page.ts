import { type CardObject } from "$lib/types";
import { getOneCardByURL } from "./api/cards/cards";

export const load = async () => {
  const cardsOnPage = ["amex-platinum","discover-it","amex-gold","penfed-platinum","bofa-pr","bofa-ccr","sapphire-preferred", "chase-freedom-unlimited","bofa-travel","chase-freedom-flex","chase-ink-unlimited"]
  const cardsInStackList = ["sapphire-preferred", "penfed-platinum", "bofa-pr"]
  const cardStackList = await Promise.all(
    cardsInStackList.map(url => getOneCardByURL(url))
  ).then(cards => cards.filter((card): card is CardObject => card !== null && card !== undefined));

  return {
    cards: cardsOnPage,
    cardStackList: cardStackList
  }
};

export const prerender = true;