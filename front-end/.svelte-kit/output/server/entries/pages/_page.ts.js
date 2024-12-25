import { g as getOneCardByURL } from "../../chunks/cards.js";
const load = async () => {
  const cardsOnPage = ["amex-platinum", "discover-it", "amex-gold", "penfed-platinum", "bofa-pr", "bofa-ccr", "sapphire-preferred", "chase-freedom-unlimited", "bofa-travel", "chase-freedom-flex", "chase-ink-unlimited"];
  const cardsInStackList = ["sapphire-preferred", "penfed-platinum", "bofa-pr"];
  const cardStackList = await Promise.all(
    cardsInStackList.map((url) => getOneCardByURL(url))
  ).then((cards) => cards.filter((card) => card !== null && card !== void 0));
  return {
    cards: cardsOnPage,
    cardStackList
  };
};
const prerender = true;
export {
  load,
  prerender
};
