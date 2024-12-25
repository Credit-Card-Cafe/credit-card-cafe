import { type ModifiedCardObject } from '$lib/types.js';
import { getCardRewards, getOneCardByURL } from '../../api/cards/cards';

export const load = async ({ params }) => {
  let card:ModifiedCardObject | undefined = await getOneCardByURL(params.slug);
  if (card) card.card_rewards = await getCardRewards(card)
  return {
    card: card,
    slug: params.slug
  }
};
