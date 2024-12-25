import { g as getOneCardByURL, c as getCardRewards } from "../../../../chunks/cards.js";
const load = async ({ params }) => {
  let card = await getOneCardByURL(params.slug);
  if (card)
    card.card_rewards = await getCardRewards();
  return {
    card,
    slug: params.slug
  };
};
export {
  load
};
