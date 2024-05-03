import { getOneBankByURL } from '$lib/database/read.js';
import { getCardsFromIDList } from '$lib/functions';
import type { CreditCardType } from '$lib/types.js';

export const load = async ({ params }) => {
  let bank = await getOneBankByURL(params.slug);
  if (bank) {
    let cards: Array<CreditCardType> = []
    if (bank.cards) {
      cards = await getCardsFromIDList(bank.cards)
    }
    return {
      bank: bank,
      cards: cards,
      slug: params.slug
    }
  }
  
};

