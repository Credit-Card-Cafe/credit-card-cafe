import { getCardsList } from "../../../../lib/firebase";
let cards = [];
getCardsList.then((list) => {
  cards = list;
});

export const load = ({ params }) => {
  params.card = cards.find((obj) => obj.url == params.slug);
  return {
    slug: params.slug,
    card: params.card,
  };
};
