import { ModifiedCardObject } from '$lib/types.js';
import { getOneCardByURL } from '../../../database/read_cards.js';

export const load = async ({ params }) => {
  let card:ModifiedCardObject | undefined = await getOneCardByURL(params.slug);
  return {
    card: card,
    slug: params.slug
  }
};
