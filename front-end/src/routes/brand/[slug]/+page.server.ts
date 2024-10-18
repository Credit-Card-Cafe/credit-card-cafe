import { getOneBrandByURL } from '../../../database/read_brands.js';
import { getCardsFromBrandName } from '../../../database/read_cards.js';
import type { CardObject } from '$lib/types.js';

export const load = async ({ params }) => {
  let brand = await getOneBrandByURL(params.slug);
  if (brand) {
    let creditCards: Array<CardObject> = []
    creditCards = await getCardsFromBrandName(brand)
    return {
      brand: brand,
      creditCards: creditCards,
      slug: params.slug
    }
  }
};

