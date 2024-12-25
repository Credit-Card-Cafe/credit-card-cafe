import type { CardObject } from '$lib/types.js';
import { getOneBankByURL } from '../../api/banks/banks.js';
import { getCardsFromBankName } from '../../api/cards/cards.js';

export const load = async ({ params }) => {
  let bank = await getOneBankByURL(params.slug);
  if (bank) {
    let creditCards: Array<CardObject> = []
    creditCards = await getCardsFromBankName(bank)
    return {
      bank: bank,
      creditCards: creditCards,
      slug: params.slug
    }
  }
  
};

