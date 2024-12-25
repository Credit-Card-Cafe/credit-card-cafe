import type { CardObject } from '$lib/types.js';
import { getOneBrandByURL } from '../../api/brands/brands.js';
import { getCardsFromBrandName } from '../../api/cards/cards.js';

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

