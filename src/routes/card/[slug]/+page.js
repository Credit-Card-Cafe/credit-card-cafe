import { cardList } from "../../../lib/stores";

var cards = [];
cardList.subscribe((list) => {
  cards = list;
})

export const load = ({ params }) => {
  params.card = cards.find((obj) => obj.url == params.slug);
  return {
    slug: params.slug,
    card: params.card,
  };
};
