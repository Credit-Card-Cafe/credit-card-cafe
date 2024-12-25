import { g as getOneBankByURL } from "../../../../chunks/banks.js";
import { a as getCardsFromBankName } from "../../../../chunks/cards.js";
const load = async ({ params }) => {
  let bank = await getOneBankByURL(params.slug);
  if (bank) {
    let creditCards = [];
    creditCards = await getCardsFromBankName(bank);
    return {
      bank,
      creditCards,
      slug: params.slug
    };
  }
};
export {
  load
};
