import {getOneBankByURL } from '../../../database/read_banks.js';
import { getCardsFromBankName } from '../../../database/read_cards.js';
import type { CardObject } from '$lib/types.js';

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

